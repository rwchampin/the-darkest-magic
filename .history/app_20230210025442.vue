<script setup>
import * as THREE from 'three'
import Resources from '~/core/Resources';
import Naive from 'naive-ui'
import Stats from 'stats.js'
import gsap from 'gsap'

import EventBus from './core/EventBus';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import MagicMouse from './core/MagicMouse'
import { useMagicKeyRegistration } from '~/composables/useMagicKeyRegistration'
import { usePoints } from '~/composables/usePoints.js'
import { useLightSphere } from '~/composables/useLightSphere.js'

import { useCore } from '~~/composables/useCore'
import { useEventListener } from '@vueuse/core';

let stats, scene, camera, renderer, updateParticles, updateLightSphere
/*********************************
  * GLOBAL COMPONENTS
*********************************/
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.config.devtools = true
/**************************
 * GLOBAL Vars
 *************************/
const { debugMode } = nuxtApp.$appStore

/*********************************
** EVENT BUS
*********************************/
const eventBus = new EventBus();


onMounted(() => {


  /*********************************
  ** Create core variables
  *********************************/
  const core = useCore()

  scene = core.scene
  camera = core.camera
  camera.position.set(0, 0, 10)
  camera.updateProjectionMatrix();
  renderer = core.renderer

  // const magicMouse = new MagicMouse({ scene, camera, renderer })
  // const { x, y } = magicMouse.getLightVector()
  useMagicKeyRegistration()
  updateParticles = usePoints({ scene, camera, renderer, nuxtApp })
  useLightSphere({ scene, camera, renderer })
  // gsap.to('.canvas-ui', {
  //   opacity: 1,
  //   duration: 1,
  //   ease: 'power2.out',
  // })

  const controls = new OrbitControls(camera, renderer.domElement)

  if (debugMode) {
    stats = Stats()
  }


  //



  gsap.ticker.add((time, deltaTime, frame) => {
    if (debugMode) {
      stats.update()
    }
    camera.updateProjectionMatrix();
    // controls.update();

    if (updateParticles)
      updateParticles()

    // if (updateLightSphere)
    //   updateLightSphere()
    // updateNucleus()


    renderer.render(scene, camera)
  })
  /*********************************
** RESOURCES
*********************************/
  const resources = new Resources({ nuxtApp, debugMode, appStore: nuxtApp.$appStore });
  useEventListener(window, "assets:progress", (progress) => {
    ;
  })
  useEventListener(window, "assets:progress:complete", (progress) => {
    ;
  })
  resources.on("assets:progress", (resources) => {
    console.log(resources);

  })
  // resources.on("assets:progress:complete", (resources) => {
  //   updateParticles = usePoints({ scene, camera, renderer, nuxtApp })
  //   start()
  // })


  /**************************
   * GLOBAL PROVIDES
   *************************/
  nuxtApp.vueApp.provide('debugMode', debugMode)
  if (debugMode.value) {
    nuxtApp.vueApp.provide('stats', stats)
  }
  nuxtApp.vueApp.use(Naive)
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

        <div id="smooth-wrapper">
          <div id="smooth-content">
            <h1>stuff</h1>
            <TheContent>
              <NuxtLayout />
            </TheContent>
          </div>
        </div>

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
