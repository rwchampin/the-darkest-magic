export class Atoms {
  constructor() {
    this.PI = Math.PI
    this.TAU = this.PI * 2
    this.HALF_PI = this.PI * 0.5
    this.RAND = Math.random
    this.ROUND = Math.round
    this.SIN = Math.sin
    this.COS = Math.cos
    this.ABS = Math.abs
    this.POW = Math.pow
    this.lib = {
      v2: Vector2,
      noise,
      stats: Stats,
    }
  }
}
