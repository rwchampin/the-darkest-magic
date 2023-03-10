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
  canvas.style.width = 500
  canvas.style.height = 500
  canvas.style.background = 'babyblue'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  const display = new Display(canvas)

  display.init()
  // display.drawCircle(new Vector(11, 11), 10)
  const particleSystem = new ParticleSystem().init(display)
  display.start()

  particleSystem.addEmitter(new Vector(12, 12), Vector.fromAngle(0, 2))
  particleSystem.addField(new Vector(30, 30), -140)

//   },
// )
}
