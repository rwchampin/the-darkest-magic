<script lang="ts" setup>
let container

let scene, camera, light, renderer
let geometry, cube, mesh, material

let data, texture, points

let controls

let fboParticles, rtTexturePos, rtTexturePos2, simulationShader

let planeMat, planeGeo, plane

init()
animate()

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

    vertexShader: document.getElementById('texture_vertex_simulation_shader').textContent,
    fragmentShader: document.getElementById('texture_fragment_simulation_shader').textContent,

  })

  fboParticles = new THREE.FBOUtils(width, renderer, simulationShader)
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
    vertexShader: document.getElementById('vs-particles').textContent,
    fragmentShader: document.getElementById('fs-particles').textContent,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
    transparent: true,

  })

  mesh = new THREE.ParticleSystem(geometry, material)
  scene.add(mesh)

  const gui = new dat.GUI()
  gui.add(material.uniforms.pointColor.value, 'x', 0.0, 1.0).name('red')
  gui.add(material.uniforms.pointColor.value, 'y', 0.0, 1.0).name('green')
  gui.add(material.uniforms.pointColor.value, 'z', 0.0, 1.0).name('blue')
  gui.add(material.uniforms.pointColor.value, 'w', 0.0, 1.0).name('alpha')
  gui.add(material.uniforms.pointSize, 'value', 0.0, 10.0).name('size')
  gui.add(controls, 'enabled').name('auto move')

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

</script>

<template />
