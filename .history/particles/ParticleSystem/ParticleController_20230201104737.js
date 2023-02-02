import Vector from './Util'
import Display from './Display'
import ParticleSystem from './ParticleSystem'

export const ParticleController = (renderer) => {
  const canvas = document.createElement('canvas')
  canvas.setAttribute('id', 'canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.zIndex = '999999'
  canvas.style.width = window.innerWidth
  canvas.style.height = window.innerHeight
  canvas.style.background = 'babyblue'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  debugger
  const display = new Display(canvas)
  display.init()
  const particleSystem = new ParticleSystem().init(display)
  display.start()

  particleSystem.addEmitter(new Point(360, 230), Vector.fromAngle(0, 2))
  particleSystem.addField(new Point(700, 230), -140)

//   },
// )
}
