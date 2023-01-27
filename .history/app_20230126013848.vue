<script setup>
import Naive from 'naive-ui'
import gsap from 'gsap'
import * as THREE from 'three'
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import EmberParticles from '~/particles/EmberParticles'
import { useMagicKeyRegistration } from '~/composables/useMagicKeyRegistration'
import { useMagicMouse } from '~/core/reti.js'

let mousePointLight, scene, camera, renderer, ambientLight, pointLight, directionalLight, rectAreaLight, spotLight, hemisphereLight
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(Naive)
const canvas2d = ref(null)
const canvas3d = ref(null)
THREE.Cache.enabled = true

useHead({
  title: 'RYAN THE DEVELOPER',
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/favicon.ico',
    },
  ],
  script: [
    { children: ' SUPERGLOBAL = {core: {}, gui:{}}' },

    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js',
      ssr: false,
      type: 'module',
    },

    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js',
      ssr: false,

    },
  ],
})

const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    amplitude: { value: 0 },
  },
  vertexShader: `
    uniform float amplitude;

    attribute vec3 customColor;
    attribute vec3 vel;

    varying vec3 vColor;
    varying vec3 vNormal;


    void main() {
      vNormal = normal;
      vColor = customColor;

      // add velocity to position of vertices
      vec3 newPosition = position + vel * amplitude;

      gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying vec3 vNormal;

    void main() {
      const float ambient = 0.4; //nondirectional light


      vec3 light = vec3(1.0);
      light = normalize(light);

      float directional = max(dot(vNormal, light), 0.0);

      gl_FragColor = vec4(vColor * (ambient + directional), 1.0);
    }
  `,
})
const bufferGeometry = new THREE.BufferGeometry()
const draggable = ref(null)
const { getDebugMode } = nuxtApp.$appStore
function makeBox() {
  const s = 10
  const geometry = new THREE.BoxGeometry(s, s / 2, s)

  const material = new THREE.MeshPhongMaterial({
    color: 0xA0ADAF,
    shininess: 10,
    specular: 0x111111,
    side: THREE.BackSide,
    wireframe: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.y = 0 // s / 2
  mesh.receiveShadow = true
  scene.add(mesh)
}
function createLight(color) {
  const intensity = 2
  const s = 0.2
  const light = new THREE.PointLight(color, intensity, 20)
  light.castShadow = true
  light.shadow.bias = -0.005 // reduces self-shadowing on double-sided objects

  let geometry = new THREE.SphereGeometry(s, 12, 6)
  let material = new THREE.MeshBasicMaterial()
  material.color.multiplyScalar(intensity)
  const sphere = new THREE.Mesh(geometry, material)
  light.add(sphere)

  geometry = new THREE.SphereGeometry(s, 16, 8)
  material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,

    alphaTest: 0.5,
  })

  return light
}
function mouseMe() {
  // scene.add(plane)

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  mousePointLight = createLight()
  mousePointLight.castShadow = true

  scene.add(mousePointLight)
  function onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera)

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children)
    for (let i = 0; i < intersects.length; i++) {
      // sphere.position.set(intersects[i].point.x, intersects[i].point.y, intersects[i].point.z)
      mousePointLight.position.set(intersects[i].point.x, intersects[i].point.y, intersects[i].point.z)
    }

    // for (let i = 0; i < intersects.length; i++)
    //   intersects[i].object.material.color.set(0xFF0000)
  }

  window.addEventListener('mousemove', onMouseMove, false)
}
const animate = () => {
  renderer.render(scene, camera)
}
onMounted(() => {
  nextTick(() => {
    const c = document.querySelector('.main-canvas-2d')

    scene = new THREE.Scene()

    const ambientLight = new THREE.AmbientLight(0x111122)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.BasicShadowMap
    camera.position.set(0, 0, 1)
    camera.lookAt(0, 0, 0)

    useMagicKeyRegistration()
    makeBox()
    mouseMe()
    const y = useMagicMouse()
    const u = y()

    gsap.ticker.add(() => {
      animate()
    })

    const controls = new OrbitControls(camera, renderer.domElement)
    const emberParticles = new EmberParticles()
    let tessellateGeometry = new THREE.BoxBufferGeometry(40, 40, 40)
    const tessellateModifier = new TessellateModifier(8, 6)
    tessellateGeometry = tessellateModifier.modify(tessellateGeometry)
    const numFaces = tessellateGeometry.attributes.position.count / 3;
    const colors = new Float32Array(numFaces * 3 * 3);  
    const vel = new Float32Array(numFaces * 3 * 3);

    const color = new THREE.Color();
    const l = 0.5;
    const s = 1.0;

    for(let f = 0; f < numFaces; f++) {
      const i = f * 3 * 3;
      color.setHSL(Math.random(), s, l);
      color.toArray(colors, i);
      color.toArray(colors, i + 3);
      color.toArray(colors, i + 6);
    }
    scene.add(
      ambientLight,
      emberParticles.points,
      ambientLight,
      camera,
      pointLight,
      spotLight,
      mousePointLight,
    )

    gsap.to('.canvas-ui', {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    })

    const modules = {
      scene,
      camera,
      renderer,
    }
  })
})
</script>

<template>
  <TheFloatingMenu />
  <LazyTheDarkScrollbar />
  <Teleport to="body">
    <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
    <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
  </Teleport>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <ClientOnly>
        <TheContent />
      </ClientOnly>
    </div>
  </div>

  <LazyTheDebugger v-if="getDebugMode" :modules="coreModules" />
</template>

<style scoped>
.main-canvas-3d,
#canvas-container {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 99 !important;
  background-color: transparent !important;
}

html,
body,
#__nuxt {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
