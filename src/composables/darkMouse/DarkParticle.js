import * as THREE from 'three'
import chroma from 'chroma-js'

export default class DarkParticle {
  constructor(x, y, z) {
    this.position = new THREE.Vector3(x, y, z)
    this.positionHistory = []
    this.velocity = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
    this.acceleration = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
    this.particlesDelay = 50
    this.delay = Date.now() + (this.particlesDelay * Math.random()) - Math.random()
    this.mass = Math.random() * 0.5 + 0.5
    this.life = 1
    this.alpha = this.life
    this.isAlive = true
    this.rotationSpeed = THREE.MathUtils.randFloat(0.001, 0.01)
    this.rotationAxis = new THREE.Vector3(0, Math.random() * 2 - 1, 0)
  }

  applyAxisAngle() {
    if (this.isAlive)
      this.position.applyAxisAngle(this.rotationAxis, this.rotationSpeed)
    // this.update()
  }

  reset() {
    this.position.set(0, 0, 0)
    this.velocity.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
    this.acceleration.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
    this.delay = Date.now() + (this.particlesDelay * Math.random()) - Math.random()
    this.mass = Math.random() * 0.5 + 0.5
    this.life = 1
    this.alpha = this.life
    this.isDead = false
    this.isAlive = true
    this.rotationSpeed = THREE.MathUtils.randFloat(0.001, 0.01)
    this.rotationAxis = new THREE.Vector3(0, 0, Math.random() * 2 - 1)
  }

  update() {
    if (this.isDead) {
      this.reset()
      return
    }
    this.life -= 0.001
    this.alpha = this.life
    if (this.life <= 0) {
      this.isDead = true
      this.isAlive = false
    }
  }
}
