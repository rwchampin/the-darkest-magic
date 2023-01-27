<script setup>
import Naive from 'naive-ui'
import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

// import { ParticleSystem } from '~/particles/ParticleSystem'
// import EmberParticles from '~/particles/EmberParticles'
import { useMagicKeyRegistration } from '~/composables/useMagicKeyRegistration'
import { useMagicMouse } from '~/core/reti.js'
import ParticleController from '~/particles/ParticleSystem/ParticleController'

let mousePointLight, scene, camera, renderer, ambientLight, pointLight, directionalLight, rectAreaLight, spotLight, hemisphereLight
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(Naive)
const canvas2d = ref(null)
const canvas3d = ref(null)
THREE.Cache.enabled = true

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
let icosahedron
const draggable = ref(null)
const { getDebugMode } = nuxtApp.$appStore
function makeBox() {
  const s = 10
  const geometry = new THREE.BoxGeometry(s, s / 2, s)

  const material = new THREE.MeshPhongMaterial({
    color: 0xA0ADAF,
    shininess: 10,
    specular: 0x111111,
    side: THREE.BackSide,
    // wireframe: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.y = 0 // s / 2
  mesh.receiveShadow = true
  scene.add(mesh)
}
function createLight(color) {
  const intensity = 2
  const s = 0.2
  const light = new THREE.PointLight(color, intensity, 20)
  light.castShadow = true
  light.shadow.bias = -0.005 // reduces self-shadowing on double-sided objects

  let geometry = new THREE.SphereGeometry(s, 12, 6)
  let material = new THREE.MeshBasicMaterial()
  material.color.multiplyScalar(intensity)
  const sphere = new THREE.Mesh(geometry, material)
  light.add(sphere)

  geometry = new THREE.SphereGeometry(s, 16, 8)
  material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,

    alphaTest: 0.5,
  })

  return light
}
function mouseMe() {
  // scene.add(plane)

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  mousePointLight = createLight()
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
      mousePointLight.position.set(intersects[i].point.x, intersects[i].point.y, intersects[i].point.z)
    }

    // for (let i = 0; i < intersects.length; i++)
    //   intersects[i].object.material.color.set(0xFF0000)
  }

  window.addEventListener('mousemove', onMouseMove, false)
}
function createIcosahedron() {
  const icosGeometry = new THREE.IcosahedronGeometry(0.5, 0)
  const icosMaterial = new THREE.MeshPhongMaterial({
    color: 0xA0ADAF,
    shininess: 100,
    specular: 0x111111,
    side: THREE.BackSide,
    // wireframe: true,
  })
  icosahedron = new THREE.Mesh(icosGeometry, icosMaterial)
  return icosahedron
}
const animate = () => {
  icosahedron.rotation.x += 0.1
  icosahedron.rotation.y += 0.1
  renderer.render(scene, camera)
}
onMounted(() => {
  nextTick(() => {
    const c = document.querySelector('.main-canvas-2d')

    scene = new THREE.Scene()

    const ambientLight = new THREE.AmbientLight(0x111122)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.BasicShadowMap
    camera.position.set(0, 0, 1)
    camera.lookAt(0, 0, 0)

    useMagicKeyRegistration(nuxtApp)
    makeBox()
    mouseMe()
    const y = useMagicMouse()
    const u = y()

    // // main({ renderer })
    gsap.ticker.add(animate)

    const controls = new OrbitControls(camera, renderer.domElement)
    // const emberParticles = new EmberParticles()
    ParticleController()
    createIcosahedron()
    scene.add(
      icosahedron,
      ambientLight,
      // emberParticles.points,
      ambientLight,
      camera,
      pointLight,
      spotLight,
      mousePointLight,
    )

    gsap.to('.canvas-ui', {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    })

    // const core = {
    //   scene,
    //   camera,
    //   renderer,
    // }
  })
})
</script>

<template>
  <TheFloatingMenu />
  <LazyTheDarkScrollbar />
  <Teleport to="body">
    <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
    <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
  </Teleport>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <ClientOnly>
        <TheContent />
      </ClientOnly>
    </div>
  </div>

  <LazyTheDebugger v-if="getDebugMode" :modules="coreModules" />

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
  </div>
  <div id="error">
    <p>
      Your browser is a little out of date to view this demo. Please update your browser or try with the latest versions
      of any of the following :
      <br><br><br><br>
      <a href="http://www.google.com/chrome/">Chrome</a><br>
      <a href="http://www.mozilla.com/en-US/firefox/fx/">Firefox</a><br>
      <a href="http://www.apple.com/safari/">Safari</a><br>
      <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home">Internet Explorer</a>
    </p>
    <button onclick="$(this).closest('#error').hide();">
      Close Anyway
    </button>
  </div>
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
