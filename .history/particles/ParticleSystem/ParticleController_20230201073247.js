import Vector from '../Vector'
import Display from './Display'
import ParticleSystem from './ParticleSystem'

export const ParticleController = (renderer) => {
  const canvas = renderer.domElement
  const ctx = renderer.getContext()
  window.addEventListener('resize', resize); resize()

  const display = new Display(document.getElementById('canvas'))
  display.init()
  const particleSystem = new ParticleSystem().init(display)
  display.start()

  const gui = new GUI(particleSystem, display)

  particleSystem.addEmitter(new Vector(360, 230), Vector.fromAngle(0, 2))
  particleSystem.addField(new Vector(700, 230), -140)

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
//   },
// )
}
