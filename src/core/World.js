import Experience from './Experience.js'
import Gradient from './Gradient.js'
import Smoke from './Smoke.js'
import Particles from './Particles.js'
import Vignette from './Vignette.js'

export default class World {
  constructor(_options) {
    this.experience = new Experience({
      targetElement: document.querySelector('#main-canvas-3d'),
      ctx: document.querySelector('#main-canvas-2d'),
    })
    this.config = this.experience.config
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.loader = this.experience.loader

    this.resources.on('groupEnd', (_group) => {
      if (_group.name === 'base') {
        this.setGradient()
        this.setSmoke()
        this.setVignette()
        this.setParticles()
      }
    })

    this.resources.on('assets:progress:complete', (_group, _resource, _data) => {
      this.experience.setProgress(_group.loaded / _group.toLoad * 100)
      debugger
    })

    this.resources.on('app:loaded', () => {

    })
  }

  setGradient() {
    this.gradient = new Gradient()
  }

  setSmoke() {
    this.smoke = new Smoke()
  }

  setParticles() {
    this.particles = new Particles()
  }

  setVignette() {
    this.vignette = new Vignette()
  }

  resize() {
    if (this.smoke)
      this.smoke.resize()
  }

  update() {
    if (this.gradient)
      this.gradient.update()

    if (this.smoke)
      this.smoke.update()

    if (this.particles)
      this.particles.update()
  }

  destroy() {
  }
}
