// import { Utils } from '~/utils'

export class Particle {
  constructor(x, y, bounds, center) {
      this.lastPosition = Utils.vector.Vector2()
      this.radius = Math.random() * 3;
    this.position = Utils.vector.Vector2(Math.random() * window.innerWidth, window.innerHeight + (2*this.radius))
    this.velocity = Utils.vector.Vector2(Math.random())
    this.life = 0
    this.ttl = 1000
    this.bounds = bounds
    this.center = center
    this.reset = false
  }

//   update() {
//     if (this.life > this.ttl || this.checkBounds()) {
//       this.reset = true
//     }
//     else {
//       this.position.add(this.velocity)
//       this.life++
//     }
//   }

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
