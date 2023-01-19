<script setup>
import Naive from 'naive-ui'
import gsap from 'gsap'
import useCore from '~/composables/useCore.ts'
import { Effects } from '~/utils/Effects'
// ** Get NUXTAPP ** //

let scene, camera, renderer, ambientLight, pointLight, directionalLight, rectAreaLight, spotLight, hemisphereLight
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
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

onMounted(() => {
  nextTick(() => {
    camera = useCore(nuxtApp).camera
    scene = useCore(nuxtApp).scene
    renderer = useCore(nuxtApp).renderer
    ambientLight = useCore(nuxtApp).ambientLight
    pointLight = useCore(nuxtApp).pointLight
    spotLight = useCore(nuxtApp).spotLight
    hemisphereLight = useCore(nuxtApp).hemisphereLight
    // const { planet, stars } = useBlackEnergy(nuxtApp)

    // const { material, uniforms } = Effects.createWobblyMaterial()
    const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
    const g = new THREE.PlaneGeometry(1, 1, 1, 1)
    const mesh = new THREE.Mesh(g, material)
    mesh.position.set(0, 0, 0)

    scene.add(mesh, ambientLight, camera, pointLight, spotLight)
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
  <!-- <TheFloatingMenu /> -->
  <Teleport to="body">
    <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
    <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
  </Teleport>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <LazyTheDebugger v-if="getDebugMode" />

      <ClientOnly>
        <!-- <TheDarkScrollbar /> -->
        <Nuxt>
          <TheContent />
        </Nuxt>
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
