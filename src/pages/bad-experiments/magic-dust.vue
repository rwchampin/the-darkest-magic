<script lang="ts" setup>
import { Utils } from '~/utils'
import { useCore } from '~~/composables/useCore'
let container

let scene, camera, light, renderer
let geometry, cube, mesh, material

let data, texture, points

let controls

let fboParticles, rtTexturePos, rtTexturePos2, simulationShader

let planeMat, planeGeo, plane

onMounted(() => {
  const { createCore } = useCore()
  const core = createCore()
  scene = core.scene
  camera = core.camera
  camera.lookAt(0, 0, 0)
  renderer = core.renderer
  init()
  animate()
})

function init() {
  container = document.createElement('div')
  document.body.appendChild(container)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)
  scene.add(camera)

  controls = new THREE.OrbitControls2(camera)
  controls.radius = 400
  controls.speed = 3

  //

  const width = 1024; const height = 1024

  if (!renderer.context.getExtension('OES_texture_float'))

    alert('OES_texture_float is not :(')

  // Start Creation of DataTexture
  // Could it be simplified with THREE.FBOUtils.createTextureFromData(textureWidth, textureWidth, data); ?

  data = new Float32Array(width * height * 3)

  texture = new THREE.DataTexture(data, width, height, THREE.RGBFormat, THREE.FloatType)
  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.needsUpdate = true

  // zz85 - fbo init

  rtTexturePos = new THREE.WebGLRenderTarget(width, height, {
    wrapS: THREE.RepeatWrapping,
    wrapT: THREE.RepeatWrapping,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBFormat,
    type: THREE.FloatType,
    stencilBuffer: false,
  })

  rtTexturePos2 = rtTexturePos.clone()

  simulationShader = new THREE.ShaderMaterial({

    uniforms: {
      tPositions: { type: 't', value: texture },
      origin: { type: 'v3', value: new THREE.Vector3() },
      timer: { type: 'f', value: 0 },
    },

    vertexShader: `
         varying vec2 vUv;

    void main() {

    vUv = vec2(uv.x, 1.0 - uv.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
    `,
    fragmentShader: `
        // simulation
    varying vec2 vUv;

    uniform vec3 origin;
    uniform sampler2D tPositions;

    uniform float timer;

    float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {

    vec3 pos = texture2D( tPositions, vUv ).xyz;

    if ( rand( vUv + timer ) > 0.99 ) {

    pos = origin;

    vec3 random = vec3( rand( vUv + 1.0 ) - 1.0, rand( vUv + 2.0 ) - 1.0, rand( vUv + 3.0 ) - 1.0 );
    pos += normalize( random ) * rand( vUv + 1.0 );

    } else {

    float x = pos.x + timer;
    float y = pos.y;
    float z = pos.z;

    pos.x += sin( y * 3.3 ) * cos( z * 10.3 ) * 0.005;
    pos.y += sin( x * 3.5 ) * cos( z * 10.5 ) * 0.005;
    pos.z += sin( x * 3.7 ) * cos( y * 10.7 ) * 0.005;

    }

    // Write new position out
    gl_FragColor = vec4(pos, 1.0);

    }
    `,

  })

  fboParticles = Utils.FboUtils(width, renderer, simulationShader)
  fboParticles.renderToTexture(rtTexturePos, rtTexturePos2)

  fboParticles.in = rtTexturePos
  fboParticles.out = rtTexturePos2

  geometry = new THREE.Geometry()

  for (let i = 0, l = width * height; i < l; i++) {
    const vertex = new THREE.Vector3()
    vertex.x = (i % width) / width
    vertex.y = Math.floor(i / width) / height
    geometry.vertices.push(vertex)
  }

  material = new THREE.ShaderMaterial({

    uniforms: {

      map: { type: 't', value: rtTexturePos },
      width: { type: 'f', value: width },
      height: { type: 'f', value: height },

      pointColor: { type: 'v4', value: new THREE.Vector4(0.25, 0.50, 1.0, 0.25) },
      pointSize: { type: 'f', value: 1 },

    },
    vertexShader: `
        uniform sampler2D map;

    uniform float width;
    uniform float height;

    uniform float pointSize;

    varying vec2 vUv;
    varying vec4 vPosition;
    varying vec4 vColor;

    void main() {

    vec2 uv = position.xy + vec2( 0.5 / width, 0.5 / height );
    vec3 color = texture2D( map, uv ).rgb * 200.0 - 100.0;

    gl_PointSize = pointSize;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( color, 1.0 );

    }
    `,
    fragmentShader: `
        uniform vec4 pointColor;

    void main() {

    gl_FragColor = pointColor;

    }
    `,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
    transparent: true,

  })

  mesh = new THREE.ParticleSystem(geometry, material)
  scene.add(mesh)

  //   const gui = new dat.GUI()
  //   gui.add(material.uniforms.pointColor.value, 'x', 0.0, 1.0).name('red')
  //   gui.add(material.uniforms.pointColor.value, 'y', 0.0, 1.0).name('green')
  //   gui.add(material.uniforms.pointColor.value, 'z', 0.0, 1.0).name('blue')
  //   gui.add(material.uniforms.pointColor.value, 'w', 0.0, 1.0).name('alpha')
  //   gui.add(material.uniforms.pointSize, 'value', 0.0, 10.0).name('size')
  //   gui.add(controls, 'enabled').name('auto move')

  scene.add(new THREE.Mesh(new THREE.CubeGeometry(500, 500, 500), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true, opacity: 0.15, transparent: true })))
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

let timer = 0

function render() {
  timer += 0.01

  simulationShader.uniforms.timer.value = timer
  simulationShader.uniforms.origin.value.x = Math.sin(timer * 2.3) * 0.5 + 0.5
  simulationShader.uniforms.origin.value.y = Math.cos(timer * 2.5) * 0.5 + 0.5
  simulationShader.uniforms.origin.value.z = Math.sin(timer * 2.7) * 0.5 + 0.5

  // swap
  const tmp = fboParticles.in
  fboParticles.in = fboParticles.out
  fboParticles.out = tmp

  simulationShader.uniforms.tPositions.value = fboParticles.in
  fboParticles.simulate(fboParticles.out)
  material.uniforms.map.value = fboParticles.out

  controls.update()

  renderer.render(scene, camera)
}
</script>

<template>
  <section class="page page-magic-dust">
    <h2>MAGIC DUST</h2>
  </section>
</template>