/* global require, dat */
import ParticleSystem from './lib/ParticleSystem'
import Display from './lib/Display'
import Vector from './lib/Vector'

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
export default function main({ renderer }) {
  const ctx = renderer.getContext()

  const display = new Display(document.querySelector('.main-canvas-2d'))
  display.init()
  const particleSystem = new ParticleSystem().init(display)
  display.start()

  // const gui = new GUI(particleSystem, display)

  particleSystem.addEmitter(new Vector(360, 230), Vector.fromAngle(0, 2))
  particleSystem.addField(new Vector(700, 230), -140)
}
