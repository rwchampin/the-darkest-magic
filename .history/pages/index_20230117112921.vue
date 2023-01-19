<script>

onMounted(() => {
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
    stats: Stats,
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
        // eslint-disable-next-line no-useless-return
        return
      else this[key] = value
    }
  }

  class Canvas {
    constructor(selector, context, dimensions, center) {
      const self = this

      if (selector) {
        this.el = document.querySelector(selector)
      }
      else {
        this.el = document.createElement('canvas')
        document.body.appendChild(this.el)
      }
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
        max: 4000,
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

  window.onload = () => {
    const p = new ParticleSystem()
  }
})
</script>
