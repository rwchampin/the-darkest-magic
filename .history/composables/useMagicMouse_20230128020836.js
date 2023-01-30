import * as THREE from 'three'
import { Vector2 } from '~/utils/Vector'
import { Utils } from '~/utils'
const f = Utils.color.getColorsHSL('blue')
debugger
export class MagicMouse {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
    this.vel = Vector2.random2D()
    this.acceleration = new Vector2(0, 0)
    this.maxSpeed = 5
    this.maxForce = 0.1
    this.color = Utils.color.getColorsHSL('blue')
  }

  init() {
    this.pointLight = Utils.three.createLight({color: 0xFF0000, intensity: 200,})
}
