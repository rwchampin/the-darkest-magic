<script setup>
import Naive from 'naive-ui'
import gsap from 'gsap'
import Experience from './core/Experience'
import { useCore } from './composables/useCore'
import { useMagicMouse } from './composables/useMagicMouse'
import { useBlackEnergy } from './composables/useBlackEnergy'
import { Effects } from '~/utils/Effects'
import { Utils } from '~/utils/'
// ** Get NUXTAPP ** //
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(Naive)
const canvas2d = ref(null)
const canvas3d = ref(null)
// const mode = nuxtApp.$colorMode.preference
function createCoreSingletons(nuxtApp) {
  const { canvas2d, canvas3d, scene, camera, renderer, ambientLight, pointLight, directionalLight, rectAreaLight, spotLight, hemisphereLight } = useCore(nuxtApp)
  const { planet, stars } = useBlackEnergy(nuxtApp)

  scene.add(planet, stars)

  // const animate = () => {
  //   requestAnimationFrame(animate)
  //   renderer.render(scene, camera)
  // }
  // animate()
  useEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  SUPERGLOBAL.core = {}
  SUPERGLOBAL.core.scene = scene
  SUPERGLOBAL.core.camera = camera
  SUPERGLOBAL.core.renderer = renderer
  SUPERGLOBAL.core.lights = {
    ambientLight,
    pointLight,
    directionalLight,
    rectAreaLight,
    spotLight,
    hemisphereLight,
  }

  SUPERGLOBAL.core.canvas = {
    canvas2d,
    canvas3d,
  }
  // SUPERGLOBAL.gui = {}
  // SUPERGLOBAL.gui.instance = new Panel()
  // SUPERGLOBAL.gui.sceneFolder = gui.addFolder('Scene')
  // SUPERGLOBAL.gui.cameraFolder = gui.addFolder('Camera')
  // SUPERGLOBAL.gui.lightsFolder = gui.addFolder('Lights')
  // SUPERGLOBAL.gui.rendererFolder = gui.addFolder('Renderer')
  // SUPERGLOBAL.gui.controlsFolder = gui.addFolder('Controls')
  // SUPERGLOBAL.gui.canvasFolder = gui.addFolder('Canvas')

  // trigger('core:singletons:complete')
}
const threeJsInspector = nuxtApp.$appStore.getDebugMode
  ? {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
      type: 'module',
    }
  : null
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
    threeJsInspector,

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
/*
   A quick JavaScript 2D vector implementation.

   Based on simplifications of the vector functions in P5.js
   Useful for quick animations in JS using acceleration & velocity.

   MIT License

   Ivaylo Getov, 2015
   www.ivaylogetov.com

   Quick reference:

   var v = new Vector2d(some_x_val, some_y_val);

       v.set(new_x_val, new_y_val);
       v.add(x_val, y_val) OR v.add(v2);
       v.div(divisor);
       v.mult(scalar);
       v.normalize();
       v.setMag(new_length);
       v.dot(v2) OR v.dot(x_val,y_val);
       v.dist(v2);
       v.limit(max_length);
       v.rotateRads(angle_in_radians);
       v.rotateDegs(angle_in_degrees);
       v.headingRads();
       v.headingDegs();
       v.angleBetweenRads(v2) OR v.angleBetweenRads(some_x,some_y);
       v.angleBetweenDegs(v2) OR v.angleBetweenDegs(some_x,some_y)
       v.lerp(v2, lerp_amount) OR v.lerp(some_x, some_y, lerp_amount);
       v.equals(v2) OR v.equals(some_x,some_y);
       var v2 = v.copy();

*/
const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

onMounted(() => {
  nextTick(() => {
    const { ambientLight, pointLight, spotLight, hemisphereLight } = useCore(nuxtApp)
    const { planet, stars } = useBlackEnergy(nuxtApp)
    const experience = new Experience({
      targetElement: document.querySelector('.main-canvas-3d'),
      ctx: document.querySelector('.main-canvas-2d'),
    })
    const scene = experience.scene
    const camera = experience.camera
    const renderer = experience.renderer

    const m = Effects.createWobblyMaterial()
    const g = new THREE.PlaneGeometry(1, 1, 1, 1)
    const mesh = new THREE.Mesh(g, m)
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
  <TheDarkScrollbar />
  <TheFloatingMenu />
  <Teleport to="body">
    <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
    <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
  </Teleport>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <LazyTheDebugger v-if="getDebugMode" />

      <ClientOnly>
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
