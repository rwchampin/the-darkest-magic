

import Vector from '~/core/Vector';

export class SwarmParticle {
  constructor(_x, _y, _m, _radius, _color, _ctx) {

    this.pos = Vector.create(_x, _y)
    this.vel = Vector.create(0, 0)
    this.acc = Vector.create(0, 0)
    this.radius = 16
    this.mass = _m;
    this.color = _color
    this.acc = Math.random() * 
  }

  applyForce(force) {
    this.acceleration.x += force.x
    this.acceleration.y += force.y
    }
  draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
  }

  update() {
    this.draw()
    this.edges()
  }

  edges() {
    if (this.x < 0)
      this.x = canvas.width
    if (this.x > canvas.width)
      this.x = 0
    if (this.y < 0)
      this.y = canvas.height
    if (this.y > canvas.height)
      this.y = 0
  }

  applyForce(force) {
    this.acceleration.x += force.x
    this.acceleration.y += force.y
  }
}
