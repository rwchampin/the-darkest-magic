import { Vector2 } from './Vector2'
import { Vector3 } from './Vector3'

const defaultStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 9999,
  width: '100%',
  height: '100%',
  background: 'transparent',
  pointerEvents: 'none',
}

export class Vectormation {
  constructor({ canvas, context, width, height, pointerEvents = false, fullScreen = true }) {
    this.width = width || window.innerWidth || canvas.width || canvas.clientWidth || canvas.offsetWidth
    this.height = height || window.innerHeight || canvas.height || canvas.clientHeight || canvas.offsetHeight
    this.canvas = canvas || document.createElement('canvas').setAttribute('id', 'vectormation-canvas')
    this.canvas.style = defaultStyles
    this.canvas.style.pointerEvents = pointerEvents ? 'auto' : 'none'
    this.ctx = context || this.canvas.getContext('2d')
  }
}
