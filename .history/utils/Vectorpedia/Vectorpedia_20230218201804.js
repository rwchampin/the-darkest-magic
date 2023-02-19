/*************************************
 * Vectorpedia.js
 *
 * A complete 2d & 3d vector animation utility class.  This class is designed to be used with the canvas element.
 *
 * @version 1.0.0
 * @author Ryan Champin
 * @license MIT
 *
 */
import { Vector2 } from './Vector2'
import { Vector3 } from './Vector3'

export default class Vectorpedia {
  constructor() {
    this.vec2 = new Vector2()
    this.vec3 = new Vector3()
  }
}
