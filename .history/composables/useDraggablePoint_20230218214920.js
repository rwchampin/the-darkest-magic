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
}
