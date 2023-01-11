<script setup lang="ts">
import * as THREE from 'three'
import gsap from 'gsap'

type Theme = 'dark' | 'light'

function setColorTheme(newTheme: Theme) {
  useColorMode().preference = newTheme
}

const { to } = gsap

const width = 108
const height = 68

const backgroundColor = '#F4F4F8'
const dotColor = '#AAAAB7'
const activeColor = '#36363C'

onMounted(() => {
  document.querySelectorAll('.switch').forEach((toggle) => {
    const canvas = toggle.querySelector('canvas')
    const input = toggle.querySelector('input')
    let mouseX = 0
    let mouseY = 0
    const renderer = new THREE.WebGLRenderer({
      canvas,
      context: canvas.getContext('webgl2'),
      antialias: true,
      alpha: true,
    })

    canvas.style.width = width
    canvas.style.height = height

    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio || 1)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)

    camera.position.z = 120

    const rectangle = new THREE.Shape()
    roundedRect(rectangle, -36, -20, 72, 40, 20)

    const backgroundShape = new THREE.ExtrudeGeometry(rectangle, {
      curveSegments: 20,
      depth: 2,
      bevelEnabled: true,
      bevelSegments: 20,
      steps: 12,
      bevelSize: 6,
      bevelThickness: 6,
    })

    const background = new THREE.Mesh(backgroundShape, new THREE.MeshPhongMaterial({
      color: new THREE.Color(backgroundColor),
      shininess: 40,
    }))
    background.receiveShadow = true

    scene.add(background)

    const dotShape = new THREE.SphereGeometry(14, 32, 32)

    const sphere = new THREE.Mesh(dotShape, new THREE.MeshPhongMaterial({
      color: new THREE.Color(dotColor),
      shininess: 10,
    }))
    sphere.castShadow = true

    scene.add(sphere)

    dotShape.translate(-16, 0, 24)
    sphere.scale.set(0.8, 0.8, 0.8)

    scene.add(directionLight(0.1, 0, 0, 100))
    scene.add(directionLight(0.9, 0, 80, 30))
    scene.add(directionLight(0.2, 0, -80, 60))
    scene.add(directionLight(0.3, -120, -120, -1))
    scene.add(directionLight(0.3, 120, -120, -1))

    scene.add(new THREE.AmbientLight(0x626267))

    renderer.domElement.addEventListener('pointermove', (e) => {
      mouseX = (e.clientX - e.target.getBoundingClientRect().left - e.target.offsetWidth / 2) * -0.8
      mouseY = (e.clientY - e.target.getBoundingClientRect().top - e.target.offsetHeight / 2) * -0.8
    }, false)

    renderer.domElement.addEventListener('pointerleave', (e) => {
      mouseX = 0
      mouseY = 0
    }, false)

    renderer.domElement.addEventListener('pointerdown', (e) => {
      to(background.position, {
        z: -4,
        duration: 0.15,
      })
    })

    renderer.domElement.addEventListener('pointerup', (e) => {
      to(background.position, {
        z: 0,
        duration: 0.15,
      })
    })

    input.addEventListener('change', (e) => {
      setColorTheme(useColorMode().preference === 'dark' ? 'light' : 'dark')
      if (input.checked) {
        to(sphere.scale, {
          x: 0.9,
          y: 0.9,
          z: 0.9,
          duration: 0.6,
          ease: 'elastic.out(1, .75)',
        })
        to(sphere.position, {
          x: 26,
          z: 4,
          duration: 0.6,
          ease: 'elastic.out(1, .75)',
        })
        const newColor = new THREE.Color(activeColor)
        to(sphere.material.color, {
          r: newColor.r,
          g: newColor.g,
          b: newColor.b,
          duration: 0.3,
        })
        return
      }
      to(sphere.scale, {
        x: 0.8,
        y: 0.8,
        z: 0.8,
        duration: 0.6,
        ease: 'elastic.out(1, .75)',
      })
      to(sphere.position, {
        x: 0,
        z: 0,
        duration: 0.6,
        ease: 'elastic.out(1, .75)',
      })
      const newColor = new THREE.Color(dotColor)
      to(sphere.material.color, {
        r: newColor.r,
        g: newColor.g,
        b: newColor.b,
        duration: 0.3,
      })
    })

    const render = () => {
      requestAnimationFrame(render)

      camera.position.x += (mouseX - camera.position.x) * 0.25
      camera.position.y += (-mouseY - camera.position.y) * 0.25

      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    render()
  })

  function roundedRect(ctx, x, y, width, height, radius) {
    ctx.moveTo(x, y + radius)
    ctx.lineTo(x, y + height - radius)
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
    ctx.lineTo(x + width - radius, y + height)
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
    ctx.lineTo(x + width, y + radius)
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
    ctx.lineTo(x + radius, y)
    ctx.quadraticCurveTo(x, y, x, y + radius)
  }

  function directionLight(opacity, x, y, z, color = 0xFFFFFF) {
    const light = new THREE.DirectionalLight(color, opacity)
    light.position.set(x, y, z)
    light.castShadow = true

    const d = 4000
    light.shadow.camera.left = -d
    light.shadow.camera.right = d
    light.shadow.camera.top = d * 0.25
    light.shadow.camera.bottom = -d

    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.height = 1024

    return light
  }
})
</script>

<template>
  <label class="switch">
    <input type="checkbox">
    <canvas />
  </label>
</template>

<style scoped>
.switch {
    display: block;
    cursor: pointer;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5)) drop-shadow(0 4px 24px rgba(0, 0, 0, 0.4));
}

.switch input {
    display: none;
}

.switch canvas {
    display: block;
    margin: -16px -26px;
}
</style>
