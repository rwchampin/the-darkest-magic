/* jshint bitwise:false */
/* global define:false,_ */

// define(['lib/Vector'], (Vector) => {
//   'use strict'
import _ from 'lodash'
import Vector from './Vector'

function Particle(point, velocity) {
  this.position = point
  this.velocity = velocity
  this.acceleration = new Vector(0, 0)
  this.ttl = -1
  this.lived = 0
  this.mousePos = new Vector(0, 0)
}

Particle.size = 2
Particle.color = [66, 167, 222, 255]
// Particle.GLOBAL_DRAW_COLOR = [166,67,0,255];

_.extend(Particle.prototype, {
  submitToFields(fields) {
    let totalAccelerationX = 0
    let totalAccelerationY = 0

    _(fields).each(function (field) {
      // inlining what should be Vector object methods for performance reasons
      const vectorX = field.position.x - this.position.x
      const vectorY = field.position.y - this.position.y
      const force = field.mass / (vectorX * vectorX + field.mass / 2 + vectorY * vectorY + field.mass / 2) ** 1.5
      totalAccelerationX += vectorX * force
      totalAccelerationY += vectorY * force
    }, this)

    this.acceleration = new Vector(totalAccelerationX, totalAccelerationY)
  },
  move() {
    this.velocity.x += this.acceleration.x
    this.velocity.y += this.acceleration.y
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  },
  drawVariable(pixels, width, height) {
    const baseIndex = 4 * (~~this.position.y * width + ~~this.position.x)
    const velocity = this.velocity.getMagnitude()
    const r = Particle.color[0] * velocity
    const g = Particle.color[1]
    const b = Particle.color[2] * 0.5 / velocity
    const a = Particle.color[3]
    pixels[baseIndex] += r
    pixels[baseIndex + 1] += g
    pixels[baseIndex + 2] += b
    pixels[baseIndex + 3] = a
  },
  drawBasic(pixels, width, height) {
    const baseIndex = 4 * (~~this.position.y * width + ~~this.position.x)
    const r = Particle.color[0]
    const g = Particle.color[1]
    const b = Particle.color[2]
    const a = Particle.color[3]
    pixels[baseIndex] += r
    pixels[baseIndex + 1] += g
    pixels[baseIndex + 2] += b
    pixels[baseIndex + 3] = a
  },
  drawSoft(pixels, width, height) {
    let baseIndex = 4 * (~~this.position.y * width + ~~this.position.x)
    const r = Particle.color[0]
    const g = Particle.color[1]
    const b = Particle.color[2]
    const a = Particle.color[3]
    pixels[baseIndex - 4] += r * 0.80
    pixels[baseIndex - 3] += g * 0.80
    pixels[baseIndex - 2] += b * 0.80
    pixels[baseIndex - 1] = a
    pixels[baseIndex] += r * 0.80
    pixels[baseIndex + 1] += g * 0.80
    pixels[baseIndex + 2] += b * 0.80
    pixels[baseIndex + 3] = a
    pixels[baseIndex + 4] += r * 0.80
    pixels[baseIndex + 5] += g * 0.80
    pixels[baseIndex + 6] += b * 0.80
    pixels[baseIndex + 7] = a
    baseIndex += width * 4
    pixels[baseIndex - 4] += r * 0.80
    pixels[baseIndex - 3] += g * 0.80
    pixels[baseIndex - 2] += b * 0.80
    pixels[baseIndex - 1] = a
    pixels[baseIndex] += r
    pixels[baseIndex + 1] += g
    pixels[baseIndex + 2] += b
    pixels[baseIndex + 3] = a
    pixels[baseIndex + 4] += r * 0.80
    pixels[baseIndex + 5] += g * 0.80
    pixels[baseIndex + 6] += b * 0.80
    pixels[baseIndex + 7] = a
    baseIndex += width * 4
    pixels[baseIndex - 4] += r * 0.80
    pixels[baseIndex - 3] += g * 0.80
    pixels[baseIndex - 2] += b * 0.80
    pixels[baseIndex - 1] = a
    pixels[baseIndex] += r * 0.80
    pixels[baseIndex + 1] += g * 0.80
    pixels[baseIndex + 2] += b * 0.80
    pixels[baseIndex + 3] = a
    pixels[baseIndex + 4] += r * 0.80
    pixels[baseIndex + 5] += g * 0.80
    pixels[baseIndex + 6] += b * 0.80
    pixels[baseIndex + 7] = a
  },
})

Particle.prototype.draw = Particle.prototype.drawVariable
Particle.drawFunctions = ['Basic', 'Soft', 'Variable']

export default Particle

