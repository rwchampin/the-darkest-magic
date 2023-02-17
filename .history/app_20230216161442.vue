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
import dotTexture from '~/assets/particles/dotTexture.png?url'

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

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xFF0000) },
      pointTexture: { value: new THREE.TextureLoader().load(dotTexture) },
    },
    vertexShader: `
           attribute float size;
			attribute vec3 customColor;

			varying vec3 vColor;

			void main() {

				vColor = customColor;

				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

				gl_PointSize = size * ( 300.0 / -mvPosition.z );

				gl_Position = projectionMatrix * mvPosition;

			}

        `,
    fragmentShader: `
            uniform vec3 color;
			uniform sampler2D pointTexture;

			varying vec3 vColor;

			void main() {

				gl_FragColor = vec4( color * vColor, 1.0 );
				gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

			}
        `,
    sizeAttenuation: true,
    depthTest: false,
    transparent: true,
    vertexColors: true,
    // map: texture
  })

  const pts = new THREE.Points(geo, shaderMaterial)

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
  camera.lookAt(0, 0, 0)
  camera.updateProjectionMatrix()
  const axesHelper = new THREE.AxesHelper(500)
  scene.add(axesHelper)

  const geometry = new THREE.BoxGeometry(10, 10, 10)
  geometry.name = 'bitchbox'
  const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
  const cube = new THREE.Mesh(geometry, material)
  cube.position.set(0, 0, 0)
  cube.name = 'bitch'
  scene.add(cube)
  // const magicMouse = new MagicMouse({ scene, camera, renderer })

  // updateParticles = usePoints({ scene, camera, renderer, nuxtApp })
  // useDarkLightSphere({ scene, camera, renderer })
  b()
  // const controls = new OrbitControls(camera, renderer.domElement)
  // controls.addEventListener('change', (r) => {
  //   debugger
  // })
  // // debugger
  gsap.ticker.add((time, deltaTime, frame) => {
    if (updateParticles)
      updateParticles()

    if (updateLightSphere)
      // updateLightSphere()

      cube.rotation.x += 0.01

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
// const resources = new Resources({ nuxtApp, debugMode, appStore: nuxtApp.$appStore })
// resources.on('assets:progress:complete', (resources) => {
//   init()
// })
onMounted(() => {
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
