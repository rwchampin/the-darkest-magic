<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { inject } from 'vue'
import { Utils } from '~/utils'
import { useCore } from '~/composables/useCore'
const nuxtApp = useNuxtApp()
const debugMode = inject('debugMode')
const plane = usePlane()
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2() },
        uMouse: { value: new THREE.Vector2() },
        /// uTexture: { value: new THREE.TextureLoader().load('/textures/texture.png') },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform sampler2D uTexture;
        varying vec2 vUv;
        void main() {
            vec2 st = gl_FragCoord.xy / uResolution;
            vec2 mouse = uMouse / uResolution;
            vec3 color = texture2D(uTexture, vUv).rgb;
            float dist = distance(st, mouse);
            float alpha = smoothstep(0.02, 0.0, dist);
            gl_FragColor = vec4(color, alpha);
        }
  `,

})
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
const mesh = new THREE.Mesh(geometry, material)
mesh.scale.set(2, 2, 2)
scene.add(mesh)

const controls = new OrbitControls(camera, renderer.domElement)

const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

const onPointerMove = (event) => {
    if (event.isPrimary === false)
        return
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(plane)
    if (intersects.length > 0) {
        const point = intersects[0].point
        material.uniforms.uMouse.value.x = point.x
        material.uniforms.uMouse.value.y = point.y
    }

    if (debugMode) {
        console.log('mouse', mouse)
        console.log('raycaster', raycaster)
        console.log('intersects', intersects)
    }
}

const onPointerDown = (event) => {
    if (event.isPrimary === false)
        return
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(plane)
    if (intersects.length > 0) {
        const point = intersects[0].point
        material.uniforms.uMouse.value.x = point.x
        material.uniforms.uMouse.value.y = point.y
    }

    if (debugMode) {
        console.log('mouse', mouse)
        console.log('raycaster', raycaster)
        console.log('intersects', intersects)
    }
}

const onPointerUp = (event) => {
    if (event.isPrimary === false)
        return
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(plane)
    if (intersects.length > 0) {
        const point = intersects[0].point
        material.uniforms.uMouse.value.x = point.x
        material.uniforms.uMouse.value.y = point.y
    }

    if (debugMode) {
        console.log('mouse', mouse)
        console.log('raycaster', raycaster)
        console.log('intersects', intersects)
    }
}

const onPointerLeave = (event) => {
    if (event.isPrimary === false)
        return
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(plane)
    if (intersects.length > 0) {
        const point = intersects[0].point
        material.uniforms.uMouse.value.x = point.x
        material.uniforms.uMouse.value.y = point.y
    }

    if (debugMode) {
        console.log('mouse', mouse)
        console.log('raycaster', raycaster)
        console.log('intersects', intersects)
    }
}

window.addEventListener('pointermove', onPointerMove)
window.addEventListener('pointerdown', onPointerDown)
window.addEventListener('pointerup', onPointerUp)

const onResize = () => {
    material.uniforms.uResolution.value.x = window.innerWidth
    material.uniforms.uResolution.value.y = window.innerHeight
}

onResize()
window.addEventListener('resize', onResize)
</script>

<template>
    <div class="page--worley-noise">
        <h1>Worley Noise</h1>
    </div>
</template>
