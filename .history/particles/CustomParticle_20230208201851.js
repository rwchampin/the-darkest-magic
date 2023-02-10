import { Vector2 } from '~/utils/Vector-saurus-rex.js'
import * as THREE from 'three'
import chroma from 'chroma-js'

export default class Particle {
    constructor(ctx) {
        this.ctx = ctx;
      this.lastPosition = new Vector2()
      this.radius = Math.random() * 30;
    // this.position = new Vector2(Math.random() * window.innerWidth, window.innerHeight + (2*this.radius))
    this.position = new Vector2(300,300)
    this.velocity = new Vector2(Math.random(), Math.random())
      this.life = 1
        this.color = chroma(`#${new THREE.Color().setHSL(0.5 + Math.round(Math.random() * 255) / 3 * 0.25, 0.6, 0.7).getHexString()}`).hex()
    this.reset = false
  }

    draw() {
        
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
