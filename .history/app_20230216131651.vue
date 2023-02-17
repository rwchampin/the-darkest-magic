<script setup>
import * as THREE from 'three'
import Resources from '~/core/Resources';
import Naive from 'naive-ui'
import gsap from 'gsap'
import { useRoom } from '~/composables/useRoom'
import EventBus from './core/EventBus';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import MagicMouse from './core/MagicMouse'
import { useMagicKeyRegistration } from '~/composables/useMagicKeyRegistration'
// import { usePoints } from '~/composables/usePoints.js'
// import { useDarkLightSphere } from '~/composables/useDarkLightSphere.js'

import { useCore } from '~~/composables/useCore'
import { useEventListener } from '@vueuse/core';

let scene, camera, renderer, updateParticles, updateLightSphere
/*********************************
  * GLOBAL COMPONENTS
*********************************/
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.config.devtools = true
/**************************
 * GLOBAL Vars
 *************************/
const debugMode = nuxtApp.$appStore.getDebugMode;

/*********************************
** FUCK START
*********************************/
const b = () => {
  function mapRange(value, a, b, c, d) {
    // first map value from (a..b) to (0..1)
    value = (value - a) / (b - a);
    // then map it from (0..1) to (c..d) and return it
    return c + value * (d - c);
  }

  const total = 100, radius = 3; let verts = []
  for (let i = 0; i < total; i++) {
    const lng = mapRange(i, 0, total, -Math.PI, Math.PI);
    for (let j = 0; j < total; j++) {
      const lat = mapRange(j, 0, total, -Math.PI / 2, Math.PI / 2);

      const x = radius * Math.sin(lng) * Math.cos(lat)
      const y = radius * Math.sin(lng) * Math.sin(lat)
      const z = radius * Math.cos(lng)

      verts.push(x, y, z)
    } //end j
  } //end i
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));

  const positionAttribute = geo.getAttribute('position');
  positionAttribute.setUsage(THREE.DynamicDrawUsage);


  const m = new THREE.PointsMaterial({
    size: .1,
    color: 0x000000,
    sizeAttenuation: true,
    depthTest: false
  })

  const pts = new THREE.Points(geo, m)
  scene.add(pts)
}
/*********************************
** FUCK END
*********************************/


const init = () => {


  /*********************************
  ** Create core variables
  *********************************/
  ({ scene, camera, renderer } = useCore())
  camera.position.set(0, 0, 50)
  camera.updateProjectionMatrix();

  const magicMouse = new MagicMouse({ scene, camera, renderer })

  // updateParticles = usePoints({ scene, camera, renderer, nuxtApp })
  // useDarkLightSphere({ scene, camera, renderer })
  b()






  gsap.ticker.add((time, deltaTime, frame) => {

    if (updateParticles)
      // updateParticles()

      if (updateLightSphere)
        // updateLightSphere()

        renderer.render(scene, camera)
  })

  /*********************************
  ** UNIMPORTANT SHIT
  *********************************/
  useMagicKeyRegistration()
  const controls = new OrbitControls(camera, renderer.domElement)

}




/*********************************
** RESOURCES
*********************************/
const resources = new Resources({ nuxtApp, debugMode, appStore: nuxtApp.$appStore });
// useEventListener(window, "assets:progress", (progress) => {

// })
// useEventListener(window, "assets:progress:complete", (progress) => {
//   init()
// })
// resources.on("assets:progress", (resources) => {
//   console.log(resources);
// })
resources.on("assets:progress:complete", (resources) => {
  init()
})


/**************************
 * GLOBAL PROVIDES
 *************************/
nuxtApp.vueApp.provide('debugMode', debugMode)
nuxtApp.vueApp.use(Naive)

</script>

<template>
  <Teleport to="body">
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
