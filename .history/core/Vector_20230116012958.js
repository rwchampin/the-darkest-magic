const Vector = {

  createVector: (x, y) => {
    x,
    y
  },
  getDirection: (vector) => {
    return Math.atan2(vector.y, vector.x)
  },
  getMagnitude: (vector) => {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
  },
  setMagnitude: (vector, magnitude) => {
    const direction = this.getDirection(vector)
    vector.x = Math.cos(direction) * magnitude
    vector.y = Math.sin(direction) * magnitude
  },
  random2dVector: () => {
    /**
     * Returns a random 2D vector with a length of 1
     * @return {Object} - {x, y}
     * @example
     * const vector = Vector.random2dVector()
     * console.log(vector.x, vector.y)
     * // => 0.123456789 0.987654321
     * console.log
     * // => 1
     * 
     */
    const angle = Math.random() * Math.PI * 2
    const length = 1
    return {
      x: Math.cos(angle) * length,
      y: Math.sin(angle) * length,
    }
  },
  add: (vector1, vector2) => {
    return {
      x: vector1.x + vector2.x,
      y: vector1.y + vector2.y,
    }
  },
  subtract: (vector1, vector2) => {
    return {
      x: vector1.x - vector2.x,
      y: vector1.y - vector2.y,
    }
  },
  multiply: (vector, scalar) => {
    return {
      x: vector.x * scalar,
      y: vector.y * scalar,
    }
  },
  divide: (vector, scalar) => {
    return {
      x: vector.x / scalar,
      y: vector.y / scalar,
    }
  },
  normalize: (vector) => {
    const magnitude = this.getMagnitude(vector)
    return {
      x: vector.x / magnitude,
      y: vector.y / magnitude,
    }
  },
  limit: (vector, max) => {
    if (this.getMagnitude(vector) > max) {
      vector = this.normalize(vector)
      vector = this.multiply(vector, max)
    }
    return vector
  },
  distance: (vector1, vector2) => {
    const dx = vector1.x - vector2.x
    const dy = vector1.y - vector2.y
    return Math.sqrt(dx * dx + dy * dy)
  },
  getMass: (vector) => {
    return this.getMagnitude(vector) * this.getMagnitude(vector)
    },
    
  getAcceleration: (vector1, vector2, mass) => {
    const force = this.subtract(vector2, vector1)
    const distance = this.distance(vector1, vector2)
    const strength = (G * mass) / (distance * distance)
    return this.multiply(force, strength)
    },
  lerp: (vector1, vector2, amount) => {
    return {
      x: vector1.x + (vector2.x - vector1.x) * amount,
      y: vector1.y + (vector2.y - vector1.y) * amount,
    }
  },
  angleBetween: (vector1, vector2) => {
    const dot = vector1.x * vector2.x + vector1.y * vector2.y
    const v1mag = this.getMagnitude(vector1)
    const v2mag = this.getMagnitude(vector2)
    const amt = dot / (v1mag * v2mag)
    if (amt <= -1)
      return Math.PI

    else if (amt >= 1)
      return 0

    return Math.acos(amt)
  },
  rotate: (vector, angle) => {
    return {
      x: vector.x * Math.cos(angle) - vector.y * Math.sin(angle),
      y: vector.x * Math.sin(angle) + vector.y * Math.cos(angle),
    }
  },
  angleTo: (vector1, vector2) => {
    return Math.atan2(vector2.y - vector1.y, vector2.x - vector1.x)
  },
  fromAngle: (angle, length) => {
    return {
      x: Math.cos(angle) * length,
      y: Math.sin(angle) * length,
    }
  },
  posToStep: (vector, step) => {
    return {
      x: Math.floor(vector.x / step),
      y: Math.floor(vector.y / step),
    }
  },
  stepToPos: (vector, step) => {
    return {
      x: vector.x * step,
      y: vector.y * step,
    }
  },
  posToIndex: (vector, step, cols) => {
    return vector.y * cols + vector.x
  },
  indexToPos: (index, step, cols) => {
    return {
      x: index % cols,
      y: Math.floor(index / cols),
    }
  },
  posToIndex2: (vector, step, cols) => {
    return vector.x * cols + vector.y
  },
  indexToPos2: (index, step, cols) => {
    return {
      x: Math.floor(index / cols),
      y: index % cols,
    }
  },
  drawLine: ({ vector1, vector2, color, width, ctx }) => {
    ctx.beginPath()
    ctx.moveTo(vector1.x, vector1.y)
    ctx.lineTo(vector2.x, vector2.y)
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.stroke()
  },
  drawCircle: ({ ctx, vector, radius, color, width }) => {
    ctx.beginPath()
    ctx.arc(vector.x, vector.y, radius, 0, Math.PI * 2)
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.stroke()
  },
  drawRect: ({ ctx, vector, width, height, color, lineWidth }) => {
    ctx.beginPath()
    ctx.rect(vector.x, vector.y, width, height)
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.stroke()
  },  
  edges: ({ vector, width, height }) => {
    /**
     * @param {object} vector - position
     * @param {number} width - canvas width
     * @param {number} height - canvas height
     * @returns {object} - position
     * @description - if the position is outside the canvas, it will be moved to the opposite side
     * @example
     * vector = { x: 0, y: 0 }
     * width = 100
     * height = 100
     * edges({ vector, width, height })
     * // => { x: 100, y: 100 }
     */
    if (vector.x < 0) vector.x = width
    if (vector.x > width) vector.x = 0
    if (vector.y < 0) vector.y = height
    if (vector.y > height) vector.y = 0
    },
  Circle: {
    draw: ({ vector, radius, color, width, ctx }) => {
        ctx.beginPath()
        ctx.arc(vector.x, vector.y, radius, 0, Math.PI * 2)
        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.stroke()
    },

    move: ({ mouse, vector, radius, color, width }) => {
        /** 
         * @param {object} mouse - mouse position
         * @param {object} vector - circle position
         * @param {number} radius - circle radius
         * @param {string} color - circle color
         * @param {number} width - circle width
         */
        const speed = Vector.Circle.getSpeed(vector);
      const angle = this.angleTo(vector, mouse)
      vector = this.add(vector, this.fromAngle(angle, speed))
      this.drawCircle(vector, radius, color, width)
      return vector
    },
    getSpeed: (vector) => {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
    },
    getAcceleration: (vector, target, speed) => {
      const angle = this.angleTo(vector, target)
      return this.fromAngle(angle, speed)
    },
    getSpeed: (vector) => {
      return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
    },
    getMagnitude: (vector) => {
      return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
    },
    getAngle: (vector) => {
      return Math.atan2(vector.y, vector.x)
    },
    setAngle: (vector, angle) => {
      const magnitude = this.getMagnitude(vector)
      return {
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude,
      }
    },
    setMagnitude: (vector, magnitude) => {
      const angle = this.getAngle(vector)
      return {
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude,
      }
    },
    limit: (vector, max) => {
        if (this.getMagnitude(vector) > max) {
            return this.setMagnitude(vector, max)
        }
        return vector
        },
    },

  },
}