import { Vector2 } from './Vector2'
import { Vector3 } from './Vector3'

export class Vectormation {
  constructor({ canvas, context, width, height }) {
    this.width = width || window.innerWidth || canvas.width || canvas.clientWidth || canvas.offsetWidth
    this.height = height || window.innerHeight || canvas.height || canvas.clientHeight || canvas.offsetHeight
    this.canvas = canvas
  }
}
