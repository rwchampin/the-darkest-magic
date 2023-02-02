import Vector from '~/core/Vector'

let mousePressed = false

window.addEventListener('mousedown', () => {
  mousePressed = true
})

window.addEventListener('mouseup', () => {
  mousePressed = false
})

export default class MoverParticle {
  constructor(_x, _y, _m, _radius, _color, _ctx, _options = {}) {
    this.pos = Vector.create(_x, _y)
    this.vel = Vector.create(0, 0)
    this.acc = Vector.create(0, 0)
    this.radius = 16
    this.mass = _m
    this.color = _color
    this.acc = Math.random() * 3
    this.mousePressed = typeof _options.mousePressed === undefined ? false : _options.mousePressed
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

