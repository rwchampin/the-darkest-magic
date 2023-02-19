import { MathUtils } from './MathUtils'
import { Quanternion } from './Quaternion'

export class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  clone() {
    return new this.constructor(this.x, this.y, this.z)
  }

  copy(v) {
    this.x = v.x
    this.y = v.y

    return this
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
