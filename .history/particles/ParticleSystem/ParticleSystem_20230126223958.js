/* eslint-disable @typescript-eslint/no-this-alias */
import Vector from './Util.js'
export default function ParticleSystem() {
  const self = this

  self.maxParticles = 2000
  self.startTime = 0
  self.draw = {
    objects: true,
    accelerations: false,
    velocities: false,
    particles: true,
  }
  self.particles = []
  self.emitters = []
  self.fields = []
  self.listeners = {}
  self.elapsed = 0
  self.lastEmitter = 0
  self.mouseCoords = new Vector(0, 0)
  self.mouseFieldStrength = -140
  self.mouseField

  self.init = function (display) {
   	display.addListener('draw', self)
   	display.addListener('afterDraw', self)
   	display.addListener('beforeUpdate', self)
   	display.addListener('update', self)
    display.addListener('mouseUp', self)
    display.addListener('mouseDown', self)
    display.addListener('mouseMove', self)
    return self
  }

  self.addListener = function (eventName, object) {
	   if (!self.listeners[eventName])
	      self.listeners[eventName] = []

	   self.listeners[eventName].push(object)
  }
  self.fireEvent = function (eventName, evt) {
	   if (self.listeners[eventName] && self.listeners[eventName].length > 0) {
      const eventMethod = `on${eventName.substr(0, 1).toUpperCase()}${eventName.substr(1)}`
	      for (let i = 0; i < self.listeners[eventName].length; i++) {
	         if (self.listeners[eventName][i][eventMethod])
	            self.listeners[eventName][i][eventMethod].call(self.listeners[eventName][i], evt, self)
	      }
	   }
  }

  self.addEmitter = function (point, velocity) {
    const emitter = new ParticleEmitter(point, velocity)
    self.emitters.push(emitter)
    self.fireEvent('newObject', { particleTarget: emitter })
  }
  self.removeEmitter = function (index) {
    if (typeof index.constructor !== Number)
      index = self.emitters.indexOf(index)
    const success = self.emitters.splice(index, 1)
    if (success)
      self.fireEvent('deleteObject', { particleTarget: success })
  }

  self.addField = function (point, mass) {
    const field = new Field(point, mass)
    self.fields.push(field)
    self.fireEvent('newObject', { particleTarget: field })
  }
  self.removeField = function (index) {
    if (typeof index.constructor !== Number)
      index = self.fields.indexOf(index)
    const success = self.fields.splice(index, 1)
    if (success)
      self.fireEvent('deleteObject', { particleTarget: success })
  }

  self.onBeforeUpdate = function (evt, display) {
    if (self.draw.accelerations)
      self.drawAccelerations(display)
    if (self.draw.velocities)
      self.drawVelocities(display)
  }
  self.onUpdate = function (evt, display) {
    self.elapsed++
    self.addNewParticles()
    self.plotParticles(display.width, display.height)
  }

  self.onDraw = function (evt, display) {
    if (self.draw.particles)
      self.drawParticles(display)

    if (self.draw.objects) {
      self.drawFields(display)
      self.drawEmitters(display)
    }
  }
  self.onAfterDraw = function (evt, display) {
    if (display.draw.info) {
      display.fillStyle('white')
      display.drawText(`Particles : ${self.getParticleCount()}`, new Point(100, display.height - 10), 100)
    }
  }

  self.onMouseDown = function (evt, display) {
    const object = self.getObjectAtPoint(self.mouseCoords)
    if (self.selected) {
      evt.particleTarget = self.selected
      self.fireEvent('objectBlur', evt)
      self.selected = undefined
    }
    if (object) {
      self.clicked = object
      evt.particleTarget = object
      self.fireEvent('objectMouseDown')
    }
    else {
      self.mouseField = new Field(self.mouseCoords, self.mouseFieldStrength)
      self.mouseField.size = 0
      self.fields.push(self.mouseField)
    }
  }

  self.onMouseUp = function (evt) {
    const currentObject = self.getObjectAtPoint(self.mouseCoords)
    if (self.mouseField) {
      self.removeField(self.mouseField)
      self.mouseField = undefined
    }
    else if (self.clicked) {
      evt.particleTarget = self.clicked
      if (currentObject === self.clicked) {
        if (self.clicked.moved) {
          self.fireEvent('objectFinishMove', evt)
        }
        else {
          self.selected = self.clicked
          self.fireEvent('objectClick', evt)
          self.fireEvent('objectFocus', evt)
        }
        delete self.clicked.moved
        self.clicked = undefined
      }
    }
  }

  self.onMouseMove = function (evt, display) {
    self.mouseCoords = new Point(evt.offsetX || (evt.layerX - display.canvas.offsetLeft), evt.offsetY || (evt.layerY - display.canvas.offsetTop))
    if (self.mouseField) {
      self.mouseField.moveTo(self.mouseCoords)
    }
    else if (self.clicked) {
      self.clicked.moved = true
      self.clicked.moveTo(self.mouseCoords)
    }
    else { // not over anything
      const object = self.getObjectAtPoint(self.mouseCoords)
      if (self.objectMouseOver !== object) { // if we're over something different
        if (self.objectMouseOver) { // if we were over something before
          evt.particleTarget = self.objectMouseOver
          self.fireEvent('objectMouseOut', evt)
          self.objectMouseOver = undefined
        }
        else { // we're in *something* new, even if it's nothing
          evt.particleTarget = object
          self.fireEvent('objectMouseIn', evt)
          self.objectMouseOver = object
        }
      }
    }
  }

  self.addNewParticles = function () {
    if (self.particles.length < self.maxParticles) {
      for (var i = 0, emitter; emitter = self.emitters[i]; i++) {
        for (let j = 0; j < emitter.emissionRate; j++)
          self.particles.push(emitter.addParticle())
      }
    }
  }

  self.plotParticles = function (boundsX, boundsY) {
    const oldParticles = self.particles
    const fields = self.fields
    const updatedParticles = []
    let particle
    while (particle = oldParticles.pop()) {
      if (particle.ttl > 0) {
			   if (++particle.lived >= particle.ttl)
			      continue // particle dies.
      }
      particle.submitToFields(fields)
      particle.move()
      const p = particle.position
      if (p.x < 0 || p.x > boundsX || p.y < 0 || p.y > boundsY) {
        // goodbye particle
      }
      else {
			   updatedParticles.push(particle)
      }
    }
    self.particles = updatedParticles
  }

  self.drawParticles = function (display) {
    const imageData = display.context.getImageData(0, 0, display.width, display.height)
    const pixels = imageData.data
    const width = display.width
    let particle; let i = -1
    while (particle = self.particles[++i])
		   particle.draw(pixels, display.width, display.height)

    display.context.putImageData(imageData, 0, 0)
  }

  self.drawAccelerations = function (display) {
    display.strokeStyle('red')
    display.context.beginPath()
    for (let i = 0, l = self.particles.length; i < l; i++) {
      const particle = self.particles[i]
      display.context.moveTo(particle.position.x, particle.position.y)
      display.context.lineTo(particle.position.x + particle.acceleration.x, particle.position.y + particle.acceleration.y)
    }
    display.context.stroke()
  }

  self.drawVelocities = function (display) {
    display.strokeStyle('blue')
    display.context.beginPath()
    for (let i = 0, l = self.particles.length; i < l; i++) {
      const particle = self.particles[i]
      display.context.moveTo(particle.position.x, particle.position.y)
      display.context.lineTo(particle.position.x + particle.velocity.x, particle.position.y + particle.velocity.y)
    }
    display.context.stroke()
  }

  self.drawFields = function (display) {
    for (let i = 0, l = self.fields.length; i < l; i++)
      self.drawCircularObject(display, self.fields[i])
  }

  self.drawEmitters = function (display) {
    for (let i = 0, l = self.emitters.length; i < l; i++)
      self.drawCircularObject(display, self.emitters[i])
  }
  self.drawCircularObject = function (display, object) {
    const halfSize = object.size >> 1
    const gradient = display.context.createLinearGradient(
      object.position.x - halfSize,
      object.position.y - halfSize,
      object.position.x + halfSize,
      object.position.y + halfSize,
    )
    gradient.addColorStop(0, object.drawColor || object.constructor.drawColor)
    gradient.addColorStop(1, object.drawColor2 || object.constructor.drawColor2)
    display.fillStyle(gradient)
    display.drawCircle(object.position, halfSize)
  }

  self.getObjectAtPoint = function (point) {
    for (var i = 0; i < self.emitters.length; i++) {
      const emitter = self.emitters[i]
      if (point.withinBounds(emitter.position, emitter.size))
			   return emitter
    }
    for (var i = 0; i < self.fields.length; i++) {
      const field = self.fields[i]
      if (point.withinBounds(field.position, field.size))
			   return field
    }
  }

  self.getParticleCount = function () { return self.particles.length }
  self.getEmitterCount = function () { return self.emitters.length }
  self.getFieldCount = function () { return self.fields.length }

  self.toString = function () {
    const stateVersion = 1
    const coreAttributes = [
      self.maxParticles,
      self.draw.objects ? 1 : 0,
      self.draw.accelerations ? 1 : 0,
      self.draw.velocities ? 1 : 0,
      self.draw.particles ? 1 : 0,
    ]
    for (var i = 0; i < self.emitters.length; i++)
      coreAttributes.push(self.emitters[i].toString())

    for (var i = 0; i < self.fields.length; i++)
      coreAttributes.push(self.fields[i].toString())

    return `Sv${stateVersion}(${coreAttributes.join('|')})`
  }
  // Sv#(string)
  self.fromString = function (string) {
    const versions = {
      Sv1: self.loadStateV1,
    }
    const matches = string.match(/^([^(]+)\((.*)\)$/)
    if (matches && matches.length == 3) {
      if (versions[matches[1]])
        versions[matches[1]](matches[2])
    }
  }
  // maxP|draw.obj|draw.acc|draw.vel|draw.part|emitter|emitter|field|field
  self.loadStateV1 = function (string) {
    const parts = string.split('|')
    self.maxParticles = parseInt(parts.shift())
    self.draw.objects = parts.shift() === '1'
    self.draw.accelerations = parts.shift() === '1'
    self.draw.velocities = parts.shift() === '1'
    self.draw.particles = parts.shift() === '1'
    self.emitters = []
    self.fields = []
    let object
    while (objectString = parts.shift()) {
      if (objectString.charAt(0) == 'E')
        self.emitters.push(ParticleEmitter.fromString(objectString))

      else
        self.fields.push(Field.fromString(objectString))
    }
  }
}
