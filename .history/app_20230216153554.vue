<script setup>
import * as THREE from 'three'
import Naive from 'naive-ui'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import MagicMouse from './core/MagicMouse'
import Resources from '~/core/Resources'
// import { useRoom } from '~/composables/useRoom'
import { useMagicKeyRegistration } from '~/composables/useMagicKeyRegistration'
// import { usePoints } from '~/composables/usePoints.js'
// import { useDarkLightSphere } from '~/composables/useDarkLightSphere.js'

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

/*********************************
** FUCK START
*********************************/
const b = () => {
  const geo = new THREE.BufferGeometry()

  function mapRange(value, a, b, c, d) {
    value = (value - a) / (b - a)
    return c + value * (d - c)
  }
  const theta0 = 20; const phi0 = 20; const radius = 3; const verts = []; const sizes = []

  for (let i = 0; i < theta0; i++) {
    const lng = mapRange(i, 0, theta0, -Math.PI, Math.PI)
    for (let j = 0; j < phi0; j++) {
      const lat = mapRange(j, 0, phi0, -Math.PI / 2, Math.PI / 2)

      const x = radius * Math.sin(lng) * Math.cos(lat)
      const y = radius * Math.sin(lng) * Math.sin(lat)
      const z = radius * Math.cos(lng)

      verts.push(x, y, z)

      sizes.push(Math.random())
    } // end j
  } // end i

  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
  geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))

  geo.setDrawRange(0, verts.length / 3)

  const m = new THREE.PointsMaterial({
    size: 0.1,
    color: 0x000000,
    sizeAttenuation: true,
    depthTest: false,
  })

  const pts = new THREE.Points(geo, m)

  // const positionAttribute = geo.getAttribute('position')
  // positionAttribute.setUsage(THREE.DynamicDrawUsage)
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
  camera.position.set(0, 0, 10)
  camera.updateProjectionMatrix()

  // const magicMouse = new MagicMouse({ scene, camera, renderer })

  // updateParticles = usePoints({ scene, camera, renderer, nuxtApp })
  // useDarkLightSphere({ scene, camera, renderer })
  b()

  gsap.ticker.add((time, deltaTime, frame) => {
    if (updateParticles)
    // updateParticles()

    {
      if (updateLightSphere)
        // updateLightSphere()

        renderer.render(scene, camera)
    }
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
const resources = new Resources({ nuxtApp, debugMode, appStore: nuxtApp.$appStore })
resources.on('assets:progress:complete', (resources) => {
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
    <canvas class="canvas-ui main-canvas-3d" />
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
