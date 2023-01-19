<!-- eslint-disable no-useless-return -->
<!-- eslint-disable new-cap -->
<!-- eslint-disable @typescript-eslint/no-this-alias -->
<script setup>
import * as THREE from 'three'
import { Utils } from '~/utils/'
import Experience from '~~/core/Experience'
let experience, p
const PI = Math.PI
const RAND = Math.random
const ROUND = Math.round
const TAU = PI * 2
const HALF_PI = PI * 0.5
const SIN = Math.sin
const COS = Math.cos
const ABS = Math.abs
const POW = Math.pow

const lib = {
  v2: THREE.Vector2,
  noise: {
    simplex3: Utils.math.noise3d, // createNoise3D(Date.now()),
  },

}

class Config {
  constructor(opts) {
    this.merge(opts)
  }

  merge(opts) {
    for (const opt in opts)
      this.set(opt, opts[opt])
  }

  set(key, value) {
    if (!key || !value)
      return
    else this[key] = value
  }
}

class Canvas {
  constructor(selector, context, dimensions, center) {
    const self = this

    if (selector)
      this.el = experience.ctx

    else
      this.el = experience.ctx

    this.ctx = experience.ctx
    this.dimensions = dimensions || { x: 0, y: 0 }
    this.center = new lib.v2()
    debugger
    window.addEventListener('resize', self.resize.bind(self))
  }

  rgba(r, g, b, a) {
    return `rgba(${r},${g},${b},${a})`
  }

  hsla(h, s, l, a) {
    return `hsla(${h}, ${s}, ${l}, ${a})`
  }

  fill(x, y, width, height, fill) {
    this.ctx.fillStyle = fill || 'rgba(0,0,0,1)'
    this.ctx.fillRect(x, y, width, height)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.dimensions.x, this.dimensions.y)
  }

  drawLine(x1, y1, x2, y2, stroke, strokeWidth) {
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.strokeStyle = stroke || 'rgba(255,255,255,1)'
    this.ctx.lineWidth = strokeWidth || 2
    this.ctx.stroke()
    this.ctx.closePath()
  }

  resize() {
    this.el.width = this.dimensions.x = window.innerWidth
    this.el.height = this.dimensions.y = window.innerHeight
    this.center.x = this.dimensions.x * 0.5
    this.center.y = this.dimensions.y * 0.5
    this.ctx.globalCompositeOperation = 'lighter'
  }
}

class Particle {
  constructor(x, y, bounds, center) {
    this.lastPosition = new lib.v2()
    this.position = new lib.v2(x, y)
    this.velocity = new lib.v2()
    this.life = 0
    this.ttl = 1000
    this.bounds = bounds
    this.center = center
    this.reset = false
  }

  update() {
    if (this.life > this.ttl || this.checkBounds()) {
      this.reset = true
    }
    else {
      this.position.add(this.velocity)
      this.life++
    }
  }

  checkBounds() {
    return (
      this.lastPosition.x - this.size * 3 > this.bounds.x
            || this.lastPosition.x < -this.size
            || this.lastPosition.y - this.size * 3 > this.bounds.y
            || this.lastPosition.y < -this.size
            || this.position.distanceTo(this.center) < 3
    )
  }
}

class ParticleSystem {
  constructor(opts) {
    // lib.noise.seed(Math.random * 2000)
    const defaults = {
      max: 400,
      size: 5,
    }
    this.canvas = new Canvas('.canvas', '2d')
    this.canvas.resize()
    this.bounds = this.canvas.dimensions
    this.config = new Config(defaults)
    this.tick = 0
    this.points = []
    this.render()
  }

  update() {
    let pRef,
      p,
      noiseVal,
      noiseNorm,
      theta,
      theta2,
      dTheta,
      vel,
      vel2,
      size,
      hue,
      colorString
    this.canvas.clear()
    this.canvas.ctx.lineCap = 'round'
    if (this.points.length < this.config.max && this.tick % 2 === 0) {
      const x = Math.round(Math.random()) * this.canvas.dimensions.x
      const y = Math.round() * this.canvas.dimensions.y

      this.points.push(new Particle(x, y, this.canvas.dimensions, this.canvas.center))
    }
    for (let i = this.points.length - 1; i >= 0; i--) {
      point = this.points[i]
      if (point.reset) {
        this.points.splice(i, 1)
        continue
      }
      else {
        point.lastPosition.x = point.position.x
        point.lastPosition.y = point.position.y
        noiseVal = lib.noise.simplex3(
          point.position.x * 0.0015,
          point.position.y * 0.0015,
          this.tick * 0.005,
        )
        noiseNorm = ABS(noiseVal)
        theta
                = noiseVal
                * TAU
                * (1000 / (p.position.distanceTo(this.canvas.center) + 1000))
        theta2 = point.position.angleTo(this.canvas.center) + HALF_PI * 0.25
        dTheta = (theta + theta2) / 2
        hue = theta * 10 - 30
        colorString = this.canvas.hsla(hue, '50%', '50%', noiseNorm + 0.2)
        vel = new lib.v2(
          (COS(theta) * 0.5 + COS(theta2)) * 6,
          (SIN(theta) * 0.5 + SIN(theta2)) * 3,
        ).multiplyScalar((2 * (point.position.y / this.canvas.dimensions.y) + 1) ** 2)
        size
            = (point.position.y / this.canvas.dimensions.y * this.config.size) ** 2 + 2
        point.velocity.lerp(vel, 0.035)
        point.update()
        this.canvas.drawLine(
          point.lastPosition.x,
          point.lastPosition.y,
          point.position.x,
          point.position.y,
          colorString,
          size,
        )
      }
    }
    this.tick++
  }

  render() {
    const self = this
    self.update()
    window.requestAnimationFrame(self.render.bind(self))
  }
}

onMounted(() => {
  const c3 = document.querySelector('.main-canvas-3d')
  const c2 = document.querySelector('.main-canvas-2d')
  experience = new Experience({
    targetElement: c3,
    ctx: c2,
  })

  p = new ParticleSystem()
})
</script>

