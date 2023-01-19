export default class Canvas {
  constructor(selector, context, dimensions, center) {
    const self = this

    if (selector)
      this.el = experience.ctx

    else
      this.el = experience.ctx

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
