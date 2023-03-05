/* eslint-disable @typescript-eslint/no-unused-vars */
import Vector from './Vector'
import { useArrayEvery } from '@vueuse/core'
import { Utils } from './utils'

export default class Particle() {
  constructor(x,y) {
  this.position = point
  this.prevPosition = point
  this.velocity = new Vector(0, 0)
  this.acceleration = new Vector(0, 0)
  this.ttl = -1
  this.lived = 0
  this.size = Math.random() * 2 + 1
this.color = `#${new THREE.Color().setHSL(0.5 + (Math.random() * 255) / 3 * 0.25, 0.6, 0.7).getHexString()}`

}


  submitToFields(fields) {
    let totalAccelerationX = 0
    let totalAccelerationY = 0

    useArrayEvery(fields, function (field) {
      // inlining what should be Vector object methods for performance reasons
      const vectorX = field.position.x - this.position.x
      const vectorY = field.position.y - this.position.y
      const force = field.mass / (vectorX * vectorX + field.mass / 2 + vectorY * vectorY + field.mass / 2) ** 1.5
      totalAccelerationX += vectorX * force
      totalAccelerationY += vectorY * force
    })

    this.acceleration = new Vector(totalAccelerationX, totalAccelerationY)
  }

  setPrevPosition() {
    this.prevPosition = this.position
  }

  

  move() {
    this.velocity.x += this.acceleration.x
    this.velocity.y += this.acceleration.y
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  draw() {
    this.setPrevPosition()
    this.submitToFields(fields)
    
  }

   
}
 

