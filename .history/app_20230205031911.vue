<script setup>
import { shallowRef, watch } from 'vue'

import Naive from 'naive-ui'
import * as THREE from 'three'
import Stats from 'stats.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import EmberParticle from '~~/particles/EmberParticle'
import EventBus from '~/core/EventBus'
import gsap, { ScrollSmoother } from 'gsap/all'
import MagicMouse from './core/MagicMouse'
import { useMagicKeyRegistration } from '~/composables/useMagicKeyRegistration'
import { useVolumetric } from '~/composables/useVolumetric.js'
// import { useSpikeSphere } from '~/composables/useSpikeSphere.js'
import { Utils } from '~/utils'
// import MoverParticle fromx '~/particles/MoverParticle.js'
import { useCore } from '~~/composables/useCore'
gsap.registerPlugin(ScrollSmoother)
let ambientLight, pointLight, stats, scene, camera, renderer
/*********************************
  * GLOBAL COMPONENTS
*********************************/
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(Naive)
nuxtApp.vueApp.config.devtools = true
/**************************
 * GLOBAL Vars
 *************************/
const { debugMode } = nuxtApp.$appStore
const canvas2d = ref(null)
const canvas3d = ref(null)

/**************************
 * GLOBAL EVENT BUS
 *************************/
const eventBus = new EventBus()
eventBus.on('debugMode', (debugMode) => {
  // window.$message.success(`Debug Mode: ${debugMode}`)
  debugMode.value = !debugMode.value
})
eventBus.emit('debugMode', () => { debugger; debugMode.value });
/**************************
 * GLOBAL PROVIDES
 *************************/
nuxtApp.vueApp.provide('debugMode', debugMode)
nuxtApp.vueApp.provide('canvas2d', canvas2d)
nuxtApp.vueApp.provide('canvas3d', canvas3d)
nuxtApp.vueApp.provide('eventBus', eventBus)
if (debugMode.value) {
  nuxtApp.vueApp.provide('stats', stats)
}

onMounted(() => {
  // const swatchGrid = Utils.color.renderColorSwatchGrid(Utils.color.colorList)
  // document.body.appendChild(swatchGrid)
  // nuxtApp.$registerPlugins();
  // ScrollSmoother.create({
  //   wrapper: '#smooth-wrapper',
  //   content: '#smooth-content',
  //   smooth: 1.5,
  //   smoothTouch: 0.1,
  //   normalizeScroll: true,
  // })
  /*********************************
  ** Create core variables
  *********************************/
  const core = useCore()

  scene = core.scene
  camera = core.camera
  renderer = core.renderer
  const magicMouse = new MagicMouse({ scene, camera, renderer })
  const { x, y } = magicMouse.getLightVector()
  useMagicKeyRegistration()
  useVolumetric({ scene, camera, renderer })
  //   // const ember = new EmberParticle({ scene, camera, renderer })

  //   // FBOPerlinParticles({ scene, camera, renderer })
  // const info = shallowRef({
  //   geometries: renderer.info.memory.geometries,
  //   textures: renderer.info.memory.textures,
  //   programs: renderer.info.programs,
  //   calls: renderer.info.render.calls,
  //   triangles: renderer.info.render.triangles,
  //   points: renderer.info.render.points,
  //   lines: renderer.info.render.lines,
  //   frame: renderer.info.render.frame,
  // })



  //   // ParticleController(renderer)


  //   // useLogo({ scene, camera, renderer })
  // const spikeSphere = useSpikeSphere();

  //   // gsap.to('.canvas-ui', {
  //   //   opacity: 1,
  //   //   duration: 1,
  //   //   ease: 'power2.out',
  //   // })



  //   // watch(debugMode, (debugMode) => {
  //   //   if (debugMode) {
  //   //     Utils.tweakpane.addScene(scene)
  //   //     Utils.tweakpane.addCamera(camera)
  //   //     const axesHelper = new THREE.AxesHelper(5)
  //   //     scene.add(axesHelper)
  //   //   }
  //   // })
  const controls = new OrbitControls(camera, renderer.domElement)

  if (debugMode) {
    stats = Stats()
  }
  gsap.ticker.add((time, deltaTime, frame) => {
    if (debugMode) {
      stats.update()
    }


    renderer.render(scene, camera)
  })
})
</script>

<template>
  <Teleport to="body">
    <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
    <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
  </Teleport>
  <n-message-provider>
    <ClientOnly>
      <TheProvider>
        <div id="cursor" />
        <TheFloatingMenu />
        <TheDarkScrollbar />

        <!-- <div id="smooth-wrapper">
          <div id="smooth-content">
            <TheContent>
              <NuxtLayout />
            </TheContent>
          </div>
        </div> -->

        <TheDebugger v-if="debugMode" />
      </TheProvider>
    </ClientOnly>
  </n-message-provider>
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
