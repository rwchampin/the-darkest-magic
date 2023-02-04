<script setup>
import { shallowRef, watch } from 'vue'
import gsap from 'gsap'
import Naive from 'naive-ui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import EventBus from '~~/core/EventBus'
// import MagicMouse from './core/MagicMouse'
import { useMagicKeyRegistration } from '~/composables/useMagicKeyRegistration'
// import { useVolumetric } from '~/composables/useVolumetric.js'
import { Utils } from '~/utils'
// import MoverParticle fromx '~/particles/MoverParticle.js'
import FBOPerlinParticles from '~/particles/FBOPerlinParticles.js'

import { useCore } from '~~/composables/useCore'
// import { ParticleController } from '~/particles/ParticleSystem/ParticleController'
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(Naive)
const { debugMode } = nuxtApp.$appStore
const canvas2d = ref(null)
const canvas3d = ref(null)

/**************************
 * GLOBAL PROVIDES
 *************************/
// nuxtApp.vueApp.provide('debugMode', debugMode)
// nuxtApp.vueApp.provide('canvas2d', canvas2d)
// nuxtApp.vueApp.provide('canvas3d', canvas3d)

useHead({
  title: 'RYAN THE DEVELOPER',
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Ryan the developer' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'msapplication-TileColor', content: '#da532c' },
    { name: 'theme-color', content: '#ffffff' },
  ],
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/favicon.ico',
    },
  ],

})
let scene; let camera; let renderer
let ambientLight; let pointLight

const animate = () => {
  // animateIcosahedron()
  renderer.render(scene, camera)
}
onMounted(() => {
  const { createCore } = useCore()
  const core = createCore({

  })
  scene = core.scene
  camera = core.camera
  camera.lookAt(0, 0, 0)
  renderer = core.renderer

  FBOPerlinParticles({ scene, camera, renderer })
  const info = shallowRef({
    geometries: renderer.info.memory.geometries,
    textures: renderer.info.memory.textures,
    programs: renderer.info.programs,
    calls: renderer.info.render.calls,
    triangles: renderer.info.render.triangles,
    points: renderer.info.render.points,
    lines: renderer.info.render.lines,
    frame: renderer.info.render.frame,
  })

  // const magicMouse = new MagicMouse({ scene, camera, renderer })

  // ParticleController(renderer)
  // useVolumetric({ scene, camera, renderer })

  // useLogo({ scene, camera, renderer })

  Utils.three.sceneAdd(scene, pointLight, ambientLight, camera)

  gsap.ticker.add((time, deltaTime, frame) => {
    // camera.position.y += (-y + 200 - camera.position.y) * 0.05

    animate()
  })
  gsap.to('.canvas-ui', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
  })
  useMagicKeyRegistration()
  const { on, off, emit } = useEventBus()
  on('debugMode', (debugMode) => {
    alert('debugMode')
    debugMode.value = !debugMode.value
  })
  watch(debugMode, (debugMode) => {
    if (debugMode) {
      Utils.tweakpane.addScene(scene)
      Utils.tweakpane.addCamera(camera)
      const axesHelper = new THREE.AxesHelper(5)
      scene.add(axesHelper)
    }
  })
  const controls = new OrbitControls(camera, renderer.domElement)
})
</script>

<template>
  {{ debugMode }}
  <n-message-provider>
    <ClientOnly>
      <TheProvider>
        <div id="cursor" />
        <TheFloatingMenu />
        <TheDarkScrollbar />

        <Teleport to="body">
          <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
          <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
        </Teleport>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <TheContent>
              <slot />
            </TheContent>
          </div>
        </div>

        <TheDebugger v-if="nuxtApp.$appStore.debugMode" :info="info" />
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
