class Vector2 {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }
}
class Vector3 extends Vector2 {
  constructor(x, y, z) {
    super(x, y)
    this.z = z || 0
  }
}

// Instance Methods
// The methods add(), subtract(), multiply(), and divide() can all take either a Vector3 or a number as an argument.
Vector2.prototype = {
  slope(s) {
    return new Vector2(this.x, this.y + s)
  },
  randomize(min, max) {
    this.x = Math.random() * (max - min) + min
    this.y = Math.random() * (max - min) + min
    return this
  },
  randomizeX(min, max) {
    this.x = Math.random() * (max - min) + min
    return this
  },
  randomizeY(min, max) {
    this.y = Math.random() * (max - min) + min
    return this
  },
  addRandom(min, max) {
    this.x += Math.random() * (max - min) + min
    this.y += Math.random() * (max - min) + min
    return this
  },
  addRandomX(min, max) {
    this.x += Math.random() * (max - min) + min
    return this
  },
  addRandomY(min, max) {
    this.y += Math.random() * (max - min) + min
    return this
  },
  negative() {
    return new Vector2(-this.x, -this.y)
  },
  add(v) {
    if (v instanceof Vector2)
      return new Vector2(this.x + v.x, this.y + v.y)
    else
      return new Vector2(this.x + v, this.y + v)
  },
  addX(v) {
    return new Vector2(this.x + v, this.y)
  },
  addY(v) {
    return new Vector2(this.x, this.y + v)
  },
  addScalar(v) {
    return new Vector2(this.x + v, this.y + v)
  },
  addScalarX(v) {
    return new Vector2(this.x + v, this.y)
  },
  addScalarY(v) {
    return new Vector2(this.x, this.y + v)
  },
  subtract(v) {
    if (v instanceof Vector2)
      return new Vector2(this.x - v.x, this.y - v.y)
    else
      return new Vector2(this.x - v, this.y - v)
  },
  subtractX(v) {
    return new Vector2(this.x - v, this.y)
  },
  subtractY(v) {
    return new Vector2(this.x, this.y - v)
  },
  subtractScalar(v) {
    return new Vector2(this.x - v, this.y - v)
  },
  subtractScalarX(v) {
    return new Vector2(this.x - v, this.y)
  },
  subtractScalarY(v) {
    return new Vector2(this.x, this.y - v)
  },
  multiply(v) {
    if (v instanceof Vector2)
      return new Vector2(this.x * v.x, this.y * v.y)
    else
      return new Vector2(this.x * v, this.y * v)
  },
  multiplyX(v) {
    return new Vector2(this.x * v, this.y)
  },
  multiplyY(v) {
    return new Vector2(this.x, this.y * v)
  },
  multiplyScalar(v) {
    return new Vector2(this.x * v, this.y * v)
  },
  multiplyScalarX(v) {
    return new Vector2(this.x * v, this.y)
  },
  multiplyScalarY(v) {
    return new Vector2(this.x, this.y * v)
  },

  divide(v) {
    if (v instanceof Vector2)
      return new Vector2(this.x / v.x, this.y / v.y)
    else
      return new Vector2(this.x / v, this.y / v)
  },
  divideX(v) {
    return new Vector2(this.x / v, this.y)
  },
  divideY(v) {
    return new Vector2(this.x, this.y / v)
  },
  divideScalar(v) {
    return new Vector2(this.x / v, this.y / v)
  },
  divideScalarX(v) {
    return new Vector2(this.x / v, this.y)
  },
  divideScalarY(v) {
    return new Vector2(this.x, this.y / v)
  },

  equals(v) {
    return this.x === v.x && this.y === v.y
  },
  dot(v) {
    return this.x * v.x + this.y * v.y
  },
  cross(v) {
    return new Vector2(this.x * v.y - this.y * v.x)
  },
  length() {
    return Math.sqrt(this.dot(this))
  },
  unit() {
    return this.divide(this.length())
  },
  min() {
    return Math.min(Math.min(this.x, this.y))
  },
  max() {
    return Math.max(Math.max(this.x, this.y))
  },
  toAngles() {
    return -Math.atan2(-this.y, this.x)
  },
  angleTo(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()))
  },
  toArray(n) {
    return [this.x, this.y].slice(0, n || 2)
  },
  clone() {
    return new Vector2(this.x, this.y)
  },
  init(x, y) {
    this.x = x
    this.y = y
    return this
  },
}

// static methods
Vector2.random2D = function () {
  const length = Math.random()
  const angle = Math.random() * Math.PI * 2
  return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length)
}
Vector2.negative = function (a, b) {
  b.x = -a.x
  b.y = -a.y
  return b
}
Vector2.add = function (v1, v2) {
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
    throw createError({
      statusCode: 500,
      statusMessage: 'Vector2.add(): invalid arguments',
    })
  }
}
Vector2.addX = function (v, s) {
  return new Vector2(v.x + s, v.y)
}
Vector2.addY = function (v, s) {
  return new Vector2(v.x, v.y + s)
}

Vector2.addScalar = function (v, s) {
  return new Vector2(v.x + s, v.y + s)
}

Vector2.addScalarX = function (v, s) {
  return new Vector2(v.x + s, v.y)
}

Vector2.addScalarY = function (v, s) {
  return new Vector2(v.x, v.y + s)
}

Vector2.subtract = function (a, b, c) {
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
Vector2.subtractX = function (v, n) {
  return new Vector2(v.x - n, v.y)
}

Vector2.subtractY = function (v, n) {
  return new Vector2(v.x, v.y - n)
}

Vector2.subtractScalar = function (v, s) {
  return new Vector2(v.x - s, v.y - s)
}

Vector2.subtractScalarX = function (v, s) {
  return new Vector2(v.x - s, v.y)
}

Vector2.subtractScalarY = function (v, s) {
  return new Vector2(v.x, v.y - s)
}

Vector2.multiply = function (a, b, c) {
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

Vector2.multiplyX = function (v, s) {
  return new Vector2(v.x * s, v.y)
}

Vector2.multiplyY = function (v, s) {
  return new Vector2(v.x, v.y * s)
}

Vector2.multiplyScalar = function (v, s) {
  return new Vector2(v.x * s, v.y * s)
}

Vector2.multiplyScalarX = function (v, s) {
  return new Vector2(v.x * s, v.y)
}

Vector2.multiplyScalarY = function (v, s) {
  return new Vector2(v.x, v.y * s)
}

Vector2.divide = function (a, b, c) {
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

Vector2.divideX = function (v, s) {
  return new Vector2(v.x / s, v.y)
}

Vector2.divideY = function (v, s) {
  return new Vector2(v.x, v.y / s)
}

Vector2.divideScalar = function (v, s) {
  return new Vector2(v.x / s, v.y / s)
}

Vector2.divideScalarX = function (v, s) {
  return new Vector2(v.x / s, v.y)
}

Vector2.divideScalarY = function (v, s) {
  return new Vector2(v.x, v.y / s)
}

Vector2.cross = function (a, b) {
  return a.x * b.y - a.y * b.x
}
Vector2.unit = function (a, b) {
  const length = a.length()
  b.x = a.x / length
  b.y = a.y / length
  return b
}

Vector2.fromAngle = function (angle) {
  return new Vector2(Math.cos(angle), Math.sin(angle))
}
Vector2.randomDirection = function () {
  return Vector2.fromAngle(Math.random() * Math.PI * 2)
}
Vector2.min = function (a, b) {
  return new Vector2(Math.min(a.x, b.x), Math.min(a.y, b.y))
}
Vector2.max = function (a, b) {
  return new Vector2(Math.max(a.x, b.x), Math.max(a.y, b.y))
}
Vector2.lerp = function (a, b, fraction) {
  return b.subtract(a).multiply(fraction).add(a)
}
Vector2.fromArray = function (a) {
  return new Vector2(a[0], a[1])
}
Vector2.angleBetween = function (a, b) {
  return a.angleTo(b)
}

Vector3.prototype = {
  negative() {
    return new Vector3(-this.x, -this.y, -this.z)
  },
  add(v) {
    if (v instanceof Vector3)
      return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
    else return new Vector3(this.x + v, this.y + v, this.z + v)
  },
  addScalar(s) {
    return new Vector3(this.x + s, this.y + s, this.z + s)
  },
  subtract(v) {
    if (v instanceof Vector3)
      return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z)
    else return new Vector3(this.x - v, this.y - v, this.z - v)
  },
  multiply(v) {
    if (v instanceof Vector3)
      return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z)
    else return new Vector3(this.x * v, this.y * v, this.z * v)
  },
  divide(v) {
    if (v instanceof Vector3)
      return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z)
    else return new Vector3(this.x / v, this.y / v, this.z / v)
  },
  equals(v) {
    return this.x === v.x && this.y === v.y && this.z === v.z
  },
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z
  },
  cross(v) {
    return new Vector3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x,
    )
  },
  length() {
    return Math.sqrt(this.dot(this))
  },
  unit() {
    return this.divide(this.length())
  },
  min() {
    return Math.min(Math.min(this.x, this.y), this.z)
  },
  max() {
    return Math.max(Math.max(this.x, this.y), this.z)
  },
  toAngles() {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length()),
    }
  },
  angleTo(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()))
  },
  toArray(n) {
    return [this.x, this.y, this.z].slice(0, n || 3)
  },
  clone() {
    return new Vector3(this.x, this.y, this.z)
  },
  init(x, y, z) {
    this.x = x; this.y = y; this.z = z
    return this
  },
}

// Static Methods
// Vector3.randomDirection() returns a Vector3 with a length of 1 and a statistically uniform direction. Vector3.lerp() performs linear interpolation between two Vector3s.
Vector3.random3d = function () {
  const length = Math.random()
  const angle = Math.random() * Math.PI * 2
  const z = Math.random() * 2 - 1
  const a = Math.sqrt(1 - z * z)
  return new Vector3(a * Math.cos(angle), a * Math.sin(angle), z).multiply(length)
}
Vector3.negative = function (a, b) {
  b.x = -a.x; b.y = -a.y; b.z = -a.z
  return b
}
Vector3.add = function (v1, v2) {
  if (v1 instanceof Vector3 && v2 instanceof Vector3) {
    return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z)
  }
  else if (v1 instanceof Vector3 && typeof v2 === 'number') {
    return new Vector3(v1.x + v2, v1.y + v2, v1.z + v2)
  }
  else if (typeof v1 === 'number' && v2 instanceof Vector3) {
    return new Vector3(v1 + v2.x, v1 + v2.y, v1 + v2.z)
  }
  else {
    throw new createError({
      statusCode: 500,
      statusMessage: 'Vector3.add: invalid arguments',
    })
  }
}
Vector3.addX = function (v, x) {
  return new Vector3(v.x + x, v.y, v.z)
}
Vector3.addY = function (v, y) {
  return new Vector3(v.x, v.y + y, v.z)
}
Vector3.addZ = function (v, z) {
  return new Vector3(v.x, v.y, v.z + z)
}
Vector3.addScalar = function (v, s) {
  return new Vector3(v.x + s, v.y + s, v.z + s)
}
Vector3.addScalarX = function (v, s) {
  return new Vector3(v.x + s, v.y, v.z)
}
Vector3.addScalarY = function (v, s) {
  return new Vector3(v.x, v.y + s, v.z)
}
Vector3.addScalarZ = function (v, s) {
  return new Vector3(v.x, v.y, v.z + s)
}
Vector3.subtract = function (a, b, c) {
  if (b instanceof Vector3) { c.x = a.x - b.x; c.y = a.y - b.y; c.z = a.z - b.z }
  else { c.x = a.x - b; c.y = a.y - b; c.z = a.z - b }
  return c
}
Vector3.multiply = function (a, b, c) {
  if (b instanceof Vector3) { c.x = a.x * b.x; c.y = a.y * b.y; c.z = a.z * b.z }
  else { c.x = a.x * b; c.y = a.y * b; c.z = a.z * b }
  return c
}
Vector3.divide = function (a, b, c) {
  if (b instanceof Vector3) { c.x = a.x / b.x; c.y = a.y / b.y; c.z = a.z / b.z }
  else { c.x = a.x / b; c.y = a.y / b; c.z = a.z / b }
  return c
}
Vector3.cross = function (a, b, c) {
  c.x = a.y * b.z - a.z * b.y
  c.y = a.z * b.x - a.x * b.z
  c.z = a.x * b.y - a.y * b.x
  return c
}
Vector3.unit = function (a, b) {
  const length = a.length()
  b.x = a.x / length
  b.y = a.y / length
  b.z = a.z / length
  return b
}
Vector3.fromAngles = function (theta, phi) {
  return new Vector3(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi))
}
Vector3.randomDirection = function () {
  return Vector3.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1))
}
Vector3.min = function (a, b) {
  return new Vector3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z))
}
Vector3.max = function (a, b) {
  return new Vector3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z))
}
Vector3.lerp = function (a, b, fraction) {
  return b.subtract(a).multiply(fraction).add(a)
}
Vector3.fromArray = function (a) {
  return new Vector3(a[0], a[1], a[2])
}
Vector3.angleBetween = function (a, b) {
  return a.angleTo(b)
}
