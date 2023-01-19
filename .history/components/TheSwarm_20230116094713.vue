<script setup>
import Experience from '~~/core/Experience'
import noise from '~/assets/libs/perlin.js'
import Vector2 from '~/assets/libs/vector2.js'
import ParticleSystem from '~/particles/swarm/ParticleSystem.js'
import Particle from '~~/particles/swarm/Particle'
import Config from '~~/particles/swarm/Config'
import Canvas from '~~/particles/swarm/Canvas'

let experience, p
const PI = Math.PI
const TAU = PI * 2
const HALF_PI = PI * 0.5
const RAND = Math.random
const ROUND = Math.round
const SIN = Math.sin
const COS = Math.cos
const ABS = Math.abs
const POW = Math.pow
const lib = {
  v2: Vector2,
  noise,

}

window.requestAnimationFrame = (() => {
  return (
    window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function (callback) {
          window.setTimeout(callback, 1000 / 60)
        }
  )
})()

onMounted(() => {
  const c3 = document.querySelector('.main-canvas-3d')
  const c2 = document.querySelector('.main-canvas-2d')
  experience = new Experience({
    targetElement: c3,
    ctx: c2,
  })
  debugger
  p = new ParticleSystem()
})
</script>

<template />

