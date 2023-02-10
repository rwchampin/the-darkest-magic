// import { Utils } from '~/utils'


export default class Particle {
  constructor(ctx ) {
      this.lastPosition = new Utils.vector.Vector2()
      this.radius = Math.random() * 3;
    this.position = new Utils.vector.Vector2(Math.random() * window.innerWidth, window.innerHeight + (2*this.radius))
    this.velocity = new Utils.vector.Vector2(Math.random(), Math.random())
      this.life = 1
        this.color = `#${new THREE.Color().setHSL(0.5 + Math.round(Math.random() * 255) / 3 * 0.25, 0.6, 0.7).getHexString()}`
    
    this.reset = false
  }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 0, false)
        ctx.closePath();
        ctx.fill(this.color)
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
