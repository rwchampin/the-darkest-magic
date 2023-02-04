<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { Utils } from '~/utils'
import { useCore } from '~/composables/useCore'
const nuxtApp = useNuxtApp()

const plane = usePlane()
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2() },
        uMouse: { value: new THREE.Vector2() },
        uTexture: { value: new THREE.TextureLoader().load('/textures/texture.png') },
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
</script>

<template>
    <div class="page--worley-noise">
        <h1>Worley Noise</h1>
    </div>
</template>
