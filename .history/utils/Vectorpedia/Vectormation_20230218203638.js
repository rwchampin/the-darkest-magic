import { Vector2 } from './Vector2'
import { Vector3 } from './Vector3'

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
    top = 0,
    left = 0,
    position = 'fixed',
    effects = {
      mouse: false,

    },
  }) {
    this.width = width || window.innerWidth || canvas.width || canvas.clientWidth || canvas.offsetWidth
    this.height = height || window.innerHeight || canvas.height || canvas.clientHeight || canvas.offsetHeight
    this.canvas = canvas || document.createElement('canvas').setAttribute('id', 'vectormation-canvas')
    this.canvas.style.pointerEvents = pointerEvents ? 'auto' : 'none'
    this.ctx = context || this.canvas.getContext('2d')
    this.ctx.canvas.width = !fullScreen ?? this.width
    this.ctx.canvas.height = !fullScreen ?? this.height
    this.ctx.canvas.style.width = !fullScreen ?? `${this.width}px`
    this.ctx.canvas.style.height = !fullScreen ?? `${this.height}px`
    this.ctx.canvas.style.pointerEvents = pointerEvents ? 'auto' : 'none'
    this.ctx.canvas.style.background = bg
    this.ctx.canvas.style.zIndex = zIndex
    this.ctx.canvas.style.top = top
    this.ctx.canvas.style.left = left
    this.ctx.canvas.style.position = position

    /*********************************
    ** EFFECTS
    *********************************/
    this.effects = {}
    this.effects.mouse = effects.mouse ?? false
  }

  registerEventListeners() {
    window.addEventListener('resize', () => {
      this.resize()
    })
    if (this.effects.mouse) {
      this.canvas.addEventListener('mousemove', (e) => {
        this.mouseMove(e)
      })
      this.canvas.addEventListener('mousedown', (e) => {
        this.mouseMove(e)
      })
      this.canvas.addEventListener('mouseup', (e) => {
        this.mouseMove(e)
      })
    }
  }
}
