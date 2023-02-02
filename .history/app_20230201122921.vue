<script setup>
// import Naive from 'naive-ui'
import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useLogo } from '~/composables/useLogo'
import { useVolumetric } from '~/composables/useVolumetric.js'
import { useMagicKeyRegistration } from '~/composables/useMagicKeyRegistration'
import { MagicMouse } from '~/composables/useMagicMouse.js'
import { Utils } from '~/utils'
import { useCore } from '~/core/useCore'
import { ParticleController } from '~/particles/ParticleSystem/ParticleController'
const nuxtApp = useNuxtApp()

// nuxtApp.vueApp.use(Naive)
const canvas2d = ref(null)
const canvas3d = ref(null)

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

    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js',
      ssr: false,
    },

    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js',
      ssr: false,

    },
    // {
    //   src: '~/particles/core/lib/Vector.js',
    //   ssr: false,
    // },
    // {
    //   src: '~/particles/core/lib/Field.js',
    //   ssr: false,
    // },
    // {
    //   src: '~/particles/core/lib/Particle.js',
    //   ssr: false,
    // },

    // {
    //   src: '~/particles/core/lib/Emitter.js',
    //   ssr: false,
    // },
    // {
    //   src: '~/particles/core/lib/Display.js',
    //   ssr: false,
    // },
    // {
    //   src: '~/particles/core/lib/Canvas.js',
    //   ssr: false,
    // },
  ],
})
let mousePointLight; let scene; let camera; let renderer; let ambientLight; let pointLight; let directionalLight; let rectAreaLight; let spotLight; let hemisphereLight

const { debugMode, appLoadingStatus, assetLoadingStatus } = nuxtApp.$appStore

function mouseMe() {
  // scene.add(plane)

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  mousePointLight = Utils.three.createLight({ color: 0xFF0000, intensity: 200 })
  mousePointLight.castShadow = true

  scene.add(mousePointLight)
  function onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera)

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children)
    for (let i = 0; i < intersects.length; i++) {
      // sphere.position.set(intersects[i].point.x, intersects[i].point.y, intersects[i].point.z)
      mousePointLight.position.set(intersects[i].point.x, intersects[i].point.y, camera.position.z - 1)
    }

    // for (let i = 0; i < intersects.length; i++)
    //   intersects[i].object.material.color.set(0xFF0000)
  }

  window.addEventListener('mousemove', onMouseMove, false)
}

const animate = () => {
  // animateIcosahedron()
  renderer.render(scene, camera)
}
onMounted(() => {
  // nextTick(() => {
  const { createCore } = useCore()
  const core = createCore()
  scene = core.scene
  camera = core.camera
  renderer = core.renderer
  ambientLight = core.ambientLight
  pointLight = core.pointLight
  camera.position.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  if (debugMode) {
    Utils.tweakpane.addScene(scene)
    Utils.tweakpane.addCamera(camera)
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)
  }

  // useLogo({ scene, camera, renderer })
  const controls = new OrbitControls(camera, renderer.domElement)

  Utils.three.sceneAdd(scene, pointLight, ambientLight, camera)

  gsap.to('.canvas-ui', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
  })

  gsap.ticker.add((time, deltaTime, frame) => {
    console.table(time, deltaTime, frame)

    pointLight.position.x = Math.random() * Math.sin((Math.PI * 2) * deltaTime) * 10
    pointLight.position.y = Math.random() * Math.cos((Math.PI * 2) * deltaTime) * 10

    animate()
  })

  useMagicKeyRegistration()
  // ParticleController(renderer)
  useVolumetric({ scene, camera, renderer })
})
</script>

<template>
  <ClientOnly>
    <TheFloatingMenu />
    <TheDarkScrollbar />
  </ClientOnly>
  <Teleport to="body">
    <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
    <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
  </Teleport>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <ClientOnly>
        <TheContent>
          <slot />
        </TheContent>
      </ClientOnly>
    </div>
  </div>
  <!--
            <div id="controlContainer1" class="controlContainer">
              <div class="showHideControls">
                <p>Toggle</p>
              </div>
              <div id="welcomeMessage" class="controls">
                <div id="shortcuts">
                  <div>
                    <ul>
                      <li>A : toggle accelerations</li>
                      <li>P : toggle particles</li>
                      <li>V : toggle velocities</li>
                      <li>O : toggle objects</li>
                      <li>E : add emitter</li>
                      <li>F : add field</li>
                      <li>C : Clear</li>
                      <li>S : Step frame</li>
                      <li>Space : pause</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div id="controlContainer2" class="controlContainer">
              <div class="showHideControls">
                <p>Toggle Controls</p>
              </div>
              <div id="displayControls" class="controls">
                <ul>
                  <li>
                    <button id="addEmitter">
                      New Emitter
                    </button>
                  </li>
                  <li>
                    <button id="addField">
                      New Field
                    </button>
                  </li>
                  <li>Click Behavior</li>
                  <li>
                    <div id="clickBehavior">
                      <input id="clickBehavior1" type="radio" name="clickBehavior" checked="checked"><label
                        for="clickBehavior1"
                      >Repel</label>
                      <input id="clickBehavior2" type="radio" name="clickBehavior"><label for="clickBehavior2">Attract</label>
                      <input id="clickBehavior3" type="radio" name="clickBehavior"><label for="clickBehavior3">None</label>
                    </div>
                  </li>
                  <li>&nbsp;</li>
                  <li>
                    <button id="startStop">
                      Stop
                    </button>
                  </li>
                  <li>
                    <button id="step">
                      Step Frame
                    </button>
                  </li>
                  <li>
                    <button id="objects">
                      Hide objects
                    </button>
                  </li>
                  <li>
                    <button id="info">
                      Hide info
                    </button>
                  </li>
                  <li>
                    <button id="particles">
                      Hide particles
                    </button>
                  </li>
                  <li>
                    <button id="accelerations">
                      Show accelerations
                    </button>
                  </li>
                  <li>
                    <button id="velocities">
                      Show velocities
                    </button>
                  </li>
                  <li>
                    <button id="clear">
                      Clear
                    </button>
                  </li>
                  <li>
                    <button id="strings">
                      Strings
                    </button>
                  </li>
                  <li>Max Particles :</li>
                  <li id="maxParticles">
                    <button value="10">
                      10
                    </button>
                    <button value="2000">
                      2k
                    </button>
                    <button value="5000">
                      5k
                    </button>
                    <button value="10000">
                      10k
                    </button>
                    <button value="20000">
                      20k
                    </button>
                  </li>
                  <li>Particle Style</li>
                  <li id="particleStyle">
                    <button value="basic">
                      Basic
                    </button>
                    <button value="variable">
                      Colors
                    </button>
                    <button value="fancy">
                      Fancy
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div id="footer">
              <button id="save">
                Save Locally
              </button>
              <button id="load">
                Load Locally
              </button>

              -
              <button id="example1" class="loadExample">
                Example 1
              </button>
              <button id="example2" class="loadExample">
                Example 2
              </button>
              <button id="example3" class="loadExample">
                Example 3
              </button>
              <button id="example4" class="loadExample">
                Example 4
              </button>
              <button id="example5" class="loadExample">
                Example 5
              </button>
              <button id="bonus" class="loadExample">
                Candle
              </button>
              <button id="3alt" class="loadExample">
                Ex. 3 Alt
              </button>
            </div>
            <div id="floatingControls" class="closable">
              <button id="closeFloatingControls" />
              <button id="deleteObject" />
              <div id="variableControl">
                raierstientrsh
              </div>
            </div> -->

  <!-- <TheDebugger v-if="debugMode" /> -->
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
