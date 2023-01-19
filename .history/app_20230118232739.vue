<script setup>
import Naive from 'naive-ui'
import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from '~particles/core/vendor/stats.min.js'
import { BlackGooBallMaterial } from '~materials/BlackGooBall.js'
import useCore from '~composables/useCore.ts'
import { Effects } from '~/utils/Effects'
// ** Get NUXTAPP ** //

let stats,, scene, camera, renderer, ambientLight, pointLight, directionalLight, rectAreaLight, spotLight, hemisphereLight
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(Naive)
const canvas2d = ref(null)
const canvas3d = ref(null)
// const mode = nuxtApp.$colorMode.preference

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

const animate = () => {
  stats.update()
  renderer.render(scene, camera)
}

onMounted(() => {
  nextTick(() => {
    stats = new Stats()



    // starlight = useBlackEnergy(nuxtApp).starlight
    stats.showPanel(0)
    document.body.appendChild(stats.dom)
    stats.dom.style.position = 'fixed'
    stats.dom.style.top = '0px'
    stats.dom.style.left = '0px'
    stats.dom.style.zIndex = '8000'
    stats.dom.style.width = 350
    const c = document.querySelector('.main-canvas-2d')
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true })
    // camera = useCore(nuxtApp).camera
    // scene = useCore(nuxtApp).scene
    // renderer = useCore(nuxtApp).renderer
    ambientLight = useCore(nuxtApp).ambientLight
    pointLight = useCore(nuxtApp).pointLight
    spotLight = useCore(nuxtApp).spotLight
    hemisphereLight = useCore(nuxtApp).hemisphereLight

    const sgeometry = new THREE.SphereGeometry(15, 100, 100)
    const smaterial = Effects.createWobblyMaterial()
    const sphere = new THREE.Mesh(sgeometry, smaterial)
    scene.add(sphere)
    // const { planet, stars } = useBlackEnergy(nuxtApp)
    camera.position.set(0, 0, -5)
    camera.lookAt(0, 0, 0)
    // const { material, uniforms } = Effects.createWobblyMaterial()
    const material = Effects.createWobblyMaterial()

    const g = new THREE.PlaneGeometry(1, 1, 100, 100)
    const mesh = new THREE.Mesh(g, material)
    mesh.position.set(0, 0, 0)
    mesh.rotation.x = Math.PI * -0.5

    const controls = new OrbitControls(camera, renderer.domElement)
    debugger
    sphere.position.set(0, 2, 5)

    const mousePointLight = new THREE.PointLight(0xFF0000, 100, 100)
    mousePointLight.position.set(0, 0, 10)
    scene.add(planet, stars, mesh, ambientLight, camera, pointLight, spotLight, mousePointLight)

    gsap.ticker.add(() => {
      animate()
    })
  })
})

// onMounted(() => {
//   const script = document.createElement('script')
//   script.type = 'text/javascript'
//   script.src = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js'
//   document.head.appendChild(script)

//   const experience = new Experience({
//     targetElement: document.querySelector('.main-canvas-3d'),
//     ctx: document.querySelector('.main-canvas-2d'),
//   })

//   const canvas = experience.canvas2d
//   const ctx = experience.ctx

//   const display = new Display(canvas)
//   display.init()
//   const particleSystem = new ParticleSystem().init(display)
//   display.start()

//   // const gui = new GUI(particleSystem, display)

//   particleSystem.addEmitter(new Vector(360, 230), Vector.fromAngle(0, 2))
//   particleSystem.addField(new Vector(700, 230), -140)
//   particleSystem.addNewParticles()
//   function resize() {
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
//   }
//   window.addEventListener('resize', resize); resize()

//   const mouse = useMagicMouse({ experience })
//   gsap.to('.canvas-ui', {
//     opacity: 1,
//     duration: 1,
//     ease: 'power2.out',
//   })
// })
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
