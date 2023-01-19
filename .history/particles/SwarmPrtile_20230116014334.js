


export class SwarmParticle {
  constructor(_x, _y, _radius, _color, _ctx) {
    this.x = _x
    this.y = _y
    this.radius = 16
    this.mass = 2;
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
