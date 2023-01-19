class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y)
  }

  subtract(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y)
  }

  multiply(scalar) {
    return new Vector(this.x * scalar, this.y * scalar)
  }

  divide(scalar) {
    return new Vector(this.x / scalar, this.y / scalar)
  }

  normalize() {
    const magnitude = this.getMagnitude()
    return new Vector(this.x / magnitude, this.y / magnitude)
  }

  limit(max) {
    if (this.getMagnitude() > max)
      return this.normalize().multiply(max)

    return this
  }

  distance(vector) {
    const dx = this.x - vector.x
    const dy = this.y - vector.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  getMass() {
    return this.getMagnitude() * this.getMagnitude()
  }

  getGravity(vector) {
    const distance = this.distance(vector)
    const force = (this.getMass() * vector.getMass()) / (distance * distance)
    const direction = vector.subtract(this).normalize()
    return direction.multiply(force)
  }
}

Vector.prototype.add = function (vector1, vector2) {
  return {
    x: vector1.x + vector2.x,
    y: vector1.y + vector2.y,
  }
}

Vector.prototype.subtract = function (vector1, vector2) {
  return {
    x: vector1.x - vector2.x,
    y: vector1.y - vector2.y,
  }
}

Vector.prototype.multiply = function (vector, scalar) {
  return {

    x: vector.x * scalar,
    y: vector.y * scalar,
  }
}

Vector.prototype.divide = function (vector, scalar) {
  return {
    x: vector.x / scalar,
    y: vector.y / scalar,
  }
}

Vector.prototype.normalize = function (vector) {
  const magnitude = this.getMagnitude(vector)
  return {
    x: vector.x / magnitude,
    y: vector.y / magnitude,

  }
}

Vector.random2dVector = function () {
  const angle = Math.random() * Math.PI * 2
  const length = 1
  return {
    x: Math.cos(angle) * length,
    y: Math.sin(angle) * length,
  }
}

Vector.prototype.create = function (x, y) {
  return {
    x,
    y,
  }
}
