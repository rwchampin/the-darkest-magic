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
  negative() {
    return new Vector2(-this.x, -this.y)
  },
  add(v) {
    if (v instanceof Vector2)
      return new Vector2(this.x + v.x, this.y + v.y)
    else
      return new Vector2(this.x + v, this.y + v)
  },
  subtract(v) {
    if (v instanceof Vector2)
      return new Vector2(this.x - v.x, this.y - v.y)
    else
      return new Vector2(this.x - v, this.y - v)
  },
  multiply(v) {
    if (v instanceof Vector2)
      return new Vector2(this.x * v.x, this.y * v.y)
    else
      return new Vector2(this.x * v, this.y * v)
  },
  divide(v) {
    if (v instanceof Vector2)
      return new Vector2(this.x / v.x, this.y / v.y)
    else
      return new Vector2(this.x / v, this.y / v)
  },
  equals(v) {
    return this.x == v.x && this.y == v.y
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
Vector2.randomVec2 = function (scale) {
  const length = Math.random() * scale
  const angle = Math.random() * Math.PI * 2
  return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length)
}
Vector2.negative = function (a, b) {
  b.x = -a.x
  b.y = -a.y
  return b
}
Vector2.add = function (a, b, c) {
  if (b instanceof Vector2) {
    c.x = a.x + b.x
    c.y = a.y + b.y
  }
  else {
    c.x = a.x + b
    c.y = a.y + b
  }
  return c
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
    return this.x == v.x && this.y == v.y && this.z == v.z
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
Vector3.randomVec3 = function () {
  return new Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
}
Vector3.negative = function (a, b) {
  b.x = -a.x; b.y = -a.y; b.z = -a.z
  return b
}
Vector3.add = function (a, b, c) {
  if (b instanceof Vector3) { c.x = a.x + b.x; c.y = a.y + b.y; c.z = a.z + b.z }
  else { c.x = a.x + b; c.y = a.y + b; c.z = a.z + b }
  return c
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
