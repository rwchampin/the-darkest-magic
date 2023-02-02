import Vector from './Util'
import Display from './Display'
import ParticleSystem from './ParticleSystem'

export const ParticleController = (renderer) => {
  const canvas = document.createElement('canvas')
  canvas.setAttribute('id', 'canvas')
  const ctx = canvas.getContext('2d')
  window.addEventListener('resize', resize); resize()

  const display = new Display(renderer)
  display.init()
  const particleSystem = new ParticleSystem().init(display)
  display.start()

  particleSystem.addEmitter(new Vector(360, 230), Vector.fromAngle(0, 2))
  particleSystem.addField(new Vector(700, 230), -140)

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
//   },
// )
}
