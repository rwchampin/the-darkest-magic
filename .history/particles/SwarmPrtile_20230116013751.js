export class SwarmParticle {
  constructor(_x, _y, _radius, _color, _ctx) {
    this.x = _x
    this.y = _y
    this.radius = _radius
    this.color = _color
    this.ctx = _ctx
    this.velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
    }
    this.acceleration = {
      x: 0,
      y: 0,
    }
    this.maxSpeed = 2
    this.maxForce = 0.1
    this.neighbourDistance = 100
    this.separationDistance = 50
    this.separationForce = 1.5
    this.alignmentForce = 1
    this.cohesionForce = 1
    this.mouse = {
      x: undefined,
      y: undefined,
    }
    this.mouseRadius = 100
    this.mouseForce = 2
    this.mouseForceRadius = 50
    this.mouseForceRadiusSquared = this.mouseForceRadius ** 2
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
