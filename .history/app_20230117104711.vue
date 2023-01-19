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
// ** Get NUXTAPP ** //
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(Naive)
const canvas2d = ref(null)
let canvas
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

onMounted(() => {
  nextTick(() => {
    const max_particles = 500
    let particles = []
    const frequency = 100
    const init_num = max_particles
    const max_time = frequency * max_particles
    let time_to_recreate = false
    const data = createCanvas()
    const tela = data[0]
    const canvas = data[1]

    // Enable repopolate
    setTimeout(() => {
      time_to_recreate = true
    }, max_time)

    // Popolate particles
    popolate(max_particles)

    class FishEgg {
      constructor(canvas) {
        const random = Math.random()
        this.progress = 0
        this.canvas = canvas
        // Set position
        this.x = ($(window).width() / 2) + (Math.random() * 300 - Math.random() * 300)
        this.y = ($(window).height() / 2) + (Math.random() * $(window).height() / 4 - Math.random() * $(window).height() / 4)
        // Get viewport size
        this.w = $(window).width()
        this.h = $(window).height()

        // Dimension
        this.radius = 12 + Math.random() * 6
        // Color
        this.color = 'rgba(255,255,255,1)'
        // Setting
        this.fish_egg = {
          offset1: Math.random() > 0.5 ? 0.5 + Math.random() * 3 : 0.5 + Math.random() * -3,
          offset2: Math.random() > 0.5 ? 0.5 + Math.random() * 3 : 0.5 + Math.random() * -3,
          offset3: Math.random() > 0.5 ? 0.5 + Math.random() * 3 : 0.5 + Math.random() * -3,
          radius1: 0.5 + Math.random() * 5,
          radius2: 0.5 + Math.random() * 5,
          radius3: 0.5 + Math.random() * 5,
        }
        this.variantx1 = Math.random() * 100
        this.variantx2 = Math.random() * 100
        this.varianty1 = Math.random() * 100
        this.varianty2 = Math.random() * 100
      }

      createCircle(x, y, r, c) {
        this.canvas.beginPath()
        this.canvas.fillStyle = c
        this.canvas.arc(x, y, r, 0, Math.PI * 2, false)
        this.canvas.fill()
        this.canvas.closePath()
      }

      createEyes() {
        this.createCircle(this.x + this.fish_egg.offset2, this.y + this.fish_egg.offset2, this.fish_egg.radius2 + 4, 'rgba(241, 242, 244, 0.06)')
        this.createCircle(this.x + this.fish_egg.offset3, this.y + this.fish_egg.offset3, this.fish_egg.radius3 + 2, 'rgba(255, 204, 67, 0.08)')
        this.createCircle(this.x + (Math.random(this.progress / 350) * this.fish_egg.offset1), this.y + (Math.random(this.progress / 350) * this.fish_egg.offset1), this.fish_egg.radius1, 'rgba(152, 19, 4, 0.19)')
      }

      render() {
        // Create inside parts
        this.createEyes()

        this.canvas.beginPath()
        const c = '130, 151, 180'
        const rad = this.canvas.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, 1)
        rad.addColorStop(0, `rgba(${c},0.09)`)
        rad.addColorStop(0.9, `rgba(${c},0)`)
        this.canvas.lineWidth = Math.random() * 2.2
        this.canvas.fillStyle = rad
        this.canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.canvas.fill()
        this.canvas.strokeStyle = 'rgba(255, 255, 217, 0.05)'
        this.canvas.stroke()
        this.canvas.closePath()
      }

      move() {
        this.x += (Math.sin(this.progress / this.variantx1) * Math.cos(this.progress / this.variantx2)) / 8
        this.y += (Math.sin(this.progress / this.varianty1) * Math.cos(this.progress / this.varianty2)) / 8

        if (this.x < 0 || this.x > this.w - this.radius)
          return false

        if (this.y < 0 || this.y > this.h - this.radius)
          return false

        this.render()
        this.progress++
        return true
      }
    }

    class FishLarva {
      constructor(canvas, progress) {
        const random = Math.random()
        this.progress = 0
        this.canvas = canvas
        this.speed = 0.5 + random * 1.3

        this.x = ($(window).width() / 2) + (Math.random() * 200 - Math.random() * 200)
        this.y = ($(window).height() / 2) + (Math.random() * 200 - Math.random() * 200)

        this.s = 0.8 + Math.random() * 0.6
        this.a = 0

        this.w = $(window).width()
        this.h = $(window).height()
        this.radius = random * 1.3
        this.color = '#f69a34'

        this.variantx1 = Math.random() * 1000
        this.variantx2 = Math.random() * 1000
        this.varianty1 = Math.random() * 1000
        this.varianty2 = Math.random() * 1000
      }

      render() {
        this.canvas.beginPath()
        this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        this.canvas.lineWidth = 2
        this.canvas.fillStyle = this.color
        this.canvas.fill()
        this.canvas.closePath()
      }

      move() {
        // this.x += (Math.sin(this.progress/this.variantx1)*Math.cos(this.progress/this.variantx2))/this.speed;
        // this.y += (Math.sin(this.progress/this.varianty1)*Math.cos(this.progress/this.varianty2))/this.speed;
        this.x += Math.cos(this.a) * this.s
        this.y += Math.sin(this.a) * this.s
        this.a += Math.random() * 0.8 - 0.4
        if (this.x < 0 || this.x > this.w - this.radius)
          return false

        if (this.y < 0 || this.y > this.h - this.radius)
          return false

        this.render()
        this.progress++
        return true
      }
    }

    class FishLarvaEgg {
      constructor(canvas, progress) {
        const random = Math.random()
        this.progress = 0
        this.canvas = canvas
        this.speed = 0.5 + random * 0.2

        this.x = ($(window).width() / 2) + (Math.random() * 200 - Math.random() * 200)
        this.y = ($(window).height() / 2) + (Math.random() * 200 - Math.random() * 200)

        this.s = Math.random() * 1
        this.a = 0

        this.w = $(window).width()
        this.h = $(window).height()
        this.radius = random * 0.8
        this.color = random > 0.8 ? '#82a0c4' : '#2E4765'

        this.variantx1 = Math.random() * 100
        this.variantx2 = Math.random() * 100
        this.varianty1 = Math.random() * 100
        this.varianty2 = Math.random() * 100
      }

      render() {
        this.canvas.beginPath()
        this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        this.canvas.lineWidth = 2
        this.canvas.fillStyle = this.color
        this.canvas.fill()
        this.canvas.closePath()
      }

      move() {
        this.x += Math.cos(this.a) * this.s
        this.y += Math.sin(this.a) * this.s
        this.a += Math.random() * 0.8 - 0.4

        if (this.x < 0 || this.x > this.w - this.radius)
          return false

        if (this.y < 0 || this.y > this.h - this.radius)
          return false

        this.render()
        this.progress++
        return true
      }
    }

    class Paramecium {
      constructor(canvas) {
        const random = Math.random()
        this.progress = 0
        this.canvas = canvas
        // Set position
        this.x = ($(window).width() / 2) + (Math.random() * 300 - Math.random() * 300)
        this.y = ($(window).height() / 2) + (Math.random() * $(window).height() / 4 - Math.random() * $(window).height() / 4)
        // Get viewport size
        this.w = $(window).width()
        this.h = $(window).height()
        this.rotation = (random * 180) * Math.PI / 180
        // Dimension
        this.radius = 12 + Math.random() * 6
        // Color
        this.color = 'rgba(255,255,255,1)'
        // Setting
        this.variantx1 = Math.random() * 100
        this.variantx2 = Math.random() * 100
        this.varianty1 = Math.random() * 100
        this.varianty2 = Math.random() * 100
      }

      createOval(x, y, w, h) {
        const kappa = 0.5522848
        const ox = (w / 2) * kappa // control point offset horizontal
        const oy = (h / 2) * kappa // control point offset vertical
        const xe = x + w // x-end
        const ye = y + h // y-end
        const xm = x + w / 2 // x-middle
        const ym = y + h / 2 // y-middle

        this.canvas.save()

        this.canvas.translate(this.w / 2, this.h / 2)

        // Rotate 1 degree
        this.canvas.rotate(this.rotation)

        // Move registration point back to the top left corner of canvas
        this.canvas.translate(-this.w / 2, -this.h / 2)

        this.canvas.beginPath()
        this.canvas.moveTo(x, ym)
        this.canvas.quadraticCurveTo(x, y, xm, y)
        this.canvas.quadraticCurveTo(xe, y, xe, ym)
        this.canvas.quadraticCurveTo(xe, ye, xm, ye)
        this.canvas.quadraticCurveTo(x, ye, x, ym)

        this.canvas.strokeStyle = 1
        this.canvas.fillStyle = 'rgba(255,255,255,0.01)'
        this.canvas.fill()
        this.canvas.stroke()
        this.canvas.restore()
      }

      render() {
        // Create inside parts
        this.createOval(this.x, this.y, 12, 4)
      }

      move() {
        this.x += (Math.sin(this.progress / this.variantx1) * Math.cos(this.progress / this.variantx2)) / 4
        this.y += (Math.sin(this.progress / this.varianty1) * Math.cos(this.progress / this.varianty2)) / 4

        if (this.x < 0 || this.x > this.w - this.radius)
          return false

        if (this.y < 0 || this.y > this.h - this.radius)
          return false

        this.render()
        this.progress++
        return true
      }
    }

    /*
   * Function to create canvas
   */
  
    function createCanvas() {
     
      return function () {
        if (!canvas)
          canvas = createCanvas()

        return canvas
      }
      const tela = document.createElement('canvas')
      tela.width = $(window).width()
      tela.height = $(window).height()
      tela.style.position = 'fixed'
      tela.style.top = 0
      tela.style.left = 0
      tela.style.zIndex = 999999
      $('body').append(tela)
      const \\\canvas = tela.getContext('2d')
      return [tela, canvas]
    }

    /*
   * Function to clear layer canvas
   * @num:number number of particles
   */
    function popolate(num) {
      for (let i = 0; i < num; i++) {
        setTimeout(
          (function (x) {
            return function () {
              const random = Math.random()
              // ------------------------------------
              // Set type of planktom
              let type = new FishLarva(canvas)
              if (!time_to_recreate) {
                if (random > 0.97)
                  type = new FishEgg(canvas)
                if (random < 0.1 && random > 0)
                  type = new Paramecium(canvas)
              }
              if (random > 0.1 && random < 0.8)
                type = new FishLarvaEgg(canvas)

              // if(random < .1) this.type  = "bryozoan"
              // ------------------------------------
              // Add particle
              particles.push(type)
            }
          }(i))
          , frequency * i)
      }
      return particles.length
    }

    /*
   * Function to clear layer canvas
   */
    function clear() {
      const grd = canvas.createRadialGradient(tela.width / 2, tela.height / 2, 0, tela.width / 2, tela.height / 2, tela.width)
      grd.addColorStop(0, 'rgba(25,25,54,0.12)')
      grd.addColorStop(1, 'rgba(0,0,20,0.01)')
      // Fill with gradient
      canvas.fillStyle = grd
      canvas.fillRect(0, 0, tela.width, tela.height)
    }

    /*
   * Function to update particles in canvas
   */
    function update() {
      clear()
      particles = particles.filter((p) => { return p.move() })
      // Recreate particles
      if (time_to_recreate) {
        if (particles.length < init_num)
          popolate(1)
      }

      // requestAnimationFrame(update.bind(this))
    }
    // Update canvas
    gsap.ticker.lagSmoothing(true, 16)
    gsap.ticker.add(update)
  })
})

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
