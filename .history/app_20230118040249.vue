<script setup>
import Naive from 'naive-ui'
import gsap from 'gsap'
import $ from 'jquery'
import Experience from './core/Experience'
import { useMagicMouse } from './composables/useMagicMouse'
import Display from './particles/core/lib/Display'
import Vector from './particles/core/lib/Vector'
// import GUI from './particles/core/gui'
import ParticleSystem from './particles/core/lib/ParticleSystem'
import { Utils } from '~/utils/'
// ** Get NUXTAPP ** //
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(Naive)
const canvas2d = ref(null)
const canvas3d = ref(null)
// const mode = nuxtApp.$colorMode.preference
function createCoreSingletons(nuxtApp) {
  const { canvas2d, canvas3d, scene, camera, renderer, ambientLight, pointLight, directionalLight, rectAreaLight, spotLight, hemisphereLight } = useCore(nuxtApp)
  const { planet, stars } = useBlackEnergy(nuxtApp)

  scene.add(planet, stars)

  // const animate = () => {
  //   requestAnimationFrame(animate)
  //   renderer.render(scene, camera)
  // }
  // animate()
  useEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  SUPERGLOBAL.core = {}
  SUPERGLOBAL.core.scene = scene
  SUPERGLOBAL.core.camera = camera
  SUPERGLOBAL.core.renderer = renderer
  SUPERGLOBAL.core.lights = {
    ambientLight,
    pointLight,
    directionalLight,
    rectAreaLight,
    spotLight,
    hemisphereLight,
  }

  SUPERGLOBAL.core.canvas = {
    canvas2d,
    canvas3d,
  }
  // SUPERGLOBAL.gui = {}
  // SUPERGLOBAL.gui.instance = new Panel()
  // SUPERGLOBAL.gui.sceneFolder = gui.addFolder('Scene')
  // SUPERGLOBAL.gui.cameraFolder = gui.addFolder('Camera')
  // SUPERGLOBAL.gui.lightsFolder = gui.addFolder('Lights')
  // SUPERGLOBAL.gui.rendererFolder = gui.addFolder('Renderer')
  // SUPERGLOBAL.gui.controlsFolder = gui.addFolder('Controls')
  // SUPERGLOBAL.gui.canvasFolder = gui.addFolder('Canvas')

  // trigger('core:singletons:complete')
}
const threeJsInspector = nuxtApp.$appStore.getDebugMode
  ? {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
      type: 'module',
    }
  : null
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
    threeJsInspector,

    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js',
      ssr: false,
      type: 'module',
    },

    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js',
      ssr: false,

    },
  ],
})

const draggable = ref(null)
const { getDebugMode } = nuxtApp.$appStore
/*
   A quick JavaScript 2D vector implementation.

   Based on simplifications of the vector functions in P5.js
   Useful for quick animations in JS using acceleration & velocity.

   MIT License

   Ivaylo Getov, 2015
   www.ivaylogetov.com

   Quick reference:

   var v = new Vector2d(some_x_val, some_y_val);

       v.set(new_x_val, new_y_val);
       v.add(x_val, y_val) OR v.add(v2);
       v.div(divisor);
       v.mult(scalar);
       v.normalize();
       v.setMag(new_length);
       v.dot(v2) OR v.dot(x_val,y_val);
       v.dist(v2);
       v.limit(max_length);
       v.rotateRads(angle_in_radians);
       v.rotateDegs(angle_in_degrees);
       v.headingRads();
       v.headingDegs();
       v.angleBetweenRads(v2) OR v.angleBetweenRads(some_x,some_y);
       v.angleBetweenDegs(v2) OR v.angleBetweenDegs(some_x,some_y)
       v.lerp(v2, lerp_amount) OR v.lerp(some_x, some_y, lerp_amount);
       v.equals(v2) OR v.equals(some_x,some_y);
       var v2 = v.copy();

*/

function Vector2d(x, y) { // create a new instance using "new"
  this.x = x // var v = new Vector2d(some_x_val, some_y_val);
  this.y = y

  this.set = function (x, y) { // reset the x,y values of an existing vector.
    this.x = x // v.set(new_x_val, new_y_val);
    this.y = y
  }

  this.magSq = function () { // returns the length of the vector, squared.
    const x = this.x; const y = this.y
    return x * x + y * y
  }

  this.mag = function () { // returns the length of the vector.
    return Math.sqrt(this.magSq())
  }

  this.add = function (x, y) { // add two vectors together, or add x and y values
    if (x instanceof Vector2d) { // to an existing vector.
      this.x += x.x // v.add(x_val, y_val) OR v.add(v2)
      this.y += x.y
      return this
    }
    this.x += x
    this.y += y
    return this
  }

  this.sub = function (x, y) { // same as above, with subtraction
    if (x instanceof Vector2d) {
      this.x -= x.x
      this.y -= x.y
      return this
    }
    this.x -= x
    this.y -= y
    return this
  }

  this.div = function (n) { // divide vector length (ie magnitude) by a constant
    this.x /= n // v.div(divisor)
    this.y /= n
    return this
  }

  this.mult = function (n) { // multiply vector length (ie magnitude) by a constant
    this.x *= n // v.mult(scalar)
    this.y *= n
    return this
  }

  this.normalize = function () { // set magnitude equal to 1
    return this.div(this.mag()) // v.normalize()
  }

  this.setMag = function (n) { // set magnitude to a given value
    return this.normalize().mult(n) // v.setMag(new_length)
  }

  this.dot = function (x, y) { // returns dot product of two vectors
    if (x instanceof Vector2d) { // v1.dot(v2) OR v.dot(x_val,y_val)
      return this.dot(x.x, x.y)
    }
    return this.x * (x || 0)
      + this.y * (y || 0)
  }

  this.dist = function (v) { // returns the distance between two points defined as vectors
    const d = v.copy().sub(this) // v1.dist(v2)
    return d.mag()
  }

  this.limit = function (l) { // constrain the magnitude (length) of a vector to the value
    const mSq = this.magSq() // passed to this function.
    if (mSq > l * l) { // v.limit(max_length)
      this.div(Math.sqrt(mSq))
      this.mult(l)
    }
    return this
  }

  this.headingRads = function () { // returns heading in radians
    const h = Math.atan2(this.y, this.x)
    return h
  }

  this.headingDegs = function () { // returns heading in Degrees
    const r = Math.atan2(this.y, this.x)
    const h = (r * 180.0) / Math.PI
    return h
  }

  this.rotateRads = function (a) { // rotates the vector by given angle in radians
    const newHead = this.headingRads() + a // v.rotateRads(angle_in_radians)
    const mag = this.mag()
    this.x = Math.cos(newHead) * mag
    this.y = Math.sin(newHead) * mag
    return this
  }

  this.rotateDegs = function (a) { // rotates the vector by given angle in radians
    a = (a * Math.PI) / 180.0 // v.rotateDegs(angle_in_degrees)
    const newHead = this.headingRads() + a
    const mag = this.mag()
    this.x = Math.cos(newHead) * mag
    this.y = Math.sin(newHead) * mag
    return this
  }

  this.angleBetweenRads = function (x, y) { // find the angle between two vectors in radians
    const v1 = this.copy(); let v2 // v1.angleBetweenRads(v2) OR v.angleBetweenRads(some_x,some_y)
    if (x instanceof Vector2d)
      v2 = x.copy()

    else
      v2 = new Vector2d(x, y)

    const angle = Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()))
    return angle
  }

  this.angleBetweenDegs = function (x, y) { // same as above, except in degrees
    const r = this.angleBetweenRads(x, y)
    const d = (r * 180) / Math.PI
    return d
  }

  this.lerp = function (x, y, amt) { // linear interpolate the vector to another vector
    if (x instanceof Vector2d) { // amt is a value between 0.0 (close to the old vector)
      return this.lerp(x.x, x.y, y) // and 1.0 (close to the new vector)
    } // v1.lerp(v2, lerp_amount) OR v.lerp(some_x, some_y, lerp_amount)
    if (amt > 1.0)
      amt = 1.0
    this.x += (x - this.x) * amt
    this.y += (y - this.y) * amt
    return this
  }

  this.equals = function (x, y) { // checks if two vectors are identical.
    let a, b // returns true or false
    if (x instanceof Vector2d) { // v1.equals(v2) OR v.equals(some_x,some_y)
      a = x.x || 0
      b = x.y || 0
    }
    else {
      a = x || 0
      b = y || 0
    }

    return this.x === a && this.y === b
  }

  this.copy = function () {
    return new Vector2d(this.x, this.y) // returns a COPY of the vector (ie pass by value, not by reference)
  } // var v2 = v1.copy()
}

onMounted(() => {
  nextTick(() => {
    

// onMounted(() => {
//   const script = document.createElement('script')
//   script.type = 'text/javascript'
//   script.src = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js'
//   document.head.appendChild(script)

//   const experience = new Experience({
//     targetElement: document.querySelector('.main-canvas-3d'),
//     ctx: document.querySelector('.main-canvas-2d'),
//   })

//   const canvas = experience.canvas2d
//   const ctx = experience.ctx

//   const display = new Display(canvas)
//   display.init()
//   const particleSystem = new ParticleSystem().init(display)
//   display.start()

//   // const gui = new GUI(particleSystem, display)

//   particleSystem.addEmitter(new Vector(360, 230), Vector.fromAngle(0, 2))
//   particleSystem.addField(new Vector(700, 230), -140)
//   particleSystem.addNewParticles()
//   function resize() {
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
//   }
//   window.addEventListener('resize', resize); resize()

//   const mouse = useMagicMouse({ experience })
//   gsap.to('.canvas-ui', {
//     opacity: 1,
//     duration: 1,
//     ease: 'power2.out',
//   })
// })
</script>

<template>
  <TheDarkScrollbar />
  <TheFloatingMenu />
  <Teleport to="body">
    <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
    <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
  </Teleport>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <LazyTheDebugger v-if="getDebugMode" />

      <ClientOnly>
        <Nuxt>
          <TheContent />
        </Nuxt>
      </ClientOnly>
    </div>
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
