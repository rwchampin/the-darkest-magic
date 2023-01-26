<script>



    const v = new Vector2d(some_x_val, some_y_val);

        v.set(new_x_val, new_y_val);
        v.add(x_val, y_val) OR v.add(v2);
        v.div(divisor);
        v.mult(scalar);
        v.normalize();
        v.setMag(new_length);
        v.dot(v2) OR v.dot(x_val,y_val);
        v.dist(v2);
        v.limit(max_length);
        v.rotateRads(angle_in_radians);
        v.rotateDegs(angle_in_degrees);
        v.headingRads();
        v.headingDegs();
        v.angleBetweenRads(v2) OR v.angleBetweenRads(some_x,some_y);
        v.angleBetweenDegs(v2) OR v.angleBetweenDegs(some_x,some_y)
        v.lerp(v2, lerp_amount) OR v.lerp(some_x, some_y, lerp_amount);
        v.equals(v2) OR v.equals(some_x,some_y);
        const v2 = v.copy();

*/

  function Vector2d(x, y) { // create a new instance using "new"
    this.x = x // const v = new Vector2d(some_x_val, some_y_val);
    this.y = y

    this.set = function (x, y) { // reset the x,y values of an existing vector.
      this.x = x // v.set(new_x_val, new_y_val);
      this.y = y
    }

    this.magSq = function () { // returns the length of the vector, squared.
      const x = this.x; const y = this.y
      return x * x + y * y
    }

    this.mag = function () { // returns the length of the vector.
      return Math.sqrt(this.magSq())
    }

    this.add = function (x, y) { // add two vectors together, or add x and y values
      if (x instanceof Vector2d) { // to an existing vector.
        this.x += x.x // v.add(x_val, y_val) OR v.add(v2)
        this.y += x.y
        return this
      }
      this.x += x
      this.y += y
      return this
    }

    this.sub = function (x, y) { // same as above, with subtraction
      if (x instanceof Vector2d) {
        this.x -= x.x
        this.y -= x.y
        return this
      }
      this.x -= x
      this.y -= y
      return this
    }

    this.div = function (n) { // divide vector length (ie magnitude) by a constant
      this.x /= n // v.div(divisor)
      this.y /= n
      return this
    }

    this.mult = function (n) { // multiply vector length (ie magnitude) by a constant
      this.x *= n // v.mult(scalar)
      this.y *= n
      return this
    }

    this.normalize = function () { // set magnitude equal to 1
      return this.div(this.mag()) // v.normalize()
    }

    this.setMag = function (n) { // set magnitude to a given value
      return this.normalize().mult(n) // v.setMag(new_length)
    }

    this.dot = function (x, y) { // returns dot product of two vectors
      if (x instanceof Vector2d) { // v1.dot(v2) OR v.dot(x_val,y_val)
        return this.dot(x.x, x.y)
      }
      return this.x * (x || 0)
        + this.y * (y || 0)
    }

    this.dist = function (v) { // returns the distance between two points defined as vectors
      const d = v.copy().sub(this) // v1.dist(v2)
      return d.mag()
    }

    this.limit = function (l) { // constrain the magnitude (length) of a vector to the value
      const mSq = this.magSq() // passed to this function.
      if (mSq > l * l) { // v.limit(max_length)
        this.div(Math.sqrt(mSq))
        this.mult(l)
      }
      return this
    }

    this.headingRads = function () { // returns heading in radians
      const h = Math.atan2(this.y, this.x)
      return h
    }

    this.headingDegs = function () { // returns heading in Degrees
      const r = Math.atan2(this.y, this.x)
      const h = (r * 180.0) / Math.PI
      return h
    }

    this.rotateRads = function (a) { // rotates the vector by given angle in radians
      const newHead = this.headingRads() + a // v.rotateRads(angle_in_radians)
      const mag = this.mag()
      this.x = Math.cos(newHead) * mag
      this.y = Math.sin(newHead) * mag
      return this
    }

    this.rotateDegs = function (a) { // rotates the vector by given angle in radians
      a = (a * Math.PI) / 180.0 // v.rotateDegs(angle_in_degrees)
      const newHead = this.headingRads() + a
      const mag = this.mag()
      this.x = Math.cos(newHead) * mag
      this.y = Math.sin(newHead) * mag
      return this
    }

    this.angleBetweenRads = function (x, y) { // find the angle between two vectors in radians
      const v1 = this.copy(); let v2 // v1.angleBetweenRads(v2) OR v.angleBetweenRads(some_x,some_y)
      if (x instanceof Vector2d)
        v2 = x.copy()

      else
        v2 = new Vector2d(x, y)

      const angle = Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()))
      return angle
    }

    this.angleBetweenDegs = function (x, y) { // same as above, except in degrees
      const r = this.angleBetweenRads(x, y)
      const d = (r * 180) / Math.PI
      return d
    }

    this.lerp = function (x, y, amt) { // linear interpolate the vector to another vector
      if (x instanceof Vector2d) { // amt is a value between 0.0 (close to the old vector)
        return this.lerp(x.x, x.y, y) // and 1.0 (close to the new vector)
      } // v1.lerp(v2, lerp_amount) OR v.lerp(some_x, some_y, lerp_amount)
      if (amt > 1.0)
        amt = 1.0
      this.x += (x - this.x) * amt
      this.y += (y - this.y) * amt
      return this
    }

    this.equals = function (x, y) { // checks if two vectors are identical.
      let a, b // returns true or false
      if (x instanceof Vector2d) { // v1.equals(v2) OR v.equals(some_x,some_y)
        a = x.x || 0
        b = x.y || 0
      }
      else {
        a = x || 0
        b = y || 0
      }

      return this.x === a && this.y === b
    }

    this.copy = function () {
      return new Vector2d(this.x, this.y) // returns a COPY of the vector (ie pass by value, not by reference)
    } // const v2 = v1.copy()
  }

  const PI = Math.PI
  const TAU = PI * 2
  const HALF_PI = PI * 0.5
  const RAND = Math.random
  const ROUND = Math.round
  const SIN = Math.sin
  const COS = Math.cos
  const ABS = Math.abs
  const POW = Math.pow
  const lib = {
    v2: Vector2d,
    noise,
    stats: Stats,
  }

  class Config {
    constructor(opts) {
      this.merge(opts)
    }

    merge(opts) {
      for (const opt in opts)
        this.set(opt, opts[opt])
    }

    set(key, value) {
      if (!key || !value)
        return
      else this[key] = value
    }
  }

  class Canvas {
    constructor(selector, context, dimensions, center) {
      const self = this

      if (selector) {
        this.el = document.querySelector(selector)
      }
      else {
        this.el = document.createElement('canvas')
        document.body.appendChild(this.el)
      }
      this.ctx = this.el.getContext(context) || this.el.getContext('2d')
      this.dimensions = dimensions || { x: 0, y: 0 }
      this.center = new lib.v2()
      window.addEventListener('resize', self.resize.bind(self))
    }

    rgba(r, g, b, a) {
      return `rgba(${r},${g},${b},${a})`
    }

    hsla(h, s, l, a) {
      return `hsla(${h}, ${s}, ${l}, ${a})`
    }

    fill(x, y, width, height, fill) {
      this.ctx.fillStyle = fill || 'rgba(0,0,0,1)'
      this.ctx.fillRect(x, y, width, height)
    }

    clear() {
      this.ctx.clearRect(0, 0, this.dimensions.x, this.dimensions.y)
    }

    drawLine(x1, y1, x2, y2, stroke, strokeWidth) {
      this.ctx.beginPath()
      this.ctx.moveTo(x1, y1)
      this.ctx.lineTo(x2, y2)
      this.ctx.strokeStyle = stroke || 'rgba(255,255,255,1)'
      this.ctx.lineWidth = strokeWidth || 2
      this.ctx.stroke()
      this.ctx.closePath()
    }

    resize() {
      this.el.width = this.dimensions.x = window.innerWidth
      this.el.height = this.dimensions.y = window.innerHeight
      this.center.x = this.dimensions.x * 0.5
      this.center.y = this.dimensions.y * 0.5
      this.ctx.globalCompositeOperation = 'lighter'
    }
  }

  class Particle {
    constructor(x, y, bounds, center) {
      this.lastPosition = new lib.v2()
      this.position = new lib.v2(x, y)
      this.velocity = new lib.v2()
      this.life = 0
      this.ttl = 1000
      this.bounds = bounds
      this.center = center
      this.reset = false
    }

    update() {
      if (this.life > this.ttl || this.checkBounds()) {
        this.reset = true
      }
      else {
        this.position.add(this.velocity)
        this.life++
      }
    }

    checkBounds() {
      return (
        this.lastPosition.x - this.size * 3 > this.bounds.x
      || this.lastPosition.x < -this.size
      || this.lastPosition.y - this.size * 3 > this.bounds.y
      || this.lastPosition.y < -this.size
      || this.position.distanceTo(this.center) < 3
      )
    }
  }

  class ParticleSystem {
    constructor(opts) {
      lib.noise.seed(RAND * 2000)
      const defaults = {
        max: 4000,
        size: 5,
      }
      this.canvas = new Canvas('.canvas', '2d')
      this.canvas.resize()
      this.bounds = this.canvas.dimensions
      this.config = new Config(defaults)
      this.tick = 0
      this.points = []
      this.render()
    }

    update() {
      let pRef,
        p,
        noiseVal,
        noiseNorm,
        theta,
        theta2,
        dTheta,
        vel,
        vel2,
        size,
        hue,
        colorString
      this.canvas.clear()
      this.canvas.ctx.lineCap = 'round'
      if (this.points.length < this.config.max && this.tick % 2 === 0) {
        const rand = ROUND(RAND())
        const x = rand
          ? ROUND(RAND()) * this.canvas.dimensions.x
          : RAND() * this.canvas.dimensions.x
        const y = rand
          ? RAND() * this.canvas.dimensions.y
          : ROUND(RAND()) * this.canvas.dimensions.y
        p = new Particle(x, y, this.canvas.dimensions, this.canvas.center)
        this.points.push(p)
      }
      for (let i = this.points.length - 1; i >= 0; i--) {
        p = this.points[i]
        if (p.reset) {
          this.points.splice(i, 1)
          continue
        }
        else {
          p.lastPosition.x = p.position.x
          p.lastPosition.y = p.position.y
          noiseVal = lib.noise.simplex3(
            p.position.x * 0.0015,
            p.position.y * 0.0015,
            this.tick * 0.005,
          )
          noiseNorm = ABS(noiseVal)
          theta
      = noiseVal
      * TAU
      * (1000 / (p.position.distanceTo(this.canvas.center) + 1000))
          theta2 = p.position.angleTo(this.canvas.center) + HALF_PI * 0.25
          dTheta = (theta + theta2) / 2
          hue = theta * 10 - 30
          colorString = this.canvas.hsla(hue, '50%', '50%', noiseNorm + 0.2)
          vel = new lib.v2(
            (COS(theta) * 0.5 + COS(theta2)) * 6,
            (SIN(theta) * 0.5 + SIN(theta2)) * 3,
          ).multiplyScalar((2 * (p.position.y / this.canvas.dimensions.y) + 1) ** 2)
          size
      = (p.position.y / this.canvas.dimensions.y * this.config.size) ** 2 + 2
          p.velocity.lerp(vel, 0.035)
          p.update()
          this.canvas.drawLine(
            p.lastPosition.x,
            p.lastPosition.y,
            p.position.x,
            p.position.y,
            colorString,
            size,
          )
        }
      }
      this.tick++
    }

    render() {
      const self = this
      self.update()
      window.requestAnimationFrame(self.render.bind(self))
    }
  }

<script lang="ts" setup>

</script>

<template>
  
</template>
