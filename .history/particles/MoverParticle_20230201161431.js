import {Vector2} from '~/utils/Vector'
import * as THREE from 'three'
let mousePressed = false
import { useMouse } from '@vueuse/core'

const {x,y,sourceType} = useMouse()

window.addEventListener('mousedown', () => {
  mousePressed = true
})

window.addEventListener('mouseup', () => {
  mousePressed = false
})

export default class MoverParticle {
  constructor({_x, _y, _ctx, _options = {}}) {
    this.ctx = _ctx
    this.pos = Vector2.random2D()
    this.vel = Vector2.random2D()
    this.acc = Vector2.random2D()
    this.radius = 16
    this.mass = Vector2.random2D()
    this.color = `#${new THREE.Color().setHSL(0.5 + (Math.random() * 255) / 3 * 0.25, 0.6, 0.7).getHexString()}`
    this.acc = Vector2.random2D()
    this.mousePressed = typeof _options.mousePressed === undefined ? false : _options.mousePressed
    debugger
  }
draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
  }

  friction() {
    let diff = height - (this.pos.y + this.radius);
    if (diff < 1) {
        let friction = this.vel.multiply(-1);
        friction.normalize();
        friction.multiply(0.1);

        let mu = 0.1;
        let normal = this.mass;
        force.setMag(mu * normal);

        this.applyForce(friction);
    }

  applyForce(force) {
    this.acceleration.x += force.x
    this.acceleration.y += force.y
  }

  draw() {
    if (mousePressed) {
      const wind = Vector.create(0, 0.2)
        applyForce(force);
     }
      const weightA = Vector.create(gravity, moverA)
      const weightB = Vector.create(gravity, moverB)
      moverA.applyForce(weightA)
      moverB.applyForce(weightB)

      moverA.update()
      moverA.edges()
    }

    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
  }

  update() {
    let mouse = Vector.create(x.value, y.value)
    this.acceleration = Vector.sub(mouse, this.pos)
    this.acceleration.setMag(0.2)
  }

  edges() {
    if (this.pos.x < 0)
      this.pos.x = this.ctx.canvas.width
    if (this.pos.x > this.ctx.canvas.width)
      this.pos.x = 0
    if (this.pos.y < 0)
      this.pos.y = this.ctx.canvas.height
    if (this.pos.y > this.ctx.canvas.height)
      this.pos.y = 0
  }

  applyForce(force) {
    this.acceleration.x += force.x
    this.acceleration.y += force.y
  }
}

