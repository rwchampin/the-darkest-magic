// eslint-disable-next-line no-undef

  function Vector(x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  _.extend(Vector.prototype, {
    getMagnitude() {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    multiply(scaleFactor) {
      this.x *= scaleFactor
      this.y *= scaleFactor
    },
    add(vector) {
      this.x += vector.x
      this.y += vector.y
    },
    vectorTo(vector) {
      return new Vector(vector.x - this.x, vector.y - this.y)
    },
    withinBounds(point, size) {
      const radius = ~~(size / 2) + 1
      return this.x >= point.x - radius
             && this.x <= point.x + radius
             && this.y >= point.y - radius
             && this.y <= point.y + radius
    },
    getAngle() {
      let ratio = 0
      let offset = 0
      if (this.x > 0) {
        if (this.y > 0) {
          offset = 0
          ratio = this.y / this.x
        }
        else {
          offset = (3 * Math.PI) / 2
          ratio = this.x / this.y
        }
      }
      else {
        if (this.y > 0) {
          offset = Math.PI / 2
          ratio = this.x / this.y
        }
        else {
          offset = Math.PI
          ratio = this.y / this.x
        }
      }
      const angle = Math.atan(Math.abs(ratio)) + offset
      return angle
    },
    getAngleDegrees() {
      return this.getAngle() * 180 / Math.PI
    },
    jitter(jitterAmount) {
      return new Vector(
        this.x + this.x * jitterAmount * Math.random(),
        this.y + this.y * jitterAmount * Math.random(),
      )
    },
    copy() {
      return new Vector(this.x, this.y)
    },
    toString() {
      return `${this.x.toFixed(3).replace(/\.?0+$/, '')},${this.y.toFixed(3).replace(/\.?0+$/, '')}`
    },
  })

  Vector.fromAngle = function (angle, magnitude) {
    return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle))
  }

  // x,y
  Vector.fromString = function (string) {
    const parts = string.split(',')
    return new Vector(parseFloat(parts[0]), parseFloat(parts[1]))
  }

  return Vector
})
