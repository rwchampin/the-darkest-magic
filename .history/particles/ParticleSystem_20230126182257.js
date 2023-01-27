import { Atoms } from './Atoms.js'

export class ParticleSystem extends Atoms {
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
        ).multiplyScalar(POW(2 * (p.position.y / this.canvas.dimensions.y) + 1, 2))
        size
					= POW(p.position.y / this.canvas.dimensions.y * this.config.size, 2) + 2
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

