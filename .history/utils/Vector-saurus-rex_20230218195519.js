import { MathUtils } from './MathUtils'
import { Quanternion } from './Quaternion'
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
export class Vector3 extends Vector2 {
  constructor(z = 0) {
    super()
    this.z = z
  }

  constructor(x = 0, y = 0, z = 0) {
    Vector3.prototype.isVector3 = true

    this.x = x
    this.y = y
    this.z = z
  }

  set(x, y, z) {
    if (z === undefined)
      z = this.z // sprite.scale.set(x,y)

    this.x = x
    this.y = y
    this.z = z

    return this
  }

  setScalar(scalar) {
    this.x = scalar
    this.y = scalar
    this.z = scalar

    return this
  }

  setX(x) {
    this.x = x

    return this
  }

  setY(y) {
    this.y = y

    return this
  }

  setZ(z) {
    this.z = z

    return this
  }

  setComponent(index, value) {
    switch (index) {
      case 0: this.x = value; break
      case 1: this.y = value; break
      case 2: this.z = value; break
      default: throw new Error(`index is out of range: ${index}`)
    }

    return this
  }

  getComponent(index) {
    switch (index) {
      case 0: return this.x
      case 1: return this.y
      case 2: return this.z
      default: throw new Error(`index is out of range: ${index}`)
    }
  }

  clone() {
    return new this.constructor(this.x, this.y, this.z)
  }

  copy(v) {
    this.x = v.x
    this.y = v.y
    this.z = v.z

    return this
  }

  add(v) {
    this.x += v.x
    this.y += v.y
    this.z += v.z

    return this
  }

  addScalar(s) {
    this.x += s
    this.y += s
    this.z += s

    return this
  }

  addVectors(a, b) {
    this.x = a.x + b.x
    this.y = a.y + b.y
    this.z = a.z + b.z

    return this
  }

  addScaledVector(v, s) {
    this.x += v.x * s
    this.y += v.y * s
    this.z += v.z * s

    return this
  }

  sub(v) {
    this.x -= v.x
    this.y -= v.y
    this.z -= v.z

    return this
  }

  subScalar(s) {
    this.x -= s
    this.y -= s
    this.z -= s

    return this
  }

  subVectors(a, b) {
    this.x = a.x - b.x
    this.y = a.y - b.y
    this.z = a.z - b.z

    return this
  }

  multiply(v) {
    this.x *= v.x
    this.y *= v.y
    this.z *= v.z

    return this
  }

  multiplyScalar(scalar) {
    this.x *= scalar
    this.y *= scalar
    this.z *= scalar

    return this
  }

  multiplyVectors(a, b) {
    this.x = a.x * b.x
    this.y = a.y * b.y
    this.z = a.z * b.z

    return this
  }

  applyEuler(euler) {
    return this.applyQuaternion(_quaternion.setFromEuler(euler))
  }

  applyAxisAngle(axis, angle) {
    return this.applyQuaternion(_quaternion.setFromAxisAngle(axis, angle))
  }

  applyMatrix3(m) {
    const x = this.x; const y = this.y; const z = this.z
    const e = m.elements

    this.x = e[0] * x + e[3] * y + e[6] * z
    this.y = e[1] * x + e[4] * y + e[7] * z
    this.z = e[2] * x + e[5] * y + e[8] * z

    return this
  }

  applyNormalMatrix(m) {
    return this.applyMatrix3(m).normalize()
  }

  applyMatrix4(m) {
    const x = this.x; const y = this.y; const z = this.z
    const e = m.elements

    const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15])

    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w
    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w
    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w

    return this
  }

  applyQuaternion(q) {
    const x = this.x; const y = this.y; const z = this.z
    const qx = q.x; const qy = q.y; const qz = q.z; const qw = q.w

    // calculate quat * vector

    const ix = qw * x + qy * z - qz * y
    const iy = qw * y + qz * x - qx * z
    const iz = qw * z + qx * y - qy * x
    const iw = -qx * x - qy * y - qz * z

    // calculate result * inverse quat

    this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy
    this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz
    this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx

    return this
  }

  project(camera) {
    return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix)
  }

  unproject(camera) {
    return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld)
  }

  transformDirection(m) {
    // input: THREE.Matrix4 affine matrix
    // vector interpreted as a direction

    const x = this.x; const y = this.y; const z = this.z
    const e = m.elements

    this.x = e[0] * x + e[4] * y + e[8] * z
    this.y = e[1] * x + e[5] * y + e[9] * z
    this.z = e[2] * x + e[6] * y + e[10] * z

    return this.normalize()
  }

  divide(v) {
    this.x /= v.x
    this.y /= v.y
    this.z /= v.z

    return this
  }

  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar)
  }

  min(v) {
    this.x = Math.min(this.x, v.x)
    this.y = Math.min(this.y, v.y)
    this.z = Math.min(this.z, v.z)

    return this
  }

  max(v) {
    this.x = Math.max(this.x, v.x)
    this.y = Math.max(this.y, v.y)
    this.z = Math.max(this.z, v.z)

    return this
  }

  clamp(min, max) {
    // assumes min < max, componentwise

    this.x = Math.max(min.x, Math.min(max.x, this.x))
    this.y = Math.max(min.y, Math.min(max.y, this.y))
    this.z = Math.max(min.z, Math.min(max.z, this.z))

    return this
  }

  clampScalar(minVal, maxVal) {
    this.x = Math.max(minVal, Math.min(maxVal, this.x))
    this.y = Math.max(minVal, Math.min(maxVal, this.y))
    this.z = Math.max(minVal, Math.min(maxVal, this.z))

    return this
  }

  clampLength(min, max) {
    const length = this.length()

    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)))
  }

  floor() {
    this.x = Math.floor(this.x)
    this.y = Math.floor(this.y)
    this.z = Math.floor(this.z)

    return this
  }

  ceil() {
    this.x = Math.ceil(this.x)
    this.y = Math.ceil(this.y)
    this.z = Math.ceil(this.z)

    return this
  }

  round() {
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    this.z = Math.round(this.z)

    return this
  }

  roundToZero() {
    this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x)
    this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y)
    this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z)

    return this
  }

  negate() {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z

    return this
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }

  // TODO lengthSquared?

  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
  }

  normalize() {
    return this.divideScalar(this.length() || 1)
  }

  setLength(length) {
    return this.normalize().multiplyScalar(length)
  }

  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha
    this.y += (v.y - this.y) * alpha
    this.z += (v.z - this.z) * alpha

    return this
  }

  lerpVectors(v1, v2, alpha) {
    this.x = v1.x + (v2.x - v1.x) * alpha
    this.y = v1.y + (v2.y - v1.y) * alpha
    this.z = v1.z + (v2.z - v1.z) * alpha

    return this
  }

  cross(v) {
    return this.crossVectors(this, v)
  }

  crossVectors(a, b) {
    const ax = a.x; const ay = a.y; const az = a.z
    const bx = b.x; const by = b.y; const bz = b.z

    this.x = ay * bz - az * by
    this.y = az * bx - ax * bz
    this.z = ax * by - ay * bx

    return this
  }

  projectOnVector(v) {
    const denominator = v.lengthSq()

    if (denominator === 0)
      return this.set(0, 0, 0)

    const scalar = v.dot(this) / denominator

    return this.copy(v).multiplyScalar(scalar)
  }

  projectOnPlane(planeNormal) {
    _vector.copy(this).projectOnVector(planeNormal)

    return this.sub(_vector)
  }

  reflect(normal) {
    // reflect incident vector off plane orthogonal to normal
    // normal is assumed to have unit length

    return this.sub(_vector.copy(normal).multiplyScalar(2 * this.dot(normal)))
  }

  angleTo(v) {
    const denominator = Math.sqrt(this.lengthSq() * v.lengthSq())

    if (denominator === 0)
      return Math.PI / 2

    const theta = this.dot(v) / denominator

    // clamp, to handle numerical problems

    return Math.acos(MathUtils.clamp(theta, -1, 1))
  }

  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v))
  }

  distanceToSquared(v) {
    const dx = this.x - v.x; const dy = this.y - v.y; const dz = this.z - v.z

    return dx * dx + dy * dy + dz * dz
  }

  manhattanDistanceTo(v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z)
  }

  setFromSpherical(s) {
    return this.setFromSphericalCoords(s.radius, s.phi, s.theta)
  }

  setFromSphericalCoords(radius, phi, theta) {
    const sinPhiRadius = Math.sin(phi) * radius

    this.x = sinPhiRadius * Math.sin(theta)
    this.y = Math.cos(phi) * radius
    this.z = sinPhiRadius * Math.cos(theta)

    return this
  }

  setFromCylindrical(c) {
    return this.setFromCylindricalCoords(c.radius, c.theta, c.y)
  }

  setFromCylindricalCoords(radius, theta, y) {
    this.x = radius * Math.sin(theta)
    this.y = y
    this.z = radius * Math.cos(theta)

    return this
  }

  setFromMatrixPosition(m) {
    const e = m.elements

    this.x = e[12]
    this.y = e[13]
    this.z = e[14]

    return this
  }

  setFromMatrixScale(m) {
    const sx = this.setFromMatrixColumn(m, 0).length()
    const sy = this.setFromMatrixColumn(m, 1).length()
    const sz = this.setFromMatrixColumn(m, 2).length()

    this.x = sx
    this.y = sy
    this.z = sz

    return this
  }

  setFromMatrixColumn(m, index) {
    return this.fromArray(m.elements, index * 4)
  }

  setFromMatrix3Column(m, index) {
    return this.fromArray(m.elements, index * 3)
  }

  setFromEuler(e) {
    this.x = e._x
    this.y = e._y
    this.z = e._z

    return this
  }

  equals(v) {
    return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z))
  }

  fromArray(array, offset = 0) {
    this.x = array[offset]
    this.y = array[offset + 1]
    this.z = array[offset + 2]

    return this
  }

  toArray(array = [], offset = 0) {
    array[offset] = this.x
    array[offset + 1] = this.y
    array[offset + 2] = this.z

    return array
  }

  fromBufferAttribute(attribute, index) {
    this.x = attribute.getX(index)
    this.y = attribute.getY(index)
    this.z = attribute.getZ(index)

    return this
  }

  random() {
    this.x = Math.random()
    this.y = Math.random()
    this.z = Math.random()

    return this
  }

  randomDirection() {
    // Derived from https://mathworld.wolfram.com/SpherePointPicking.html

    const u = (Math.random() - 0.5) * 2
    const t = Math.random() * Math.PI * 2
    const f = Math.sqrt(1 - u ** 2)

    this.x = f * Math.cos(t)
    this.y = f * Math.sin(t)
    this.z = u

    return this
  }

  // Static Methods
  // Vector3.randomDirection() returns a Vector3 with a length of 1 and a statistically uniform direction. Vector3.lerp() performs linear interpolation between two Vector3s.
  random3d() {
    const length = Math.random()
    const angle = Math.random() * Math.PI * 2
    const z = Math.random() * 2 - 1
    const a = Math.sqrt(1 - z * z)
    return Vector3(a * Math.cos(angle), a * Math.sin(angle), z).multiply(length)
  }

  negative(a, b) {
    b.x = -a.x; b.y = -a.y; b.z = -a.z
    return b
  }

  static add(v1, v2) {
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
      console.error({
        statusCode: 500,
        statusMessage: 'Vector3 add: invalid arguments',
      })
    }
  }

  static addX(v, x) {
    return Vector3(v.x + x, v.y, v.z)
  }

  static addY(v, y) {
    return Vector3(v.x, v.y + y, v.z)
  }

  static addZ(v, z) {
    return Vector3(v.x, v.y, v.z + z)
  }

  static addScalar(v, s) {
    return Vector3(v.x + s, v.y + s, v.z + s)
  }

  static addScalarX(v, s) {
    return Vector3(v.x + s, v.y, v.z)
  }

  static addScalarY(v, s) {
    return Vector3(v.x, v.y + s, v.z)
  }

  static addScalarZ(v, s) {
    return Vector3(v.x, v.y, v.z + s)
  }

  static subtract(a, b, c) {
    if (b instanceof Vector3) { c.x = a.x - b.x; c.y = a.y - b.y; c.z = a.z - b.z }
    else { c.x = a.x - b; c.y = a.y - b; c.z = a.z - b }
    return c
  }

  static multiply(a, b, c) {
    if (b instanceof Vector3) { c.x = a.x * b.x; c.y = a.y * b.y; c.z = a.z * b.z }
    else { c.x = a.x * b; c.y = a.y * b; c.z = a.z * b }
    return c
  }

  static divide(a, b, c) {
    if (b instanceof Vector3) { c.x = a.x / b.x; c.y = a.y / b.y; c.z = a.z / b.z }
    else { c.x = a.x / b; c.y = a.y / b; c.z = a.z / b }
    return c
  }

  static cross(a, b, c) {
    c.x = a.y * b.z - a.z * b.y
    c.y = a.z * b.x - a.x * b.z
    c.z = a.x * b.y - a.y * b.x
    return c
  }

  static unit(a, b) {
    const length = a.length()
    b.x = a.x / length
    b.y = a.y / length
    b.z = a.z / length
    return b
  }

  static fromAngles(theta, phi) {
    return Vector3(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi))
  }

  static randomDirection() {
    return Vector3.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1))
  }

  static min(a, b) {
    return Vector3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z))
  }

  static max(a, b) {
    return Vector3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z))
  }

  static lerp(a, b, fraction) {
    return b.subtract(a).multiply(fraction).add(a)
  }

  static fromArray(a) {
    return Vector3(a[0], a[1], a[2])
  }

  static angleBetween(a, b) {
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

