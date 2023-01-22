<script setup>
import Naive from 'naive-ui'
import gsap from 'gsap'
import * as THREE from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js'
import Floor from '~/core/Floor.js'
// import { createNoise3D } from 'simplex-noise'
// import { useFont } from '~/composables/useFont.js'
// import logo from '~/assets/models/beyonce.glb?url'
// import { BlackGooBallMaterial } from '~materials/BlackGooBall.js'
import useCore from '~composables/useCore.ts'
// import { Effects } from '~/utils/Effects'
import { useMagicMouse } from '~/core/reti.js'
// const noise = createNoise3D(Math.random)
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

onMounted(() => {
  nextTick(() => {
    gsap.to('.canvas-ui', {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    })
    const vgeometry = new THREE.BoxGeometry(1, 1, 1)
    const vmaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
    // const boxesPerWindow = window.innerWidth / 5
    // const boxesPerWindowHeight = window.innerHeight / 5
    function buildWallOfCubes() {
      for (let i = 0; i < 1; i++) {
        for (let j = 0; j < 1; j++) {
          for (let k = 0; k < 1; k++) {
            const cube = new THREE.Mesh(vgeometry, vmaterial)
            cube.position.set(i * 2, j * 2, k * 2)
            // scene.add(cube)
          }
        }
      }
    }
    const c = document.querySelector('.main-canvas-2d')
    const axesHelper = new THREE.AxesHelper(5)
    scene = new THREE.Scene()
    scene.add(axesHelper)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true })

    const animate = () => {
      renderer.render(scene, camera)
    }

    ambientLight = useCore(nuxtApp).ambientLight
    pointLight = useCore(nuxtApp).pointLight
    spotLight = useCore(nuxtApp).spotLight
    spotLight.position.set(0, 0, 0)
    const spotlightHelper = new THREE.SpotLightHelper(spotLight)
    scene.add(spotlightHelper)
    spotLight.target = axesHelper

    hemisphereLight = useCore(nuxtApp).hemisphereLight

    camera.position.set(0, 0, 1)
    camera.lookAt(0, 0, 0)

    const floor = new Floor()
    scene.add(floor.mesh)
    floor.mesh.position.set(0, 0, 50)
    //     const material = new THREE.MeshBasicMaterial({ color: 0x8B0800, side: THREE.DoubleSide })
    //     const g = new THREE.PlaneGeometry(2, 2, 100, 100)
    //     const mesh = new THREE.Mesh(g, material)
    //     mesh.position.set(0, 0, 0)
    //     mesh.rotation.x = THREE.MathUtils.degToRad(-90)
    function mouseMe() {
      const planeg = new THREE.PlaneGeometry(20, 20, 100, 100)
      const pmaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })
      const plane = new THREE.Mesh(planeg, pmaterial)
      plane.position.set(0, 0, 1)
      plane.rotation.x = THREE.MathUtils.degToRad(0)
      scene.add(plane)

      // add sphere
      const sgeometry = new THREE.SphereGeometry(1, 32, 16)
      const smaterial = new THREE.MeshBasicMaterial({ color: 0x000055 })
      const sphere = new THREE.Mesh(sgeometry, smaterial)
      sphere.position.set(0, 0, 0)
      scene.add(sphere)

      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()
      mousePointLight = new THREE.PointLight(0xFF0000, 100, 100)
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
          sphere.position.set(intersects[i].point.x, intersects[i].point.y, intersects[i].point.z)
          mousePointLight.position.set(intersects[i].point.x, intersects[i].point.y, intersects[i].point.z)
        }

        for (let i = 0; i < intersects.length; i++)
          intersects[i].object.material.color.set(0xFF0000)
      }

      // window.addEventListener('mousemove', onMouseMove, false)
    }
    mouseMe()
    const controls = new OrbitControls(camera, renderer.domElement)
    buildWallOfCubes()
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
