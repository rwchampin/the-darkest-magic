import { Vector2 } from '~~/utils/Vectorpedia/Vector-saurus-rex.js'
import * as THREE from 'three'
import chroma from 'chroma-js'

export default class Particle {
    constructor(ctx) {
        this.ctx = ctx;
      this.lastPosition = new Vector2()
      this.radius = Utils.math.randomFloat(.5,2);
    this.position = new Vector2(Math.random() * 100, 100* Math.random()/2)
    // this.position = new Vector2(30,30)
    this.velocity = new Vector2(Math.random()*100, Math.random()*100)
      this.life = 1
        this.colors = chroma.cubehelix()
    .start(200)
    .rotations(-0.35)
    .gamma(0.7)
    .lightness([0.2, .7])
  .scale() // convert to chroma.scale
    .correctLightness()
            .colors(5);
    this.color = this.colors[Math.round(Math.random()*this.colors.length)]
    this.reset = false
  }

    draw() {
 
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
       
        this.ctx.fill()
        this.ctx.fillStyle = this.color;
       
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)
  } 

  update() {
 

      this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.life -= 0.01;

      this.draw();
      if (!this.checkBounds()) {
          this.position.subtract(this.velocity.multiplyScalar(2))
        this.draw()
      }
  }

  checkBounds() {
    return (
      this.position.x - this.radius * 2 > this.ctx.canvas.width
			|| this.position.x < -this.radius*2
			|| this.position.y - this.radius*2 * 3 > this.ctx.canvas.y
			|| this.position.y < -this.radius*2
			// || this.position.distanceTo(this.center) < 3
    )
  }
}
