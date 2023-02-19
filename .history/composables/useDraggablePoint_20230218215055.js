export default class DraggablePoint {
  constructor(point) {
    this.point = point
    this.onDrag = () => { }
    this.onDragEnd = () => { }
    this.onDragStart = () => { }
    this.isDragging = false
    this.isHovering = false

    this.init()
  }

  init() {
    this.el = document.createElement('div')
    this.el.classList.add('draggable-point')
    this.el.style.left = `${this.point.x}px`
    this.el.style.top = `${this.point.y}px`
    document.body.appendChild(this.el)

    this.el.addEventListener('mousedown', this.onMouseDown)
    this.el.addEventListener('touchstart', this.onMouseDown)
    this.el.addEventListener('mouseup', this.onMouseUp)
    this.el.addEventListener('touchend', this.onMouseUp)
    this.el.addEventListener('mousemove', this.onMouseMove)
    this.el.addEventListener('touchmove', this.onMouseMove)
    this.el.addEventListener('mouseenter', this.onMouseEnter)
    this.el.addEventListener('mouseleave', this.onMouseLeave)
  }

  onMouseDown = (event) => {
    this.isDragging = true
    this.onDragStart()
  }

  onMouseUp = (event) => {
    this.isDragging = false
    this.onDragEnd()
  }

  onMouseMove = (event) => {
    if (this.isDragging) {
      this.point.x = event.clientX
      this.point.y = event.clientY
      this.onDrag()
    }
  }

  onMouseEnter = (event) => {
    this.isHovering = true
  }

  onMouseLeave = (event) => {
    this.isHovering = false
  }

  destroy() {
    this.el.removeEventListener('mousedown', this.onMouseDown)
    this.el.removeEventListener('touchstart', this.onMouseDown)
    this.el.removeEventListener('mouseup', this.onMouseUp)
    this.el.removeEventListener('touchend', this.onMouseUp)
    this.el.removeEventListener('mousemove', this.onMouseMove)
    this.el.removeEventListener('touchmove', this.onMouseMove)
    this.el.removeEventListener('mouseenter', this.onMouseEnter)
    this.el.removeEventListener('mouseleave', this.onMouseLeave)
    document.body.removeChild(this.el)
  }
}
