<script setup>
import * as THREE from 'three'
import Naive from 'naive-ui'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import MagicMouse from './core/MagicMouse'
import Resources from '~/core/Resources'
import { useRoom } from '~/composables/useRoom'
import { useMagicKeyRegistration } from '~/composables/useMagicKeyRegistration'
import { usePoints } from '~/composables/usePoints.js'
import { useLightSphere } from '~/composables/useLightSphere.js'
import { useCore } from '~~/composables/useCore'

let scene, camera, renderer, updateParticles, updateLightSphere
/*********************************
  * GLOBAL COMPONENTS
*********************************/
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.config.devtools = true
/**************************
 * GLOBAL Vars
 *************************/
const debugMode = nuxtApp.$appStore.getDebugMode

const init = () => {
  /*********************************
  ** Create core variables
  *********************************/
  ({ scene, camera, renderer } = useCore())
  camera.position.set(0, 0, 10)
  camera.lookAt(0, 0, 0)

  // const color = 0xFFFFFF
  // const intensity = 10.5
  // const light = new THREE.PointLight(color, intensity)
  // light.castShadow = true
  // light.position.set(0, 0, 0)
  // scene.add(light)

  // const helper = new THREE.PointLightHelper(light)
  // scene.add(helper)

  const magicMouse = new MagicMouse({ scene, camera, renderer })

  updateParticles = usePoints({ scene, camera, renderer, nuxtApp })
  updateLightSphere = useLightSphere({ scene, camera, renderer })
  useRoom({ scene, camera, renderer, nuxtApp })

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enableZoom = true
  controls.maxZoom = 15
  controls.minZoom = 14
  controls.enablePan = true
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.8

  gsap.ticker.add((time, deltaTime, frame) => {
    if (updateParticles)
      updateParticles()

    if (updateLightSphere)
      updateLightSphere()

    camera.updateProjectionMatrix()
    controls.update()

    renderer.render(scene, camera)
  })

  /*********************************
  ** UNIMPORTANT SHIT
  *********************************/
  useMagicKeyRegistration()
}

/*********************************
** RESOURCES
*********************************/
const resources = new Resources({ nuxtApp, debugMode, appStore: nuxtApp.$appStore })
// resources.on('assets:progress:complete', (resources) => {
//   init()
// })
onMounted(() => {
  init()
})
/**************************
   * GLOBAL PROVIDES
   *************************/
// nuxtApp.vueApp.provide('debugMode', debugMode)
nuxtApp.vueApp.use(Naive)
</script>

<template>
  <Teleport to="body">
    <canvas class="canvas-ui main-canvas-3d" />
  </Teleport>
  <n-message-provider>
    <ClientOnly>
      <TheProvider>
        <div id="cursor" />
        <!-- <TheFloatingMenu /> -->
        <TheDarkScrollbar />

        <div id="smooth-wrapper">
          <div id="smooth-content">
            <h1>stuff</h1>
            <TheContent>
              <NuxtLayout />
            </TheContent>
          </div>
        </div>

        <!-- <TheDebugger v-if="debugMode" /> -->
      </TheProvider>
    </ClientOnly>
  </n-message-provider>
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
