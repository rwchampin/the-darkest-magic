<script setup>
import Naive from 'naive-ui'
import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import EmberParticles from '~/particles/EmberParticles'
import useTheSpirit from '~/composables/useTheSpirit.js'
import { useMagicMouse } from '~/core/reti.js'

let stats, planet, mousePointLight, scene, camera, renderer, ambientLight, pointLight, directionalLight, rectAreaLight, spotLight, hemisphereLight
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(Naive)
const canvas2d = ref(null)
const canvas3d = ref(null)
const clock = new THREE.Clock()
const mode = nuxtApp.$colorMode.preference
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

const draggable = ref(null)
const { getDebugMode } = nuxtApp.$appStore

// const gradientMaterial = new THREE.ShaderMaterial({
//   uniforms: {
//     u_time: { value: 0 },
//     u_resolution: { value: new THREE.Vector2() },
//   },
//   vertexShader: `
//     varying vec2 vUv;
//     void main() {
//       vUv = uv;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
//   `,
//   fragmentShader: `
//     uniform vec2 u_resolution;
//     uniform float u_time;
//     varying vec2 vUv;
//     void main() {
//       vec2 st = gl_FragCoord.xy/u_resolution;
//       vec3 color = vec3(0.0);
//       color.r = sin(st.x * 10.0 + u_time);
//       color.g = cos(st.y * 10.0 + u_time);
//       color.b = sin(st.x * 10.0 + u_time);
//       gl_FragColor = vec4(color, 1.0);
//     }
//   `,
// })

function createLight(color) {
  const intensity = 2
  const s = 0.2
  const light = new THREE.PointLight(color, intensity, 20)
  light.castShadow = true
  light.shadow.bias = -0.005 // reduces self-shadowing on double-sided objects

  let geometry = new THREE.SphereGeometry(s, 12, 6)
  let material = new THREE.MeshBasicMaterial({ color })
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
onMounted(() => {
  nextTick(() => {
    gsap.to('.canvas-ui', {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    })

    const c = document.querySelector('.main-canvas-2d')
    const axesHelper = new THREE.AxesHelper(5)
    scene = new THREE.Scene()
    scene.add(axesHelper)
    scene.add(new THREE.AmbientLight(0x111122))
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.BasicShadowMap
    const emberParticles = new EmberParticles()
    debugger
    // const { pane } = useTweakPane({ scene, camera, renderer, canvas: c, nuxtApp })
    const animate = () => {
      renderer.render(scene, camera)
    }

    camera.position.set(0, 0, 1)
    camera.lookAt(0, 0, 0)

    function makeBox() {
      const geometry = new THREE.BoxGeometry(30, 30, 30)

      const material = new THREE.MeshPhongMaterial({
        color: 0xA0ADAF,
        shininess: 10,
        specular: 0x111111,
        side: THREE.BackSide,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.y = 10
      mesh.receiveShadow = true
      scene.add(mesh)
    }
    makeBox()
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
    mouseMe()
    const controls = new OrbitControls(camera, renderer.domElement)
    // buildWallOfCubes()
    const y = useMagicMouse()
    const u = y()
    //     debugger
    scene.add(ambientLight, camera, pointLight, spotLight, mousePointLight)

    gsap.ticker.add(() => {
      animate()
    })
  })
})
</script>

<template>
  <TheFloatingMenu />
  <Teleport to="body">
    <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
    <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
  </Teleport>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <LazyTheDebugger v-if="getDebugMode" />

      <ClientOnly>
        <!-- <TheDarkScrollbar /> -->

        <TheContent />
      </ClientOnly>
    </div>
  </div>
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
