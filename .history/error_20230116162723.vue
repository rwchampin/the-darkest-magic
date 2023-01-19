<script setup>
import { SplitText, gsap } from 'gsap/all'
import { ErrorParticle } from '@particles/ErrorParticle'
import { Utils } from '~utils'
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})
gsap.registerPlugin(SplitText)

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
  const size = 200
  const w = window.innerWidth
  const h = size
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
  const c1 = createCanvas({ width: w * 0.5, height: 300 })
  const c2 = createCanvas({ width: w * 0.5, height: 300 })
  const c3 = createCanvas({ width: w * 0.5, height: 300 })

  const tela = c1.canvas
  const canvas = c1.context

  canvasGroup.value.append(c3.canvas)
  writeText(c2.canvas, c2.context, props.error.statusCode)

  function writeText(canvas, context, text) {
    context.font = `${size}px Montserrat-Black`
    context.fillStyle = '#FFFFFF'
    context.textAlign = 'center'
    context.margin = '0 auto'
    const lineheight = size * 2
    const lines = text.split('\n')

    // for (let i = 0; i < lines.length; i++)
    // context.fillText(lines[i], canvas.width, size + lineheight * i - (size * (lines.length - 1)))
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
      new ErrorParticle(canvas, {
        x: (w),
        y: (h),
      }),
    )
    return particles.length
  }

  function clear() {
    canvas.globalAlpha = 0.03
    canvas.fillStyle = '#111111'
    canvas.fillRect(0, 0, window.innerWidth, window.innerHeight)
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
// onMounted(() => {
//   const size = 80
//   const splitText = new SplitText('h3', { type: 'chars', charsClass: 'letter lock' })
//   gsap.utils.toArray('.letter').forEach((letter, i) => {
//     gsap.from(letter, { opacity: 0, y: 10 * (i + 20), duration: 0.05 * i, stagger: 0.4 })
//   })
//   // gsap.from('.particle-btn', { opacity: 0, y: 100, duration: 0.5, delay: 0.5 })

//   const frequency = 20
//   // Popolate particles
//   setInterval(
//     () => {
//       popolate()
//     },
//     frequency,
//   )

//   const c1 = Utils.createCanvas({ width: window.innerWidth, height: size })
//   const c2 = Utils.createCanvas({ width: window.innerWidth, height: size })
//   const c3 = Utils.createCanvas({ width: window.innerWidth, height: size })

//   const tela = c1.canvas
//   canvas = c1.context

//   canvasGroup.value.appendChild(c3.canvas)
//   writeText(c2.canvas, c2.context, `${props.error.statusCode}`)

//   function writeText(canvas, context, text) {
//     context.font = '120px Montserrat-Black'
//     context.fontWeight = 900
//     context.fillStyle = '#111111'
//     context.textAlign = 'center'
//     const lineheight = 120
//     const lines = text.split('\n')
//     for (let i = 0; i < lines.length; i++)
//       context.fillText(lines[i], window.innerWidth / 2, window.innerHeight / 2 + lineheight * i - (lineheight * (lines.length - 1)) / lines.length)
//   }

//   function maskCanvas() {
//     c3.context.drawImage(c2.canvas, 0, 0, c2.canvas.width, c2.canvas.height)
//     c3.context.globalCompositeOperation = 'source-atop'
//     c3.context.drawImage(c1.canvas, 0, 0)
//     blur(c1.context, c1.canvas, 1)
//   }

//   function blur(ctx, canvas, amt) {
//     ctx.filter = `blur(${amt}px), drop-shadow(-12px 12px 0.1rem #FF0000)`
//     ctx.drawImage(canvas, 0, 0)
//     ctx.filter = 'none'
//   }

//   /*
//  * Function to clear layer canvas
//  * @num:number number of particles
//  */
//   function popolate() {
//     particles.push(
//       new ErrorParticle(canvas, {
//         x: (window.innerWidth / 2),
//         y: (window.innerHeight / 2),
//       }),
//     )
//     return particles.length
//   }

//   function clear() {
//     canvas.globalAlpha = 0.03
//     canvas.fillStyle = '#111111'
//     canvas.fillRect(0, 0, tela.width, tela.height)
//     canvas.globalAlpha = 1
//   }

//   function update() {
//     clear()
//     particles = particles.filter((p) => {
//       return p.move()
//     })
//     maskCanvas()
//     requestAnimationFrame(update)
//   }

//   update()
// })
</script>

<template>
  <!-- <NuxtLayout :name="default"> -->
  <!-- <LazyTheBaseMouse :config="mouseConfig" /> -->
  <section class="error-page">
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div class="super-text">
          {{ props.error.statusCode }}
        </div>
        <div id="canvas-target" ref="canvasGroup" />

        <div class="error-title">
          <h3>{{ props.error.statusCode }}</h3>
        </div>
        <h2>{{ Utils.errorMessages[props.error.statusCode] }}</h2>
        <p>{{ props.error.stack }}</p>
        <!-- <ButtonParticle class="error-btn" /> -->

        <!-- </NuxtLayout> -->
      </div>
    </div>
  </section>
</template>

<style scoped>
#canvas-target {
  position: relative;
  margin: 0 auto;
  text-align: center;

}
h2 {
  text-align: center;
}
#canvas-target canvas {
  margin: 0 auto !important;
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

.error #smooth-content::after,
.error #smooth-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 150px;
  z-index: 200;
}

.error #smooth-content::before {
  background: linear-gradient(-180deg, crimson, darkred 100%);
}

.error #smooth-content::after {
  background: linear-gradient(180deg, crimson, darkred 100%);
}

#canvas-target {
  position: relative;
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
