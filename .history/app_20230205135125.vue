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
  //   // ember.update()
  const movers = []
  const ctx = document.querySelector('.main-canvas-3d').getContext('2d')
  for (let i = 0; i < 1; i++) {
    const x = 500 * Math.random()
    const y = 500 * Math.random()
    const z = window.innerWidth * Math.random()
    p = new MoverParticle({ _x: x, y_: y, _ctx: ctx });
    p.update();
  }
  const yo = () => {


    var sphereRad = 280;
    var radius_sp = 1;
    //for debug messages
    var Debugger = function () { };
    Debugger.log = function (message) {
      try {
        console.log(message);
      }
      catch (exception) {
        return;
      }
    }




    // var theCanvas = document.querySelector("main-canvas-2d");
    // theCanvas.width = window.innerWidth;
    // theCanvas.height = window.innerHeight;
    // theCanvas.style.position = "fixed";
    // theCanvas.style.top = "0px";
    // theCanvas.style.left = "0px";
    // theCanvas.style.zIndex = "9999999999";
    // document.body.appendChild(theCanvas);
    var context = renderer.getContext();

    var window.innerWidth;
    var displayHeight;
    var timer;
    var wait;
    var count;
    var numToAddEachFrame;
    var particleList;
    var recycleBin;
    var particleAlpha;
    var r, g, b;
    var fLen;
    var m;
    var projCenterX;
    var projCenterY;
    var zMax;
    var turnAngle;
    var turnSpeed;
    var sphereCenterX, sphereCenterY, sphereCenterZ;
    var particleRad;
    var zeroAlphaDepth;
    var randAccelX, randAccelY, randAccelZ;
    var gravity;
    var rgbString;
    //we are defining a lot of variables used in the screen update functions globally so that they don't have to be redefined every frame.
    var p;
    var outsideTest;
    var nextParticle;
    var sinAngle;
    var cosAngle;
    var rotX, rotZ;
    var depthAlphaFactor;
    var i;
    var theta, phi;
    var x0, y0, z0;

    init();

    function init() {
      wait = 1;
      count = wait - 1;
      numToAddEachFrame = 8;

      //particle color
      r = 70;
      g = 255;
      b = 140;

      rgbString = "rgba(" + r + "," + g + "," + b + ","; //partial string for color which will be completed by appending alpha value.
      particleAlpha = 1; //maximum alpha

      // displayWidth = theCanvas.width;
      // displayHeight = theCanvas.height;

      fLen = 320; //represents the distance from the viewer to z=0 depth.

      //projection center coordinates sets location of origin
      projCenterX = window.innerWidth / 2;
      projCenterY = displayHeight / 2;

      //we will not draw coordinates if they have too large of a z-coordinate (which means they are very close to the observer).
      zMax = fLen - 2;

      particleList = {};
      recycleBin = {};

      //random acceleration factors - causes some random motion
      randAccelX = 0.1;
      randAccelY = 0.1;
      randAccelZ = 0.1;

      gravity = -0; //try changing to a positive number (not too large, for example 0.3), or negative for floating upwards.

      particleRad = 2.5;

      sphereCenterX = 0;
      sphereCenterY = 0;
      sphereCenterZ = -3 - sphereRad;

      //alpha values will lessen as particles move further back, causing depth-based darkening:
      zeroAlphaDepth = -750;

      turnSpeed = 2 * Math.PI / 1200; //the sphere will rotate at this speed (one complete rotation every 1600 frames).
      turnAngle = 0; //initial angle

      timer = setInterval(onTimer, 10 / 24);
    }

    function onTimer() {
      //if enough time has elapsed, we will add new particles.		
      count++;
      if (count >= wait) {

        count = 0;
        for (i = 0; i < numToAddEachFrame; i++) {
          theta = Math.random() * 2 * Math.PI;
          phi = Math.acos(Math.random() * 2 - 1);
          x0 = sphereRad * Math.sin(phi) * Math.cos(theta);
          y0 = sphereRad * Math.sin(phi) * Math.sin(theta);
          z0 = sphereRad * Math.cos(phi);

          //We use the addParticle function to add a new particle. The parameters set the position and velocity components.
          //Note that the velocity parameters will cause the particle to initially fly outwards away from the sphere center (after
          //it becomes unstuck).
          var p = addParticle(x0, sphereCenterY + y0, sphereCenterZ + z0, 0.002 * x0, 0.002 * y0, 0.002 * z0);

          //we set some "envelope" parameters which will control the evolving alpha of the particles.
          p.attack = 50;
          p.hold = 50;
          p.decay = 100;
          p.initValue = 0;
          p.holdValue = particleAlpha;
          p.lastValue = 0;

          //the particle will be stuck in one place until this time has elapsed:
          p.stuckTime = 90 + Math.random() * 20;

          p.accelX = 0;
          p.accelY = gravity;
          p.accelZ = 0;
        }
      }

      //update viewing angle
      turnAngle = (turnAngle + turnSpeed) % (2 * Math.PI);
      sinAngle = Math.sin(turnAngle);
      cosAngle = Math.cos(turnAngle);

      //background fill
      context.fillStyle = "#000000";
      context.fillRect(0, 0, window.innerWidth, displayHeight);

      //update and draw particles
      p = particleList.first;
      while (p != null) {
        //before list is altered record next particle
        nextParticle = p.next;

        //update age
        p.age++;

        //if the particle is past its "stuck" time, it will begin to move.
        if (p.age > p.stuckTime) {
          p.velX += p.accelX + randAccelX * (Math.random() * 2 - 1);
          p.velY += p.accelY + randAccelY * (Math.random() * 2 - 1);
          p.velZ += p.accelZ + randAccelZ * (Math.random() * 2 - 1);

          p.x += p.velX;
          p.y += p.velY;
          p.z += p.velZ;
        }

        /*
        We are doing two things here to calculate display coordinates.
        The whole display is being rotated around a vertical axis, so we first calculate rotated coordinates for
        x and z (but the y coordinate will not change).
        Then, we take the new coordinates (rotX, y, rotZ), and project these onto the 2D view plane.
        */
        rotX = cosAngle * p.x + sinAngle * (p.z - sphereCenterZ);
        rotZ = -sinAngle * p.x + cosAngle * (p.z - sphereCenterZ) + sphereCenterZ;
        m = radius_sp * fLen / (fLen - rotZ);
        p.projX = rotX * m + projCenterX;
        p.projY = p.y * m + projCenterY;

        //update alpha according to envelope parameters.
        if (p.age < p.attack + p.hold + p.decay) {
          if (p.age < p.attack) {
            p.alpha = (p.holdValue - p.initValue) / p.attack * p.age + p.initValue;
          }
          else if (p.age < p.attack + p.hold) {
            p.alpha = p.holdValue;
          }
          else if (p.age < p.attack + p.hold + p.decay) {
            p.alpha = (p.lastValue - p.holdValue) / p.decay * (p.age - p.attack - p.hold) + p.holdValue;
          }
        }
        else {
          p.dead = true;
        }

        //see if the particle is still within the viewable range.
        if ((p.projX > window.innerWidth) || (p.projX < 0) || (p.projY < 0) || (p.projY > displayHeight) || (rotZ > zMax)) {
          outsideTest = true;
        }
        else {
          outsideTest = false;
        }

        if (outsideTest || p.dead) {
          recycle(p);
        }

        else {
          //depth-dependent darkening
          depthAlphaFactor = (1 - rotZ / zeroAlphaDepth);
          depthAlphaFactor = (depthAlphaFactor > 1) ? 1 : ((depthAlphaFactor < 0) ? 0 : depthAlphaFactor);
          context.fillStyle = rgbString + depthAlphaFactor * p.alpha + ")";

          //draw
          context.beginPath();
          context.arc(p.projX, p.projY, m * particleRad, 0, 1.5 * Math.PI, false);
          context.closePath();
          context.fill();
        }

        p = nextParticle;
      }
    }

    function addParticle(x0, y0, z0, vx0, vy0, vz0) {
      var newParticle;
      var color;

      //check recycle bin for available drop:
      if (recycleBin.first != null) {
        newParticle = recycleBin.first;
        //remove from bin
        if (newParticle.next != null) {
          recycleBin.first = newParticle.next;
          newParticle.next.prev = null;
        }
        else {
          recycleBin.first = null;
        }
      }
      //if the recycle bin is empty, create a new particle (a new ampty object):
      else {
        newParticle = {};
      }

      //add to beginning of particle list
      if (particleList.first == null) {
        particleList.first = newParticle;
        newParticle.prev = null;
        newParticle.next = null;
      }
      else {
        newParticle.next = particleList.first;
        particleList.first.prev = newParticle;
        particleList.first = newParticle;
        newParticle.prev = null;
      }

      //initialize
      newParticle.x = x0;
      newParticle.y = y0;
      newParticle.z = z0;
      newParticle.velX = vx0;
      newParticle.velY = vy0;
      newParticle.velZ = vz0;
      newParticle.age = 0;
      newParticle.dead = false;
      if (Math.random() < 0.5) {
        newParticle.right = true;
      }
      else {
        newParticle.right = false;
      }
      return newParticle;
    }

    function recycle(p) {
      //remove from particleList
      if (particleList.first == p) {
        if (p.next != null) {
          p.next.prev = null;
          particleList.first = p.next;
        }
        else {
          particleList.first = null;
        }
      }
      else {
        if (p.next == null) {
          p.prev.next = null;
        }
        else {
          p.prev.next = p.next;
          p.next.prev = p.prev;
        }
      }
      //add to recycle bin
      if (recycleBin.first == null) {
        recycleBin.first = p;
        p.prev = null;
        p.next = null;
      }
      else {
        p.next = recycleBin.first;
        recycleBin.first.prev = p;
        recycleBin.first = p;
        p.prev = null;
      }
    }














  }
  yo();
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

    p.update()
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
