<script setup>
import Naive from 'naive-ui'
import Resources from '~/core/Resources'
import { useCore } from '~~/composables/useCore'

import DarkMouse from '~/composables/darkMouse/DarkMouse'
const nuxtApp = useNuxtApp()
let scene, camera, renderer, controls

const { $appStore } = nuxtApp
const { gsap, OrbitControls } = nuxtApp.$plugins
const { getDebugMode, getOrbitControlsCreated } = $appStore



const init = () => {
  /*********************************
  ** Create core variables
  *********************************/
  ({ scene, camera, renderer } = useCore())

  gsap.ticker.add((time, deltaTime, frame) => {
    renderer.render(scene, camera)
  })

  usePoints({ scene, camera, renderer, nuxtApp })

  camera.position.set(0, 0, 30)
  camera.lookAt(0, 0, 0)
  camera.updateProjectionMatrix()
  // const dm = new DarkMouse({ nuxtApp, scene, camera, renderer })

  /*********************************
** UNIMPORTANT SHIT
*********************************/
  // if (!getOrbitControlsCreated) {
  // // $appStore.orbitControlsCreated.value = true
  // controls = new OrbitControls(camera, renderer.domElement)
  // controls.enableDamping = true
  // controls.dampingFactor = 0.05
  // controls.enableZoom = true
  // controls.maxZoom = 15
  // controls.minZoom = 14
  // controls.enablePan = true
  // controls.autoRotate = true
  // controls.autoRotateSpeed = 0.8
  // }

  // nuxtApp.vueApp.provide('debugMode', getDebugMode)
  // nuxtApp.vueApp.use(Naive)
}
/*********************************
** RESOURCES
*********************************/

onMounted(() => {
  // const resources = new Resources({ nuxtApp, debugMode, appStore: nuxtApp.$appStore })
  // resources.on('assets:progress:complete', (resources) => {
  //   debugger
  init()
  // })
})
/**************************
   * GLOBAL PROVIDES
   *************************/

</script>

<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <TheProvider>
            <ClientOnly>
              <TheFloatingMenu />
              <TheDarkScroller>

                <NuxtLayout />


              </TheDarkScroller>

              <LazyTheDebugger v-if="getDebugMode" />
            </ClientOnly>
          </TheProvider>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<style scoped>
.main-canvas-3.main-canvas-3d,
#canvas-container {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 99999999 !important;
  background-color: transparent !important;
}
</style>
