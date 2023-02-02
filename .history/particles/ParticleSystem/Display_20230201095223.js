import Vector from './Util.js'
import { showError } from '#app'

export default function Display(canvas) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this
  debuggers
  self.canvas = canvas
  self.context = canvas.getContext()
  self.framerate = 100
  self.numFrames = 0
  self.paused = true
  self.nextRedraw = 0
  self.scale = 1
  self.listeners = {}
  self.draw = {
    continuous: true,
    info: true,
  }

  self.info = {
    fps: 0,
    lastFrameTime: 0,
    runningFrameTime: 0,
  }

  self.init = function () {
    if (!self.canvas.getContext) {
      throw showError({
        statusMessage: 'No Context',
        statusCode: 500,
      })
      return
    }

    self.context = canvas.getContext('2d')
    // self.context.scale(self.scale, self.scale)

    self.width = canvas.width / self.scale
    self.height = canvas.height / self.scale

    self.canvas.onmousedown = function (evt) { self.fireEvent('mouseDown', evt); return false }
    self.canvas.onmouseup = function (evt) { self.fireEvent('mouseUp', evt); return false }
    self.canvas.onmouseover = function (evt) { self.fireEvent('mouseOver', evt) }
    self.canvas.onmousemove = function (evt) { self.fireEvent('mouseMove', evt) }

    window.requestAnimFrame = window.requestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.oRequestAnimationFrame
      || window.msRequestAnimationFrame

    self.addListener('draw', self)
    self.addListener('afterDraw', self)
    self.addListener('newFrame', self)
    self.main()
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
        if (self.listeners[eventName][i][eventMethod]) {
          // eslint-disable-next-line no-useless-call
          self.listeners[eventName][i][eventMethod].call(self.listeners[eventName][i], evt, self)
        }
      }
    }
  }

  self.main = function () {
    if (!self.paused)
      self.nextFrame()

    if (window.requestAnimFrame)
      window.requestAnimFrame(() => { self.main() })

    else
      self.nextRedraw = setTimeout(() => { self.main() }, 1000 / self.framerate)
  }

  self.nextFrame = function () {
    self.fireEvent('newFrame')
    self.fireEvent('beforeUpdate')
    self.fireEvent('update')
    self.fireEvent('afterUpdate')
    self.fireEvent('beforeDraw')
    self.fireEvent('draw')
    self.fireEvent('afterDraw')
  }

  self.error = function (msg) {
    throw showError({
      statysCode: 500,
      statusMessage: msg,
    })
  }

  self.getFps = function () {
    return (1000 / self.info.runningFrameTime).toFixed(1)
  }

  self.onDraw = function () {
    self.tick()
  }
  self.onAfterDraw = function () {
    if (self.draw.info)
      self.drawStats()
  }
  self.drawStats = function () {
    self.fillStyle('white')
    self.drawText(`FPS : ${self.getFps()}`, new Vector(10, self.height - 10), 80)
  }
  self.onNewFrame = function () {
    if (!self.draw.continuous)
      self.clear()
  }

  self.drawLine = function (startPoint, endPoint) {
    self.context.beginPath()
    self.context.moveTo(startPoint.x, startPoint.y)
    self.context.lineTo(endPoint.x, endPoint.y)
    self.context.stroke()
  }

  self.drawText = function (txt, point, width) {
    self.context.fillText(txt, point.x, point.y, width)
  }

  self.drawCircle = function (point, radius) {
    self.context.beginPath()
    self.context.arc(point.x, point.y, radius, 0, Math.PI * 2)
    self.context.closePath()
    self.context.fill()
  }
  self.fillStyle = function (fill) { self.context.fillStyle = fill }
  self.strokeStyle = function (fill) { self.context.strokeStyle = fill }

  self.tick = function () {
    self.numFrames++
    if (!self.info.lastFrameTime) {
      self.info.lastFrameTime = new Date().getTime()
    }
    else {
      const now = new Date().getTime()
      const timeToDraw = now - self.info.lastFrameTime
      self.info.runningFrameTime = self.info.runningFrameTime * 0.8 + timeToDraw * 0.2
      self.info.lastFrameTime = now
    }
  }

  self.clear = function () {
    self.context.clearRect(0, 0, self.width, self.height)
  }
  self.start = function () { self.paused = false }
  self.stop = function () { self.paused = true }
  self.togglePause = function () { self.paused = !self.paused }
  self.unpause = self.start
  self.pause = self.stop
  self.step = function () { self.stop(); self.nextFrame() }
}
