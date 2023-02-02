import Vector from '../Vector'
import Particle from './Particle'
import ParticleSystem from './ParticleSystem'

// require.config({
//   deps: ['vendor/Events', 'vendor/lodash', 'vendor/dat.gui.min'],
// })

// require(
//   [
//     'lib/ParticleSystem',
//     'lib/Display',
//     'lib/Vector',
//     'gui',
//   ],
//   (ParticleSystem, Display, Vector, GUI) => {
//     'use strict'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
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
