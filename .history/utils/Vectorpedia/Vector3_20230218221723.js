import { Vector2 } from './Vector2'
import { MathUtils } from './MathUtils'
import { Quaternion } from './Quaternion'

const _quaternion = /* @__PURE__ */ new Quaternion()

class Vector3 extends Vector2 {
  constructor(x = 0, y = 0, z = 0) {
    super(x, y)
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

  drawVertex(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
    ctx.fill()
  }

  drawCurve(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.z, this.w)
    ctx.stroke()
  }

  drawArrow(ctx, length = 10, width = 5) {
    const x = this.x
    const y = this.y
    const z = this.z
    const w = this.w

    const dx = z - x
    const dy = w - y
    const angle = Math.atan2(dy, dx)
    const len = Math.sqrt(dx * dx + dy * dy)

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(z, w)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(z, w)
    ctx.lineTo(z - Math.cos(angle - Math.PI / 6) * len / 10 * width, w - Math.sin(angle - Math.PI / 6) * len / 10 * width)
    ctx.lineTo(z - Math.cos(angle + Math.PI / 6) * len / 10 * width, w - Math.sin(angle + Math.PI / 6) * len / 10 * width)
    ctx.lineTo(z, w)
    ctx.lineTo(z - Math.cos(angle - Math.PI / 6) * len / 10 * width, w - Math.sin(angle - Math.PI / 6) * len / 10 * width)
    ctx.stroke()
  }

  drawArrow3d(ctx, length = 10, width = 5) {
    const x = this.x
    const y = this.y
    const z = this.z

    const dx = z - x
    const dy = z - y
    const angle = Math.atan2(dy, dx)
    const len = Math.sqrt(dx * dx + dy * dy)

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(z, w)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(z, w)
    ctx.lineTo(z - Math.cos(angle - Math.PI / 6) * len / 10 * width, w - Math.sin(angle - Math.PI / 6) * len / 10 * width)
    ctx.lineTo(z - Math.cos(angle + Math.PI / 6) * len / 10 * width, w - Math.sin(angle + Math.PI / 6) * len / 10 * width)
    ctx.lineTo(z, w)
    ctx.lineTo(z - Math.cos(angle - Math.PI / 6) * len / 10 * width, w - Math.sin(angle - Math.PI / 6) * len / 10 * width)
    ctx.stroke()
  }

  drawLine(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.z, this.w)
    ctx.stroke()
  }

  drawLine3d(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.z, this.w)
    ctx.stroke()
  }

  drawCircle(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.z, 0, Math.PI * 2)
    ctx.stroke()
  }

  drawEllipse(ctx) {
    ctx.beginPath()
    ctx.ellipse(this.x, this.y, this.z, this.w, 0, 0, Math.PI * 2)
    ctx.stroke()
  }

  drawRect(ctx) {
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.z, this.w)
    ctx.stroke()
  }

  drawRect3d(ctx) {
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.z, this.w)
    ctx.stroke()
  }

  scaleVectorBasedOnMouseDistance(mouse, scale) {
    const distance = this.distance(mouse)
    const scaleAmount = distance * scale
    this.subtract(mouse).normalize().multiply(scaleAmount).add(mouse)
  }

  skewCircleBasedOnMouseDistance(mouse, scale) {
    const distance = this.distance(mouse)
    const scaleAmount = distance * scale
    this.subtract(mouse).normalize().multiply(scaleAmount).add(mouse)
  }

  skewEllipseBasedOnMouseDistance(mouse, scale) {
    const distance = this.distance(mouse)
    const scaleAmount = distance * scale
    this.subtract(mouse).normalize().multiply(scaleAmount).add(mouse)
  }

  buildBezierCurve(ctx, points, tension, isClosed, numOfSegments) {
    ctx.beginPath()

    const _points = (points == null) ? this.points : points
    const _tension = (tension == null) ? this.tension : tension
    const _isClosed = isClosed || this.isClosed
    const _numOfSegments = numOfSegments || this.numOfSegments

    const _calculate = (p0, p1, p2, p3, t) => {
      const v0 = (p2 - p0) * tension
      const v1 = (p3 - p1) * tension
      const t2 = t * t
      const t3 = t * t2
      return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1
    }

    ctx.moveTo(_points[0].x, _points[0].y)

    for (let i = 0, len = _points.length; i < len - 1; i++) {
      const p1 = _points[i]
      const p2 = _points[i + 1]
      const p0 = (i === 0) ? p1 : _points[i - 1]
      const p3 = (i === len - 2) ? p2 : _points[i + 2]
      const mX = (p2.x - p0.x) / 2
      const mY = (p2.y - p0.y) / 2

      for (let j = 1; j <= _numOfSegments; j++) {
        const t = j / _numOfSegments
        ctx.lineTo(_calculate(p0.x, p1.x, p2.x, p3.x, t), _calculate(p0.y, p1.y, p2.y, p3.y, t))
      }
    }

    if (_isClosed) {
      const p0 = _points[_points.length - 1]
      const p1 = _points[0]
      const p2 = _points[1]
      const p3 = _points[2]
      const mX = (p2.x - p0.x) / 2
      const mY = (p2.y - p0.y) / 2

      for (let j = 1; j <= _numOfSegments; j++) {
        const t = j / _numOfSegments
        ctx.lineTo(_calculate(p0.x, p1.x, p2.x, p3.x, t), _calculate(p0.y, p1.y, p2.y, p3.y, t))
      }
    }

    ctx.stroke()
  }

  buildBezierCurve3d(ctx, points, tension, isClosed, numOfSegments) {
    ctx.beginPath()

    const _points = (points == null) ? this.points : points
    const _tension = (tension == null) ? this.tension : tension
    const _isClosed = isClosed || this.isClosed
    const _numOfSegments = numOfSegments || this.numOfSegments

    const _calculate = (p0, p1, p2, p3, t) => {
      const v0 = (p2 - p0) * tension
      const v1 = (p3 - p1) * tension
      const t2 = t * t
      const t3 = t * t2
      return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1
    }

    ctx.moveTo(_points[0].x, _points[0].y)

    for (let i = 0, len = _points.length; i < len - 1; i++) {
      const p1 = _points[i]
      const p2 = _points[i + 1]
      const p0 = (i === 0) ? p1 : _points[i - 1]
      const p3 = (i === len - 2) ? p2 : _points[i + 2]
      const mX = (p2.x - p0.x) / 2
      const mY = (p2.y - p0.y) / 2

      for (let j = 1; j <= _numOfSegments; j++) {
        const t = j / _numOfSegments
        ctx.lineTo(_calculate(p0.x, p1.x, p2.x, p3.x, t), _calculate(p0.y, p1.y, p2.y, p3.y, t))
      }
    }

    if (_isClosed) {
      const p0 = _points[_points.length - 1]
      const p1 = _points[0]
      const p2 = _points[1]
      const p3 = _points[2]
      const mX = (p2.x - p0.x) / 2
      const mY = (p2.y - p0.y) / 2

      for (let j = 1; j <= _numOfSegments; j++) {
        const t = j / _numOfSegments
        ctx.lineTo(_calculate(p0.x, p1.x, p2.x, p3.x, t), _calculate(p0.y, p1.y, p2.y, p3.y, t))
      }
    }

    ctx.stroke()
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
        statusMessage: `Vector3 add: invalid arguments: ${v1}, ${v2}`,
        cause: `Vector3.add(v1, v2) requires v1 and v2 to be Vector3 or number.\n${typeof v1} and ${typeof v2} given.`,
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

const _vector = /* @__PURE__ */ new Vector3()

Vector3.projectOnPlane = function (planeNormal) {
  _vector.copy(this).projectOnVector(planeNormal)

  return this.sub(_vector)
}

Vector3.reflect = function (normal) {
  // reflect incident vector off plane orthogonal to normal
  // normal is assumed to have unit length

  return this.sub(_vector.copy(normal).multiplyScalar(2 * this.dot(normal)))
}

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

