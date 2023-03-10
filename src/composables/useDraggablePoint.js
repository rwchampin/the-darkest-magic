import gsap from 'gsap'
import { Draggable } from 'gsap/all'

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

    this.draggable = Draggable.create(this.el, {
      type: 'x,y',
      onDrag: () => {
        this.point.x = this.el._gsTransform.x
        this.point.y = this.el._gsTransform.y
        this.onDrag()

        gsap.to(this.el, {
          x: this.point.x,
          y: this.point.y,
          duration: 0.5,
          ease: 'power3.out',
        })
      },
      onDragEnd: () => {
        this.point.x = this.el._gsTransform.x
        this.point.y = this.el._gsTransform.y
        this.onDragEnd()

        gsap.to(this.el, {
          x: this.point.x,
          y: this.point.y,
          duration: 0.5,
          ease: 'power3.out',
        })
      },
      onDragStart: () => {
        this.onDragStart()
      },
    })

    this.registerListeners()
  }

  registerListeners() {
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

  update() {
    this.el.style.left = `${this.point.x}px`
    this.el.style.top = `${this.point.y}px`
  }

  render() {
    this.update()
    requestAnimationFrame(this.render)
  }

  start() {
    this.render()
  }

  stop() {
    cancelAnimationFrame(this.render)
  }

  /*********************************
  ** EVENTS
  *********************************/

  /*********************************
 ** Setters
 * *******************************/

  setPoint(point) {
    this.point = point
  }

  setOnDrag(onDrag) {
    this.onDrag = onDrag
  }

  setOnDragStart(onDragStart) {
    this.onDragStart = onDragStart
  }

  setOnDragEnd(onDragEnd) {
    this.onDragEnd = onDragEnd
  }

  setEl(el) {
    this.el = el
  }

  setIsDragging(isDragging) {
    this.isDragging = isDragging
  }

  setIsHovering(isHovering) {
    this.isHovering = isHovering
  }

  /*********************************
  ** Getters
  *********************************/
  getPoint() {
    return this.point
  }

  getIsDragging() {
    return this.isDragging
  }

  getIsHovering() {
    return this.isHovering
  }

  getEl() {
    return this.el
  }

  getOnDrag() {
    return this.onDrag
  }

  getOnDragStart() {
    return this.onDragStart
  }

  getOnDragEnd() {
    return this.onDragEnd
  }
}
