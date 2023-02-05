import {Vector2} from '~/utils/Vector'
import * as THREE from 'three'
import { useMouse } from '@vueuse/core'

 
 
export default class MoverParticle {
  constructor({_x, _y, _ctx, _options = {}}) {
    this.ctx = _ctx;debugger
    this.pos = Vector2.random2D()
    this.vel = Vector2.random2D()
    this.acceleration = Vector2.random2D()
    this.radius = Math.sqrt(this.mass) * 10
    this.mass = Vector2.random2D()
    this.color = 0xFFFFFF,//this.gradientFill()
    // this.color = `#${new THREE.Color().setHSL(0.5 + (Math.random() * 255) / 3 * 0.25, 0.6, 0.7).getHexString()}`
    this.topSpeed = 5
    this.mousePressed = false
  }
  gradientFill() {
    let gradient = this.ctx.createRadialGradient(this.pos.x, this.pos.y, 0, this.pos.x, this.pos.y, this.radius);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.5, 'rgba(0,255,255,1)');  
    gradient.addColorStop(1, 'rgba(0,0,64,1)');
    return gradient;
  }

  draw() {
  //initial render onto canvas
    this.ctx.beginPath()
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle =this.gradientFill()
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
  }

  attract(mover) {
    let force = Vector2.sub(this.pos, mouse);
    let distanceSq = force.magSq();
    let G = 5;
    let strength = G * (this.mass * mover.mass) / distanceSq;
    force.setMag(strength);
    this.applyForce(force);
  }

  applyForce(force) {
    this.acceleration.x += force.x
    this.acceleration.y += force.y
  }

  // draw() {
  //   if (mousePressed) {
  //     const wind = Vector.create(0, 0.2)
  //       applyForce(force);
  //    }
  //     const weightA = Vector.create(gravity, moverA)
  //     const weightB = Vector.create(gravity, moverB)
  //     moverA.applyForce(weightA)
  //     moverB.applyForce(weightB)

  //     moverA.update()
  //     moverA.edges()

  //   this.ctx.beginPath()
  //   this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
  //   this.ctx.fillStyle = this.color
  //   this.ctx.fill()
  // }

  update() {
    // continually update the position & properties of the particle

    this.acceleration = Vector.sub(mouse, this.pos)
    this.acceleration.setMag(0.2)

    this.velocity.add(this.acceleration)
    this.velocity.limit(5)
    this.pos.add(this.velocity)

    if (this.pos.x < 0)
      this.pos.x = this.ctx.canvas.width

    if (this.pos.x > this.ctx.canvas.width)
      this.pos.x = 0

    if (this.pos.y < 0)
      this.pos.y = this.ctx.canvas.height

    if (this.pos.y > this.ctx.canvas.height)
      this.pos.y = 0




    this.draw()
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

  setMousePressed(pressed) {
    if (pressed && typeof pressed === 'boolean') {
      this.mousePressed = pressed
    }
  }
}

// class Attractor {
//   constructor(x,y,m) {
//     this.pos = Vector.create(x,y)
//     this.mass = m
//     this.r = Math.sqrt(this.mass) * 2
//   }

//   attract(mover) {
//      let dir = Vector.sub(this.pos, mover.pos)
//      let distanceSq = dir.magSq()

//      let G = 1;

//       let strength = G* (this.mass * mover.mass) / distanceSq
//       force.setMag(strength);
//       mover.applyForce(force);

//   }
// }