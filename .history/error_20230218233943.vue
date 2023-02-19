<script setup>
import { SplitText, gsap } from 'gsap/all'
import { ErrorParticle } from '~/particles/ErrorParticle'
import { Utils } from '~utils'
import { useCore } from '~/composables/useCore'

const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})

const canvasGroup = ref(null)
const canvas = null
const particles = []

useHead({
  title: 'Ryan The Developer',
  htmlAttrs: {
    lang: 'en',
    class: 'error',
  },

  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/public-assets/error-favicon.png',
    },
  ],
})
onMounted(() => {
  let particles = []
  const frequency = 20
  // Popolate particles
  setInterval(
    () => {
      popolate()
    },
    frequency,
  )

  const c1 = createCanvas({ width: $(window).width(), height: $(window).height() })
  const c2 = createCanvas({ width: $(window).width(), height: $(window).height() })
  const c3 = createCanvas({ width: $(window).width(), height: $(window).height() })

  const tela = c1.canvas
  const canvas = c1.context

  // $("body").append(tela);
  $('body').append(c3.canvas)
  writeText(c2.canvas, c2.context, 'PARTICLES\nWRITE\nTEXT')

  class Particle {
    constructor(canvas, options) {
      const random = Math.random()
      this.canvas = canvas
      this.x = options.x
      this.y = options.y
      this.s = (3 + Math.random())
      this.a = 0
      this.w = $(window).width()
      this.h = $(window).height()
      this.radius = 0.5 + Math.random() * 20
      this.color = this.radius > 5 ? '#FF5E4C' : '#ED413C' // this.randomColor()
    }

    randomColor() {
      const colors = ['#FF5E4C', '#FFFFFF']
      return colors[this.randomIntFromInterval(0, colors.length - 1)]
    }

    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
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
      // this.swapColor()
      this.x += Math.cos(this.a) * this.s
      this.y += Math.sin(this.a) * this.s
      this.a += Math.random() * 0.8 - 0.4

      if (this.x < 0 || this.x > this.w - this.radius)
        return false

      if (this.y < 0 || this.y > this.h - this.radius)
        return false

      this.render()
      return true
    }
  }

  function createCanvas(properties) {
    const canvas = document.createElement('canvas')
    canvas.width = properties.width
    canvas.height = properties.height
    const context = canvas.getContext('2d')
    return {
      canvas,
      context,
    }
  }

  function writeText(canvas, context, text) {
    const size = 100
    context.font = `${size}px Montserrat`
    context.fillStyle = '#111111'
    context.textAlign = 'center'
    const lineheight = 70
    const lines = text.split('\n')
    for (let i = 0; i < lines.length; i++)
      context.fillText(lines[i], canvas.width / 2, canvas.height / 2 + lineheight * i - (lineheight * (lines.length - 1)) / 3)
  }

  function maskCanvas() {
    c3.context.drawImage(c2.canvas, 0, 0, c2.canvas.width, c2.canvas.height)
    c3.context.globalCompositeOperation = 'source-atop'
    c3.context.drawImage(c1.canvas, 0, 0)
    blur(c1.context, c1.canvas, 2)
  }

  function blur(ctx, canvas, amt) {
    ctx.filter = `blur(${amt}px)`
    ctx.drawImage(canvas, 0, 0)
    ctx.filter = 'none'
  }

  /*
   * Function to clear layer canvas
   * @num:number number of particles
   */
  function popolate() {
    particles.push(
      new Particle(canvas, {
        x: ($(window).width() / 2),
        y: ($(window).height() / 2),
      }),
    )
    return particles.length
  }

  function clear() {
    canvas.globalAlpha = 0.03
    canvas.fillStyle = '#111111'
    canvas.fillRect(0, 0, tela.width, tela.height)
    canvas.globalAlpha = 1
  }

  function update() {
    clear()
    particles = particles.filter((p) => {
      return p.move()
    })
    maskCanvas()
    requestAnimationFrame(update.bind(this))
  }

  update()
})
</script>

<template>
  <section class="error-page">
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div class="super-text" />
        <div class="title">
          <h3>A N O T H E R <strong>C O D E P E N</strong></h3>
        </div>
        <div class="more-pens">
          <a target="_blank" href="https://codepen.io/plasm/" class="white-mode">VIEW OTHER PENS</a>
          <a target="_blank" href="https://codepen.io/collection/nZpPbz/" class="white-mode">VIEW OTHER PARTICLES</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#canvas-target {
  position: relative;
  margin: 0 auto !important;
  max-width: 80%;
  text-align: center;
}

h2 {
  text-align: center;
}

#canvas-target canvas {
  width: 100%;
}

section {
  min-height: 100vh;
  width: 100vw;
  padding: var(--padding-inner);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #111111;
  color: #EEEEEE;
}

p {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  text-align: center;
  color: #EEEEEE;
}

.error-title h3 {
  font-family: Montserrat-Black;
}

h3 {
  opacity: 1;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  padding: 0;
  margin: 0;
  text-transform: uppercase;
  line-height: 1;
  color: #EEEEEE;
  letter-spacing: 20px;
}
</style>
