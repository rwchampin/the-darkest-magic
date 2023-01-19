import _ from 'lodash'
import Backbone from 'backbone'
import stats from '../stats.js'
console.log('Backbone', Backbone)
const profile = false

function Display(canvas) {
  this.canvas = canvas
  this.context = undefined
  this.numFrames = 0
  this.paused = false
  this.scale = 1
  this.draw = {
    continuous: false,
    info: false,
  }
}

_.extend(Display.prototype, Backbone.Events, {
  init() {
    this.context = this.canvas.getContext('2d')
    this.context.scale(this.scale, this.scale)

    this.width = this.canvas.width / this.scale
    this.height = this.canvas.height / this.scale

    this.canvas.onmousedown = function (evt) {
      this.trigger('mouseDown', evt)
      return false
    }.bind(this)
    this.canvas.onmouseup = function (evt) {
      this.trigger('mouseUp', evt)
      return false
    }.bind(this)
    this.canvas.onmouseover = function (evt) { this.trigger('mouseOver', evt) }.bind(this)
    this.canvas.onmousemove = function (evt) { this.trigger('mouseMove', evt) }.bind(this)

    profile && console.profile('Display')
    this.main()
  },
  main() {
    stats.begin()
    if (!this.paused)
      this.nextFrame()
    if (profile && this.numFrames > 1000)
      return console.profileEnd('Display')
    requestAnimationFrame(this.main.bind(this))
    stats.end()
  },
  nextFrame() {
    if (!this.draw.continuous)
      this.clear()

    this.trigger('newFrame')
    this.trigger('beforeUpdate')
    this.trigger('update')
    this.trigger('afterUpdate')
    this.trigger('beforeDraw')
    this.tick()
    this.trigger('draw')
    this.trigger('afterDraw')
  },
  drawLine(startPoint, endPoint) {
    this.context.beginPath()
    this.context.moveTo(startPoint.x, startPoint.y)
    this.context.lineTo(endPoint.x, endPoint.y)
    this.context.stroke()
  },
  drawText(txt, point, width) {
    this.context.fillText(txt, point.x, point.y, width)
  },
  drawCircle(point, radius) {
    this.context.beginPath()
    this.context.arc(point.x, point.y, radius, 0, Math.PI * 2)
    this.context.closePath()
    this.context.fill()
  },
  fillStyle(fill) { this.context.fillStyle = fill },
  strokeStyle(fill) { this.context.strokeStyle = fill },
  tick() {
    this.numFrames++
  },
  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  },
  start() { this.paused = false },
  stop() { this.paused = true },
  togglePause() { this.paused = !this.paused },
  step() {
    this.stop()
    this.nextFrame()
  },
})
export default Display

