import { Vector2 } from './Vector2'
import { Vector3 } from './Vector3'

const defaultStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 9999,
  width: '100vw',
  height: '100vh',
  background: 'transparent',
  pointerEvents: 'none',
}

export class Vectormation {
  constructor({
    canvas,
    context,
    width = '100vw',
    height = '100vh',
    pointerEvents = false,
    fullScreen = true,
    bg = 'transparent',
    zIndex = 9999,
  }) {
    this.width = width || window.innerWidth || canvas.width || canvas.clientWidth || canvas.offsetWidth
    this.height = height || window.innerHeight || canvas.height || canvas.clientHeight || canvas.offsetHeight
    this.canvas = canvas || document.createElement('canvas').setAttribute('id', 'vectormation-canvas')
    this.canvas.style = defaultStyles
    this.canvas.style.pointerEvents = pointerEvents ? 'auto' : 'none'
    this.ctx = context || this.canvas.getContext('2d')
    this.ctx.canvas.width = !fullScreen ?? this.width
    this.ctx.canvas.height = !fullScreen ?? this.height
    this.ctx.canvas.style.width = !fullScreen ?? `${this.width}px`
    this.ctx.canvas.style.height = !fullScreen ?? `${this.height}px`
    this.ctx.canvas.style.pointerEvents = pointerEvents ? 'auto' : 'none'
    this.ctx.canvas.style.background = bg
  }
}
