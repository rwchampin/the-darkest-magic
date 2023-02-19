/*************************************
 * Vector-Saurus-Rex.js
 *
 * A complete 2d & 3d vector animation utility class.  This class is designed to be used with the canvas element.
 *
 * @version 1.0.0
 * @author Ryan Champin
 * @license MIT
 *
 */
export class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  static random2D = function () {
    const length = Math.random()
    const angle = Math.random() * Math.PI * 2
    return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length)
  }

  static negative = function (a, b) {
    b.x = -a.x
    b.y = -a.y
    return b
  }

  static add = function (v1, v2) {
    if (v1 instanceof Vector2 && v2 instanceof Vector2) {
      return new Vector2(v1.x + v2.x, v1.y + v2.y)
    }
    else if (v1 instanceof Vector2 && typeof v2 === 'number') {
      return new Vector2(v1.x + v2, v1.y + v2)
    }
    else if (typeof v1 === 'number' && v2 instanceof Vector2) {
      return new Vector2(v1 + v2.x, v1 + v2.y)
    }
    else {
      console.error({
        statusCode: 500,
        statusMessage: 'Vector2.add() requires two Vector2s or a Vector2 and a number',
      })
    }
  }

  static addX = function (v, s) {
    return new Vector2(v.x + s, v.y)
  }

  static addY = function (v, s) {
    return new Vector2(v.x, v.y + s)
  }

  static addScalar = function (v, s) {
    return new Vector2(v.x + s, v.y + s)
  }

  static addScalarX = function (v, s) {
    return new Vector2(v.x + s, v.y)
  }

  static addScalarY = function (v, s) {
    return new Vector2(v.x, v.y + s)
  }

  static subtract = function (a, b, c) {
    if (b instanceof Vector2) {
      c.x = a.x - b.x
      c.y = a.y - b.y
    }
    else {
      c.x = a.x - b
      c.y = a.y - b
    }
    return c
  }

  static subtractX = function (v, n) {
    return new Vector2(v.x - n, v.y)
  }

  static subtractY = function (v, n) {
    return new Vector2(v.x, v.y - n)
  }

  static subtractScalar = function (v, s) {
    return new Vector2(v.x - s, v.y - s)
  }

  static subtractScalarX = function (v, s) {
    return new Vector2(v.x - s, v.y)
  }

  static subtractScalarY = function (v, s) {
    return new Vector2(v.x, v.y - s)
  }

  static multiply = function (a, b, c) {
    if (b instanceof Vector2) {
      c.x = a.x * b.x
      c.y = a.y * b.y
    }
    else {
      c.x = a.x * b
      c.y = a.y * b
    }
    return c
  }

  static multiplyX = function (v, s) {
    return new Vector2(v.x * s, v.y)
  }

  static multiplyY = function (v, s) {
    return new Vector2(v.x, v.y * s)
  }

  static multiplyScalar = function (v, s) {
    return new Vector2(v.x * s, v.y * s)
  }

  static multiplyScalarX = function (v, s) {
    return new Vector2(v.x * s, v.y)
  }

  static multiplyScalarY = function (v, s) {
    return new Vector2(v.x, v.y * s)
  }

  static divide = function (a, b, c) {
    if (b instanceof Vector2) {
      c.x = a.x / b.x
      c.y = a.y / b.y
    }
    else {
      c.x = a.x / b
      c.y = a.y / b
    }
    return c
  }

  static divideX = function (v, s) {
    return new Vector2(v.x / s, v.y)
  }

  static divideY = function (v, s) {
    return new Vector2(v.x, v.y / s)
  }

  static divideScalar = function (v, s) {
    return new Vector2(v.x / s, v.y / s)
  }

  static divideScalarX = function (v, s) {
    return new Vector2(v.x / s, v.y)
  }

  static divideScalarY = function (v, s) {
    return new Vector2(v.x, v.y / s)
  }

  static cross = function (a, b) {
    return a.x * b.y - a.y * b.x
  }

  static unit = function (a, b) {
    const length = a.length()
    b.x = a.x / length
    b.y = a.y / length
    return b
  }

  static fromAngle = function (angle) {
    return new Vector2(Math.cos(angle), Math.sin(angle))
  }

  static randomDirection = function () {
    return new Vector2().fromAngle(Math.random() * Math.PI * 2)
  }

  static min = function (a, b) {
    return new Vector2(Math.min(a.x, b.x), Math.min(a.y, b.y))
  }

  static max = function (a, b) {
    return new Vector2(Math.max(a.x, b.x), Math.max(a.y, b.y))
  }

  static lerp = function (a, b, fraction) {
    return b.subtract(a).multiply(fraction).add(a)
  }

  static fromArray = function (a) {
    return new Vector2(a[0], a[1])
  }

  static angleBetween = function (a, b) {
    return a.angleTo(b)
  }
}
export class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  // Static Methods
  // Vector3.randomDirection() returns a Vector3 with a length of 1 and a statistically uniform direction. Vector3.lerp() performs linear interpolation between two Vector3s.
  random3d = function () {
    const length = Math.random()
    const angle = Math.random() * Math.PI * 2
    const z = Math.random() * 2 - 1
    const a = Math.sqrt(1 - z * z)
    return Vector3(a * Math.cos(angle), a * Math.sin(angle), z).multiply(length)
  }

  negative = function (a, b) {
    b.x = -a.x; b.y = -a.y; b.z = -a.z
    return b
  }

  add = function (v1, v2) {
    if (v1 instanceof Vector3 && v2 instanceof Vector3) {
      return Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z)
    }
    else if (v1 instanceof Vector3 && typeof v2 === 'number') {
      return Vector3(v1.x + v2, v1.y + v2, v1.z + v2)
    }
    else if (typeof v1 === 'number' && v2 instanceof Vector3) {
      return Vector3(v1 + v2.x, v1 + v2.y, v1 + v2.z)
    }
    else {
      throw createError({
        statusCode: 500,
        statusMessage: 'add: invalid arguments',
      })
    }
  }

  static addX = function (v, x) {
    return Vector3(v.x + x, v.y, v.z)
  }

  static addY = function (v, y) {
    return Vector3(v.x, v.y + y, v.z)
  }

  static addZ = function (v, z) {
    return Vector3(v.x, v.y, v.z + z)
  }

  static addScalar = function (v, s) {
    return Vector3(v.x + s, v.y + s, v.z + s)
  }

  static addScalarX = function (v, s) {
    return Vector3(v.x + s, v.y, v.z)
  }

  static addScalarY = function (v, s) {
    return Vector3(v.x, v.y + s, v.z)
  }

  static addScalarZ = function (v, s) {
    return Vector3(v.x, v.y, v.z + s)
  }

  static subtract = function (a, b, c) {
    if (b instanceof Vector3) { c.x = a.x - b.x; c.y = a.y - b.y; c.z = a.z - b.z }
    else { c.x = a.x - b; c.y = a.y - b; c.z = a.z - b }
    return c
  }

  static multiply = function (a, b, c) {
    if (b instanceof Vector3) { c.x = a.x * b.x; c.y = a.y * b.y; c.z = a.z * b.z }
    else { c.x = a.x * b; c.y = a.y * b; c.z = a.z * b }
    return c
  }

  static divide = function (a, b, c) {
    if (b instanceof Vector3) { c.x = a.x / b.x; c.y = a.y / b.y; c.z = a.z / b.z }
    else { c.x = a.x / b; c.y = a.y / b; c.z = a.z / b }
    return c
  }

  static cross = function (a, b, c) {
    c.x = a.y * b.z - a.z * b.y
    c.y = a.z * b.x - a.x * b.z
    c.z = a.x * b.y - a.y * b.x
    return c
  }

  static unit = function (a, b) {
    const length = a.length()
    b.x = a.x / length
    b.y = a.y / length
    b.z = a.z / length
    return b
  }

  static fromAngles = function (theta, phi) {
    return Vector3(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi))
  }

  static randomDirection = function () {
    return Vector3.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1))
  }

  static min = function (a, b) {
    return Vector3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z))
  }

  static max = function (a, b) {
    return Vector3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z))
  }

  static lerp = function (a, b, fraction) {
    return b.subtract(a).multiply(fraction).add(a)
  }

  static fromArray = function (a) {
    return Vector3(a[0], a[1], a[2])
  }

  static angleBetween = function (a, b) {
    return a.angleTo(b)
  }
}

// Instance Methods
// The methods add(), subtract(), multiply(), and divide() can all take either a Vector3 or a number as an argument.

Vector2.prototype.getMagnitude = function () {
  /*******************
   * @method getMagnitude
   * @return {Number}
   * @description Returns the magnitude of the vector.
   * @example
   * const a = new Vector2(10, 10)
   * console.log(a.getMagnitude()) // 14.142135623730951
   * const b = new Vector2(20, 20)
   * /*********************************
   ,
   *********************************/
  return Math.sqrt(this.x * this.x + this.y * this.y)
}

Vector2.prototype.setMagnitude = function (t) {
  const e = this.getMagnitude()
  return e && t / e
}
Vector2.prototype.fromPoints = function (t, e) {
  /*******************
   * @method fromPoints
   * @param {Vector2} t
   * @param {Vector2} e
   * @return {Vector2}
   *
   * @description Returns a new Vector2 that is the difference between two points.
   *
   * @example
   * const a = new Vector2(10, 10)
   * const b = new Vector2(20, 20)
   *
   * const c = Vector2.fromPoints(a, b)
   */
  return new Vector2(e.x - t.x, e.y - t.y)
}
Vector2.prototype.fromAngle = function (t) {
  /*******************
   * @method fromAngle
   * @param {Number} t
   * @return {Vector2}
   * @description Returns a new Vector2 from an angle.
   * @example
   * const a = Vector2.fromAngle(Math.PI / 2)
   * console.log(a) // Vector2 { x: 0, y: 1 }
   *
   * const b = Vector2.fromAngle(Math.PI)
   * console.log(b) // Vector2 { x: -1, y: 0 }
   *
   * const c = Vector2.fromAngle(Math.PI * 1.5)
   * console.log(c) // Vector2 { x: 0, y: -1 }
   *
   */
  return new Vector2(Math.cos(t), Math.sin(t))
}
Vector2.prototype.fromObject = function (t) {
  /*****************
   * @method fromObject
   * @param {Object} t
   * @return {Vector2}
   * @description Returns a new Vector2 from an object.
   * @example
   * const a = Vector2.fromObject({ x: 10, y: 10 })
   * console.log(a) // Vector2 { x: 10, y: 10 }
   * */

  return new Vector2(t.x, t.y)
}
Vector2.prototype.fromArray = function (t) {
  /*****************
   * @method fromArray
   * @param {Array} t
   * @return {Vector2}
   * @description Returns a new Vector2 from an array.
   * @example
   * const a = Vector2.fromArray([10, 10])
   * console.log(a) // Vector2 { x: 10, y: 10 }
   * */

  return new Vector2(t[0], t[1])
}
Vector2.prototype.slope = function (t) {
  /*****************
   * @method slope
   * @param {Vector2} t
   * @return {Number}
   * @description Returns the slope of the line between two points.
   * @example
   * const a = new Vector2(0, 0)
   * const b = new Vector2(10, 10)
   */
  return (t.y - this.y) / (t.x - this.x) * -1
}
Vector2.prototype.intercept = function (t) {
  return -t * this.x + this.y
}
Vector2.prototype.midpoint = function (t) {
  const e = new Vector2(this.x + t.x, this.y + t.y)
  return e.divideScalar(2)
}
Vector2.prototype.randomize = function (min, max) {
  this.x = Math.random() * (max - min) + min
  this.y = Math.random() * (max - min) + min
  return this
}
Vector2.prototype.randomizeX = function (min, max) {
  this.x = Math.random() * (max - min) + min
  return this
}
Vector2.prototype.randomizeY = function (min, max) {
  this.y = Math.random() * (max - min) + min
  return this
}
Vector2.prototype.addRandom = function (min, max) {
  this.x += Math.random() * (max - min) + min
  this.y += Math.random() * (max - min) + min
  return this
}
Vector2.prototype.addRandomX = function (min, max) {
  this.x += Math.random() * (max - min) + min
  return this
}
Vector2.prototype.addRandomY = function (min, max) {
  this.y += Math.random() * (max - min) + min
  return this
}
Vector2.prototype.negative = function () {
  return new Vector2(-this.x, -this.y)
}
Vector2.prototype.add = function (v) {
  if (v instanceof Vector2)
    return new Vector2(this.x + v.x, this.y + v.y)
  else
    return new Vector2(this.x + v, this.y + v)
}
Vector2.prototype.addX = function (v) {
  return new Vector2(this.x + v, this.y)
}
Vector2.prototype.addY = function (v) {
  return new Vector2(this.x, this.y + v)
}
Vector2.prototype.addScalar = function (v) {
  return new Vector2(this.x + v, this.y + v)
}
Vector2.prototype.addScalarX = function (v) {
  return new Vector2(this.x + v, this.y)
}
Vector2.prototype.addScalarY = function (v) {
  return new Vector2(this.x, this.y + v)
}
Vector2.prototype.subtract = function (v) {
  if (v instanceof Vector2)
    return new Vector2(this.x - v.x, this.y - v.y)
  else
    return new Vector2(this.x - v, this.y - v)
}
Vector2.prototype.subtractX = function (v) {
  return new Vector2(this.x - v, this.y)
}
Vector2.prototype.subtractY = function (v) {
  return new Vector2(this.x, this.y - v)
}
Vector2.prototype.subtractScalar = function (v) {
  return new Vector2(this.x - v, this.y - v)
}
Vector2.prototype.subtractScalarX = function (v) {
  return new Vector2(this.x - v, this.y)
}
Vector2.prototype.subtractScalarY = function (v) {
  return new Vector2(this.x, this.y - v)
}
Vector2.prototype.multiply = function (v) {
  if (v instanceof Vector2)
    return new Vector2(this.x * v.x, this.y * v.y)
  else
    return new Vector2(this.x * v, this.y * v)
}
Vector2.prototype.multiplyX = function (v) {
  return new Vector2(this.x * v, this.y)
}
Vector2.prototype.multiplyY = function (v) {
  return new Vector2(this.x, this.y * v)
}
Vector2.prototype.multiplyScalar = function (v) {
  return new Vector2(this.x * v, this.y * v)
}
Vector2.prototype.multiplyScalarX = function (v) {
  return new Vector2(this.x * v, this.y)
}
Vector2.prototype.multiplyScalarY = function (v) {
  return new Vector2(this.x, this.y * v)
}
Vector2.prototype.divide = function (v) {
  if (v instanceof Vector2)
    return new Vector2(this.x / v.x, this.y / v.y)
  else
    return new Vector2(this.x / v, this.y / v)
}
Vector2.prototype.divideX = function (v) {
  return new Vector2(this.x / v, this.y)
}
Vector2.prototype.divideY = function (v) {
  return new Vector2(this.x, this.y / v)
}
Vector2.prototype.divideScalar = function (t) {
  // eslint-disable-next-line no-void, no-console
  return t === 0 ? void console.log('! Cannot divide by zero !') : (this.x /= t || 1, this.y /= t || 1, this)
}
Vector2.prototype.divideScalarX = function (v) {
  return new Vector2(this.x / v, this.y)
}
Vector2.prototype.divideScalarY = function (v) {
  return new Vector2(this.x, this.y / v)
}
Vector2.prototype.equals = function (v) {
  return this.x === v.x && this.y === v.y
}
Vector2.prototype.dot = function (v) {
  return this.x * v.x + this.y * v.y
}
Vector2.prototype.cross = function (v) {
  return new Vector2(this.x * v.y - this.y * v.x)
}
Vector2.prototype.length = function () {
  return Math.sqrt(this.dot(this))
}
Vector2.prototype.unit = function () {
  return this.divide(this.length())
}
Vector2.prototype.min = function () {
  return Math.min(Math.min(this.x, this.y))
}
Vector2.prototype.max = function () {
  return Math.max(Math.max(this.x, this.y))
}
Vector2.prototype.toAngles = function () {
  return -Math.atan2(-this.y, this.x)
}
Vector2.prototype.angleTo = function (t, i) {
  // eslint-disable-next-line no-cond-assign, no-sequences, no-void
  return t = t || this, (i = i || 'rad') === 'rad' ? Math.atan2(t.y - this.y, t.x - this.x) : i === 'deg' ? 180 * Math.atan2(t.y - this.y, t.x - this.x) / Math.PI : void 0
}
Vector2.prototype.angleToAlternative = function (a) {
  return Math.acos(this.dot(a) / (this.length() * a.length()))
}
Vector2.prototype.toArray = function (n) {
  return [this.x, this.y].slice(0, n || 2)
}
Vector2.prototype.clone = function () {
  return new Vector2(this.x, this.y)
}
Vector2.prototype.copy = function () {
  return new Vector2(this.x, this.y)
}

// static method

Vector3.prototype.negative = function () {
  return new Vector3(-this.x, -this.y, -this.z)
}
Vector3.prototype.add = function (v) {
  if (v instanceof Vector3)
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
  else return new Vector3(this.x + v, this.y + v, this.z + v)
}
Vector3.prototype.addScalar = function (s) {
  return new Vector3(this.x + s, this.y + s, this.z + s)
}
Vector3.prototype.subtract = function (v) {
  if (v instanceof Vector3)
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z)
  else return new Vector3(this.x - v, this.y - v, this.z - v)
}
Vector3.prototype.multiply = function (v) {
  if (v instanceof Vector3)
    return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z)
  else return new Vector3(this.x * v, this.y * v, this.z * v)
}
Vector3.prototype.divide = function (v) {
  if (v instanceof Vector3)
    return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z)
  else return new Vector3(this.x / v, this.y / v, this.z / v)
}
Vector3.prototype.equals = function (v) {
  return this.x === v.x && this.y === v.y && this.z === v.z
}
Vector3.prototype.dot = function (v) {
  return this.x * v.x + this.y * v.y + this.z * v.z
}
Vector3.prototype.cross = function (v) {
  return new Vector3(
    this.y * v.z - this.z * v.y,
    this.z * v.x - this.x * v.z,
    this.x * v.y - this.y * v.x,
  )
}
Vector3.prototype.length = function () {
  return Math.sqrt(this.dot(this))
}
Vector3.prototype.unit = function () {
  return this.divide(this.length())
}
Vector3.prototype.min = function () {
  return Math.min(Math.min(this.x, this.y), this.z)
}
Vector3.prototype.max = function () {
  return Math.max(Math.max(this.x, this.y), this.z)
}
Vector3.prototype.toAngles = function () {
  return {
    theta: Math.atan2(this.z, this.x),
    phi: Math.asin(this.y / this.length()),
  }
}
Vector3.prototype.angleTo = function (a) {
  return Math.acos(this.dot(a) / (this.length() * a.length()))
}
Vector3.prototype.toArray = function (n) {
  return [this.x, this.y, this.z].slice(0, n || 3)
}
Vector3.prototype.clone = function () {
  return new Vector3(this.x, this.y, this.z)
}

