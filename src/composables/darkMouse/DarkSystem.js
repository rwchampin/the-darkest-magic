import gsap from 'gsap'
import DarkParticle from './DarkParticle'

export default class DarkSystem {
  constructor() {
    this.canvas = null
    this.ctx = null
    this.renderer = null
    this.scene = null
    this.particles = []
    this.particleCount = 20000
    this.emitters = []
    this.emitterCount = 0
  }

  create() {
    for (let i = 0; i < this.particleCount; i++)
      this.addParticle(new DarkParticle())
  }

  addEmitter(emitter) {
    this.emitters.push(emitter)
    this.emitterCount++
  }

  addParticle(particle) {
    this.particles.push(particle)
    this.particleCount++
  }

  update() {
    this.particles.forEach((particle) => {
      particle.update()
    })
  }
}
