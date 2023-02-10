import { Vector2 } from '~/utils/Vector-saurus-rex.js'
import * as THREE from 'three'
import chroma from 'chroma-js'

export default class Particle {
    constructor(ctx) {
        this.ctx = ctx;
      this.lastPosition = new Vector2()
      this.radius = Utils.math.randomFloat(.5,2);
    this.position = new Vector2(Math.random() * window.innerWidth/2, window.innerHeight* Math.random()/2)
    // this.position = new Vector2(30,30)
    this.velocity = new Vector2(Math.random(), Math.random())
      this.life = 1
        this.colors = chroma.cubehelix()
    .start(240)
    .rotations(-0.35)
    .gamma(0.7)
    .lightness([0.3, 0.8])
  .scale() // convert to chroma.scale
    .correctLightness()
            .colors(5);
    this.color = this.colors[Math.round(Math.random()*this.colors.length)]
    this.reset = false
  }

    draw() {
//         this.ctx.beginPath();
// this.ctx.arc(10, 75, 1, 0, 2 * Math.PI);
// this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
       
        this.ctx.fill()
        this.ctx.fillStyle = this.color;
  } 

  update() {
 

        this.position.add(this.velocity)
        this.life -= 0.01;
    

  }

//   checkBounds() {
//     return (
//       this.lastPosition.x - this.size * 3 > this.bounds.x
// 			|| this.lastPosition.x < -this.size
// 			|| this.lastPosition.y - this.size * 3 > this.bounds.y
// 			|| this.lastPosition.y < -this.size
// 			|| this.position.distanceTo(this.center) < 3
//     )
//   }
}
