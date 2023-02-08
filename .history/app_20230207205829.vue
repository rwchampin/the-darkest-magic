<script setup>

import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import ResourceLoader from '~/core/ResourceLoader';
import Naive from 'naive-ui'
import Stats from 'stats.js'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import EmberParticle from '~~/particles/EmberParticle'
import EventBus from '~/core/EventBus'
import { useMover } from '~/composables/useMover'
import MagicMouse from './core/MagicMouse'
import { useMagicKeyRegistration } from '~/composables/useMagicKeyRegistration'
// import { usePoints } from '~/composables/usePoints.js'
// import { useSpikeSphere } from '~/composables/useSpikeSphere.js'
import { Utils } from '~/utils'
// import MoverParticle from '~/particles/MoverParticle.js'
import { useCore } from '~~/composables/useCore'
const resourceLoader = new ResourceLoader();
let mouseX = 0, mouseY = 0;
let material
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let p, ambientLight, pointLight, stats, scene, camera, renderer, finalPass
/*********************************
  * GLOBAL COMPONENTS
*********************************/
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(Naive)
nuxtApp.vueApp.config.devtools = true
/**************************
 * GLOBAL Vars
 *************************/
const { debugMode } = nuxtApp.$appStore
const canvas2d = ref(null)
const canvas3d = ref(null)

/**************************
 * GLOBAL EVENT BUS
 *************************/
const eventBus = new EventBus()
eventBus.on('debugMode', (debugMode) => {
  // window.$message.success(`Debug Mode: ${debugMode}`)
  debugMode.value = !debugMode.value
})
eventBus.emit('debugMode', () => { debugger; debugMode.value });
/**************************
 * GLOBAL PROVIDES
 *************************/
nuxtApp.vueApp.provide('debugMode', debugMode)
nuxtApp.vueApp.provide('canvas2d', canvas2d)
nuxtApp.vueApp.provide('canvas3d', canvas3d)
nuxtApp.vueApp.provide('eventBus', eventBus)
if (debugMode.value) {
  nuxtApp.vueApp.provide('stats', stats)
}

onMounted(() => {
  const clock = new THREE.Clock();

  // const swatchGrid = Utils.color.renderColorSwatchGrid(Utils.color.colorList)
  // document.body.appendChild(swatchGrid)

  /*********************************
  ** Create core variables
  *********************************/
  const core = useCore()

  scene = core.scene
  camera = core.camera
  renderer = core.renderer
  const magicMouse = new MagicMouse({ scene, camera, renderer })
  const { x, y } = magicMouse.getLightVector()
  useMagicKeyRegistration()
  // usePoints({ scene, camera, renderer })
  // useMover()
  // useVolumetric({ scene, camera, renderer })



  gsap.to('.canvas-ui', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
  })

  const controls = new OrbitControls(camera, renderer.domElement)

  if (debugMode) {
    stats = Stats()
  }



  function init() {


    camera.position.z = 1000;


    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];


    for (let i = 0; i < 10000; i++) {
      const t = clock.getElapsedTime();
      const theta = t * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const x = sphereRad * Math.sin(phi) * Math.cos(theta);
      const y = sphereRad * Math.sin(phi) * Math.sin(theta);
      const z = sphereRad * Math.cos(phi);

      vertices.push(x, y, z);

    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    material = new THREE.PointsMaterial({ color: 0x000000, size: 1, sizeAttenuation: true, alphaTest: 0.5, transparent: true });
    material.color.setHSL(1.0, 0.3, 0.7);

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    //



    //



    //







    //

    document.body.style.touchAction = 'none';
    document.body.addEventListener('pointermove', onPointerMove);

    //

  }

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  }

  function onPointerMove(event) {

    if (event.isPrimary === false) return;

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

  }

  //



  function render() {

    const time = clock.getElapsedTime() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (- mouseY - camera.position.y) * 0.05;

    camera.lookAt(scene.position);





  }




  init();

  gsap.ticker.add((time, deltaTime, frame) => {
    if (debugMode) {
      stats.update()
    }
    render();
    renderer.render(scene, camera)
  })
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
