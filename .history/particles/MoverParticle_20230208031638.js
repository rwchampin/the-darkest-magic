import {Vector2} from '~/utils/Vector'
import * as THREE from 'three'
import { useMouse } from '@vueuse/core'

const clock = new THREE.Clock();
 
export default class MoverParticle {
  constructor({_x, _y, _ctx, _options = {}}) {
    this.ctx = _ctx; 
    this.pos = new THREE.Vector2(_x,_y)
    this.vel = new THREE.Vector2()
    this.acceleration = new THREE.Vector2(Math.random(), Math.random())
    this.radius = 4
    this.mass =5
    this.color = "blue",//this.gradientFill()
    // this.color = `#${new THREE.Color().setHSL(0.5 + (Math.random() * 255) / 3 * 0.25, 0.6, 0.7).getHexString()}`
    this.topSpeed = 5
    this.mousePressed = false
    this.mouse = new THREE.Vector2(Math.random()*500,Math.random()*500);
  
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
    this.ctx.fillStyle = 0x002222//this.gradientFill()
    this.ctx.fill()
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)



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
    const t = clock.getElapsedTime();

      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = 10 * Math.cos(t + theta) * Math.sin(phi)
      const y = 10 * Math.sin(t + theta) * Math.sin(phi)
    const z = 10 * Math.cos(t + phi)
      this.pos = new THREE.Vector3(x,y,z)
    this.acceleration = new THREE.Vector3(Math.random(), Math.random(), Math.random());
    // this.acceleration.setLength(1)

    this.vel.add(this.acceleration)
    // this.vel.limit(5)
    this.pos.add(this.vel)

    // if (this.pos.x < 0)
    //   this.pos.x = this.ctx.canvas.width

    // if (this.pos.x > this.ctx.canvas.width)
    //   this.pos.x = 0

    // if (this.pos.y < 0)
    //   this.pos.y = this.ctx.canvas.height

    // if (this.pos.y > this.ctx.canvas.height)
    //   this.pos.y = 0




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