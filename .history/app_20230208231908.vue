<script setup>
import * as THREE from 'three'
import Resources from '~/core/Resources';
import Naive from 'naive-ui'
import Stats from 'stats.js'
import gsap from 'gsap'
import CustomParticle from '~/particles/CustomParticle'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import EventBus from './core/EventBus';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import MagicMouse from './core/MagicMouse'
import { useMagicKeyRegistration } from '~/composables/useMagicKeyRegistration'
import { usePoints } from '~/composables/usePoints.js'
import { useCore } from '~~/composables/useCore'
import { useEventListener } from '@vueuse/core';
import studio from '@theatre/studio'
import { getProject, types } from '@theatre/core'

let stats, scene, camera, renderer, updateParticles
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

  // const canvas = document.querySelector('.main-canvas-2d')
  // const ctx = canvas.getContext('2d');
  // const particles2d = []

  // for (let c = 0; c < 100; c++) {
  //   const p = new CustomParticle(ctx);
  //   p.update();

  //   particles2d.push(p)
  //   // if (p.life <= 0) {
  //   //   particles2d.splice(c, 1)
  //   // }
  // }


  // Initialize the studio
  studio.initialize()

  // // Create a project for the animation
  const project = getProject('THREE.js x Theatre.js')

  const sheet = project.sheet('Animated scene')

  // // Create a Theatre.js object with the props you want to
  // // animate
  const torusKnotObj = sheet.object('Torus Knot', {
    // Note that the rotation is in radians
    // (full rotation: 2 * Math.PI)
    rotation: types.compound({
      x: types.number(mesh.rotation.x, { range: [-2, 2] }),
      y: types.number(mesh.rotation.y, { range: [-2, 2] }),
      z: types.number(mesh.rotation.z, { range: [-2, 2] }),
    }),
  })

  torusKnotObj.onValuesChange((values) => {
    const { x, y, z } = values.rotation

    mesh.rotation.set(x * Math.PI, y * Math.PI, z * Math.PI)
  })


  // gsap.ticker.add(() => {
  //   for (let r = 0; r < particles2d.length; r++) {
  //     // particles2d[r].update();
  //     debugger
  //   }
  // })
  // const swatchGrid = Utils.color.renderColorSwatchGrid(Utils.color.colorList)
  // document.body.appendChild(swatchGrid)

  /*********************************
  ** Create core variables
  *********************************/
  const core = useCore()

  scene = core.scene
  camera = core.camera
  camera.position.set(0, 0, 200)
  camera.updateProjectionMatrix();
  renderer = core.renderer
  const magicMouse = new MagicMouse({ scene, camera, renderer })
  // const { x, y } = magicMouse.getLightVector()
  useMagicKeyRegistration()
  const { updateParticles, updateNucleus } = usePoints({ scene, camera, renderer, nuxtApp })


  gsap.to('.canvas-ui', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
  })

  const controls = new OrbitControls(camera, renderer.domElement)

  if (debugMode) {
    stats = Stats()
  }







  gsap.ticker.add((time, deltaTime, frame) => {
    if (debugMode) {
      stats.update()
    }
    // camera.updateProjectionMatrix();
    // controls.update();
    // if (frame % 10 === 0) {
    if (updateParticles)
      updateParticles()
    updateNucleus()
    // }

    renderer.render(scene, camera)
  })
  /*********************************
** RESOURCES
*********************************/
  const resources = new Resources({ nuxtApp, debugMode, appStore: nuxtApp.$appStore });
  // useEventListener(window, "assets:progress", (progress) => {
  //   debugger;
  // })
  // useEventListener(window, "assets:progress:complete", (progress) => {
  //   debugger;
  // })
  // resources.on("assets:progress", (resources) => {
  //   console.log(resources);
  //   debugger
  // })
  // resources.on("assets:progress:complete", (resources) => {
  //   updateParticles = usePoints({ scene, camera, renderer, nuxtApp })
  //   start()
  // })
  // }

  /**************************
   * GLOBAL PROVIDES
   *************************/
  nuxtApp.vueApp.provide('debugMode', debugMode)
  if (debugMode.value) {
    nuxtApp.vueApp.provide('stats', stats)
  }
  nuxtApp.vueApp.use(Naive)
});
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
