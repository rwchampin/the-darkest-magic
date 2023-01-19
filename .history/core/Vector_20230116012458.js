const VectorLib = {

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
  drawRectFill: ({ ctx, vector, width, height, color }) => {
    ctx.beginPath()
    ctx.rect(vector.x, vector.y, width, height)
    ctx.fillStyle = color
    ctx.fill()
  },
  drawText: ({ ctx, vector, text, color, font }) => {
    ctx.beginPath()
    ctx.font = font
    ctx.fillStyle = color
    ctx.fillText(text, vector.x, vector.y)
  },
  drawImage: ({ ctx, vector, image, width, height }) => {
    ctx.beginPath()
    ctx.drawImage(image, vector.x, vector.y, width, height)
  },
  drawImageCenter: ({ ctx, vector, image, width, height }) => {
    ctx.beginPath()
    ctx.drawImage(image, vector.x - width / 2, vector.y - height / 2, width, height)
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
