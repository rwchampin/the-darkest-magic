<script setup>

import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';



import { shallowRef, watch } from 'vue'

import Naive from 'naive-ui'

import Stats from 'stats.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import EmberParticle from '~~/particles/EmberParticle'
import EventBus from '~/core/EventBus'
import gsap, { ScrollSmoother } from 'gsap/all'
import MagicMouse from './core/MagicMouse'
import { useMagicKeyRegistration } from '~/composables/useMagicKeyRegistration'
import { useVolumetric } from '~/composables/useVolumetric.js'
// import { useSpikeSphere } from '~/composables/useSpikeSphere.js'
import { Utils } from '~/utils'
import MoverParticle from '~/particles/MoverParticle.js'
import { useCore } from '~~/composables/useCore'
// gsap.registerPlugin(ScrollSmoother)
let ambientLight, pointLight, stats, scene, camera, renderer
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
  // const swatchGrid = Utils.color.renderColorSwatchGrid(Utils.color.colorList)
  // document.body.appendChild(swatchGrid)
  // nuxtApp.$registerPlugins();
  // ScrollSmoother.create({
  //   wrapper: '#smooth-wrapper',
  //   content: '#smooth-content',
  //   smooth: 1.5,
  //   smoothTouch: 0.1,
  //   normalizeScroll: true,
  // })
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
  // useVolumetric({ scene, camera, renderer })
  //   // const ember = new EmberParticle({ scene, camera, renderer })
  const m = () => {

    const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

    const bloomLayer = new THREE.Layers();
    bloomLayer.set(BLOOM_SCENE);

    const params = {
      exposure: 1,
      bloomStrength: 5,
      bloomThreshold: 0,
      bloomRadius: 0,
      scene: 'Scene with Glow'
    };

    const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
    const materials = {};

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 200);
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 1;
    controls.maxDistance = 100;
    controls.addEventListener('change', render);

    scene.add(new THREE.AmbientLight(0x404040));

    const renderScene = new RenderPass(scene, camera);

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    const finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture }
        },
        vertexShader: `

      varying vec2 vUv;

      void main() {

        vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

	}
  `,
        fragmentShader: `

      uniform sampler2D baseTexture;
      uniform sampler2D bloomTexture;

      varying vec2 vUv;

      void main() {

        gl_FragColor = (texture2D(baseTexture, vUv) + vec4(1.0) * texture2D(bloomTexture, vUv));

}


      `,
        defines: {}
      }), 'baseTexture'
    );
    finalPass.needsSwap = true;

    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(finalPass);

    const raycaster = new THREE.Raycaster();

    const mouse = new THREE.Vector2();

    window.addEventListener('pointerdown', onPointerDown);

    const gui = new GUI();

    gui.add(params, 'scene', ['Scene with Glow', 'Glow only', 'Scene only']).onChange(function (value) {

      switch (value) {

        case 'Scene with Glow':
          bloomComposer.renderToScreen = false;
          break;
        case 'Glow only':
          bloomComposer.renderToScreen = true;
          break;
        case 'Scene only':
          // nothing to do
          break;

      }

      render();

    });

    const folder = gui.addFolder('Bloom Parameters');

    folder.add(params, 'exposure', 0.1, 2).onChange(function (value) {

      renderer.toneMappingExposure = Math.pow(value, 4.0);
      render();

    });

    folder.add(params, 'bloomThreshold', 0.0, 1.0).onChange(function (value) {

      bloomPass.threshold = Number(value);
      render();

    });

    folder.add(params, 'bloomStrength', 0.0, 10.0).onChange(function (value) {

      bloomPass.strength = Number(value);
      render();

    });

    folder.add(params, 'bloomRadius', 0.0, 1.0).step(0.01).onChange(function (value) {

      bloomPass.radius = Number(value);
      render();

    });

    setupScene();

    function onPointerDown(event) {

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, false);
      if (intersects.length > 0) {

        const object = intersects[0].object;
        object.layers.toggle(BLOOM_SCENE);
        render();

      }

    }

    window.onresize = function () {

      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

      bloomComposer.setSize(width, height);
      finalComposer.setSize(width, height);

      render();

    };

    function setupScene() {

      scene.traverse(disposeMaterial);
      scene.children.length = 0;

      const geometry = new THREE.IcosahedronGeometry(1, 15);

      for (let i = 0; i < 50; i++) {

        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05);

        const material = new THREE.MeshBasicMaterial({ color: color });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = Math.random() * 10 - 5;
        sphere.position.y = Math.random() * 10 - 5;
        sphere.position.z = Math.random() * 10 - 5;
        sphere.position.normalize().multiplyScalar(Math.random() * 4.0 + 2.0);
        sphere.scale.setScalar(Math.random() * Math.random() + 0.5);
        scene.add(sphere);

        if (Math.random() < 0.25) sphere.layers.enable(BLOOM_SCENE);

      }

      render();

    }

    function disposeMaterial(obj) {

      if (obj.material) {

        obj.material.dispose();

      }

    }

    function render() {

      switch (params.scene) {

        case 'Scene only':
          renderer.render(scene, camera);
          break;
        case 'Glow only':
          renderBloom(false);
          break;
        case 'Scene with Glow':
        default:
          // render scene with bloom
          renderBloom(true);

          // render the entire scene, then render bloom scene on top
          finalComposer.render();
          break;

      }

    }

    function renderBloom(mask) {

      if (mask === true) {

        scene.traverse(darkenNonBloomed);
        bloomComposer.render();
        scene.traverse(restoreMaterial);

      } else {

        camera.layers.set(BLOOM_SCENE);
        bloomComposer.render();
        camera.layers.set(ENTIRE_SCENE);

      }

    }

    function darkenNonBloomed(obj) {

      if (obj.isMesh && bloomLayer.test(obj.layers) === false) {

        materials[obj.uuid] = obj.material;
        obj.material = darkMaterial;

      }

    }

    function restoreMaterial(obj) {

      if (materials[obj.uuid]) {

        obj.material = materials[obj.uuid];
        delete materials[obj.uuid];

      }

    }
  }
  m();
  const movers = []
  const ctx = document.querySelector('.main-canvas-3d').getContext('2d')
  for (let i = 0; i < 1; i++) {
    const x = window.innerWidth * Math.random()
    const y = window.innerHeight * Math.random()
    const z = window.innerWidth * Math.random()
    const p = new MoverParticle(x, y, ctx);
    p.draw();
  }

  //   // FBOPerlinParticles({scene, camera, renderer})
  // const info = shallowRef({
  //   geometries: renderer.info.memory.geometries,
  //   textures: renderer.info.memory.textures,
  //   programs: renderer.info.programs,
  //   calls: renderer.info.render.calls,
  //   triangles: renderer.info.render.triangles,
  //   points: renderer.info.render.points,
  //   lines: renderer.info.render.lines,
  //   frame: renderer.info.render.frame,
  // })



  //   // ParticleController(renderer)


  //   // useLogo({scene, camera, renderer})
  // const spikeSphere = useSpikeSphere();

  //   // gsap.to('.canvas-ui', {
  //   //   opacity: 1,
  //   //   duration: 1,
  //   //   ease: 'power2.out',
  //   // })



  //   // watch(debugMode, (debugMode) => {
  //   //   if (debugMode) {
  //   //     Utils.tweakpane.addScene(scene)
  //   //     Utils.tweakpane.addCamera(camera)
  //   //     const axesHelper = new THREE.AxesHelper(5)
  //   //     scene.add(axesHelper)
  //   //   }
  //   // })
  const controls = new OrbitControls(camera, renderer.domElement)

  if (debugMode) {
    stats = Stats()
  }


  gsap.ticker.add((time, deltaTime, frame) => {
    if (debugMode) {
      stats.update()
    }


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

        <!-- <div id="smooth-wrapper">
          <div id="smooth-content">
            <TheContent>
              <NuxtLayout />
            </TheContent>
          </div>
</div> -->

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
