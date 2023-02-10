// import { Utils } from '~/utils'


export class Particle {
  constructor(x, y ) {
      this.lastPosition = new Utils.vector.Vector2()
      this.radius = Math.random() * 3;
    this.position = new Utils.vector.Vector2(Math.random() * window.innerWidth, window.innerHeight + (2*this.radius))
    this.velocity = new Utils.vector.Vector2(Math.random(), Math.random())
    this.life = 1
    this.reset = false
  }

    draw() {
    
  }

  update() {
    if (this.life <= 0) {
        this.kill();
    }
    else {
        this.position.add(this.velocity)
        this.life -= 0.01;
    }
      kill() {
        
    }
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
