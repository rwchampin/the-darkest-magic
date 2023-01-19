<!-- eslint-disable no-useless-return -->
<!-- eslint-disable new-cap -->
<!-- eslint-disable @typescript-eslint/no-this-alias -->
<script setup>
import Experience from '~~/core/Experience'

let experience, p
const PI = Math.PI
const TAU = PI * 2
const HALF_PI = PI * 0.5
const RAND = Math.random
const ROUND = Math.round
const SIN = Math.sin
const COS = Math.cos
const ABS = Math.abs
const POW = Math.pow
const lib = {
  v2: Vector2,
  noise,

}

const Vector2 = (function () { function t(i, e) { return _classCallCheck(this, t), this.x = typeof i == 'number' ? i : 0, this.y = typeof e == 'number' ? e : 0, this } return _createClass(t, [{ key: 'zero', value() { return this.x = 0, this.y = 0, this } }, { key: 'clone', value() { return new t(this.x, this.y) } }, { key: 'add', value(t) { return this.x += t.x || 0, this.y += t.y || 0, this } }, { key: 'addX', value(t) { return this.x += t.x || 0, this } }, { key: 'addY', value(t) { return this.y += t.y || 0, this } }, { key: 'addScalar', value(t) { return this.x += t || 0, this.y += t || 0, this } }, { key: 'addScalarX', value(t) { return this.x += t || 0, this } }, { key: 'addScalarY', value(t) { return this.y += t || 0, this } }, { key: 'sub', value(t) { return this.x -= t.x || 0, this.y -= t.y || 0, this } }, { key: 'subX', value(t) { return this.x -= t.x || 0, this } }, { key: 'subY', value(t) { return this.y -= t.y || 0, this } }, { key: 'subScalar', value(t) { return this.x -= t || 0, this.y -= t || 0, this } }, { key: 'subX', value(t) { return this.x -= t || 0, this } }, { key: 'subY', value(t) { return this.y -= t || 0, this } }, { key: 'multiply', value(t) { return this.x *= t.x || 1, this.y *= t.y || 1, this } }, { key: 'multiplyX', value(t) { return this.x *= t.x || 1, this } }, { key: 'multiplyY', value(t) { return this.y *= t.y || 1, this } }, { key: 'multiplyScalar', value(t) { return this.x *= t || 1, this.y *= t || 1, this } }, { key: 'multiplyScalarX', value(t) { return this.x *= t || 1, this } }, { key: 'multiplyScalarY', value(t) { return this.y *= t || 1, this } }, { key: 'divide', value(t) { return t.x === 0 || t.y === 0 ? void console.log('! Cannot divide by zero !') : (this.x /= t.x || 1, this.y /= t.y || 1, this) } }, { key: 'divideX', value(t) { return t.x === 0 ? void console.log('! Cannot divide by zero !') : (this.x /= t.x || 1, this) } }, { key: 'divideY', value(t) { return t.y === 0 ? void console.log('! Cannot divide by zero !') : (this.y /= t.y || 1, this) } }, { key: 'divideScalar', value(t) { return t === 0 ? void console.log('! Cannot divide by zero !') : (this.x /= t || 1, this.y /= t || 1, this) } }, { key: 'divideScalarX', value(t) { return t === 0 ? void console.log('! Cannot divide by zero !') : (this.x /= t || 1, this) } }, { key: 'divideScalarY', value(t) { return t === 0 ? void console.log('! Cannot divide by zero !') : (this.Y /= t || 1, this) } }, { key: 'getMagnitude', value() { return Math.sqrt(this.x ** 2 + this.y ** 2) } }, { key: 'normalize', value() { this.divideScalar(this.getMagnitude()) } }, { key: 'randomize', value(i) { return i = i || new t(1, 1), this.x = Math.random() * i.x, this.y = Math.random() * i.y, this } }, { key: 'addRandom', value(t) { t = t || 0, this.x += t - Math.random() * (2 * t), this.y += t - Math.random() * (2 * t) } }, { key: 'addRandomX', value(t) { t = t || 0, this.x += t - Math.random() * (2 * t) } }, { key: 'addRandomY', value(t) { t = t || 0, this.y += t - Math.random() * (2 * t) } }, { key: 'lerp', value(t, i) { return t = t || this, i = i || 0.05, this.x = (1 - i) * this.x + i * t.x, this.y = (1 - i) * this.y + i * t.y, this } }, { key: 'midpoint', value(i) { const e = new t(this.x + i.x, this.y + i.y); return e.divideScalar(2), e } }, { key: 'slope', value(t) { return (t.y - this.y) / (t.x - this.x) * -1 } }, { key: 'intercept', value(t) { return console.log(-t * this.x + this.y), -t * this.x + this.y } }, { key: 'distanceTo', value(t) { return t = t || this, Math.sqrt((t.x - this.x) ** 2 + (t.y - this.y) ** 2) } }, { key: 'angleTo', value(t, i) { return t = t || this, (i = i || 'rad') === 'rad' ? Math.atan2(t.y - this.y, t.x - this.x) : i === 'deg' ? 180 * Math.atan2(t.y - this.y, t.x - this.x) / Math.PI : void 0 } }]), t }())

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

    this.ctx = this.el.getContext(context) || this.el.getContext('2d')
    this.dimensions = dimensions || { x: 0, y: 0 }
    this.center = new lib.v2()
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
    lib.noise.seed(RAND * 2000)
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
      const rand = ROUND(RAND())
      const x = rand
        ? ROUND(RAND()) * this.canvas.dimensions.x
        : RAND() * this.canvas.dimensions.x
      const y = rand
        ? RAND() * this.canvas.dimensions.y
        : ROUND(RAND()) * this.canvas.dimensions.y
      p = new Particle(x, y, this.canvas.dimensions, this.canvas.center)
      this.points.push(p)
    }
    for (let i = this.points.length - 1; i >= 0; i--) {
      p = this.points[i]
      if (p.reset) {
        this.points.splice(i, 1)
        continue
      }
      else {
        p.lastPosition.x = p.position.x
        p.lastPosition.y = p.position.y
        noiseVal = lib.noise.simplex3(
          p.position.x * 0.0015,
          p.position.y * 0.0015,
          this.tick * 0.005,
        )
        noiseNorm = ABS(noiseVal)
        theta
                    = noiseVal
                    * TAU
                    * (1000 / (p.position.distanceTo(this.canvas.center) + 1000))
        theta2 = p.position.angleTo(this.canvas.center) + HALF_PI * 0.25
        dTheta = (theta + theta2) / 2
        hue = theta * 10 - 30
        colorString = this.canvas.hsla(hue, '50%', '50%', noiseNorm + 0.2)
        vel = new lib.v2(
          (COS(theta) * 0.5 + COS(theta2)) * 6,
          (SIN(theta) * 0.5 + SIN(theta2)) * 3,
        ).multiplyScalar((2 * (p.position.y / this.canvas.dimensions.y) + 1) ** 2)
        size
                    = (p.position.y / this.canvas.dimensions.y * this.config.size) ** 2 + 2
        p.velocity.lerp(vel, 0.035)
        p.update()
        this.canvas.drawLine(
          p.lastPosition.x,
          p.lastPosition.y,
          p.position.x,
          p.position.y,
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

