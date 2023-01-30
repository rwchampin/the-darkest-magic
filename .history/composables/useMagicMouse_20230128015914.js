import * as THREE from 'three'
import { Vector2 } from '~/utils/Vector'

export class MagicMouse {
  constructor(x,y,r) {
    this.x = x
    this.y = y
    this.r = r
    this.vel = Vector2.rand
  }
}