import Vector from './Util.js'
import Particle from './Particle'

export default function ParticleEmitter(point, velocity) {
  this.position = point
  this.velocity = velocity
  this.size = 8
  this.particleLife = -1
  this.spread = Math.PI / 32
  this.emissionRate = 4

  this.moveTo = function (point) {
    this.position = point
  }

  this.addParticle = function () {
    // var particle = new Particle(this.position.copy(),this.velocity.jitter(ParticleEmitter.jitter));
    const particle = new Particle(this.position.copy(), Vector.fromAngle(this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2), this.velocity.getMagnitude()),
    )
    particle.ttl = this.particleLife
    return particle
  }
  this.toString = function () {
    const coreAttributes = [
      this.position.toString(),
      this.velocity.toString(),
      this.size,
      this.particleLife,
      this.spread.toFixed(2),
      this.emissionRate,
    ]
    return `E${coreAttributes.join(':')}`
  }
}

ParticleEmitter.drawColor = '#999'
ParticleEmitter.drawColor2 = '#000'
ParticleEmitter.jitter = 0.05

ParticleEmitter.fromString = function (string) {
  const parts = (string.substr(1).split(':'))
  const emitter = new ParticleEmitter()
  emitter.position = Vector.fromString(parts.shift())
  emitter.velocity = Vector.fromString(parts.shift())
  emitter.size = parseInt(parts.shift())
  emitter.particleLife = parseInt(parts.shift())
  emitter.spread = parseFloat(parts.shift())
  emitter.emissionRate = parseInt(parts.shift().valueOf())
  return emitter
}
