<script setup>
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { WhiteBlackOutlineLogo } from '~/composables/Base64Logos'
import heavenly from '~~/assets/heavenly.typeface.json?url'
let textGeo
const loader = new FontLoader()
const height = 20
const size = 70
const hover = 30

const curveSegments = 4

const bevelThickness = 2
const bevelSize = 1.5
loader.load(heavenly, (font) => {
  textGeo = new TextGeometry('Ryan', {
    font,
    size, // fontsize
    height, // extrusion
    curveSegments, // how smooth the text is
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
  })
  textGeo.computeBoundingBox()
  const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)
  const material = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,
    flatShading: true,
  })
  const textMesh1 = new THREE.Mesh(textGeo, material)

  textMesh1.position.x = centerOffset
  textMesh1.position.y = hover
  textMesh1.position.z = 0

  textMesh1.rotation.x = 0
  textMesh1.rotation.y = Math.PI * 2
})
</script>

<template>
  <!-- <img id="logo" :src="WhiteBlackOutlineLogo" alt="logo"> -->
  <!-- <TheSmokeBg /> -->
</template>

<style scoped>
#logo {
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 50%;
  z-index: 100;
}
</style>
<!-- const particles = Array.from({ length: 150 }, () => ({
  factor: THREE.MathUtils.randInt(20, 100),
  speed: THREE.MathUtils.randFloat(0.01, 1),
  xFactor: THREE.MathUtils.randFloatSpread(80),
  yFactor: THREE.MathUtils.randFloatSpread(40),
  zFactor: THREE.MathUtils.randFloatSpread(40),
}))

const geometry = new THREE.BufferGeometry()
const positions = new Float32Array(particles.length * 3)
const colors = new Float32Array(particles.length * 3)
const sizes = new Float32Array(particles.length)

particles.forEach((particle, i) => {
  const i3 = i * 3
  positions[i3] = particle.xFactor
  positions[i3 + 1] = particle.yFactor
  positions[i3 + 2] = particle.zFactor

  const color = new THREE.Color()
  color.setHSL(0.1 + 0.1 * (particle.factor / 100), 1.0, 0.5)
  colors[i3] = color.r
  colors[i3 + 1] = color.g
  colors[i3 + 2] = color.b

  sizes[i] = 10 * (particle.factor / 100)
})

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

const material = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Color(0xFFFFFF) },
  },
  vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = size * ( 300.0 / -mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
  fragmentShader: `
      uniform vec3 color;
      varying vec3 vColor;
      void main() {
        if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
        gl_FragColor = vec4( color * vColor, 1.0 );
      }
    `,
  blending: THREE.AdditiveBlending,
  depthTest: false,
  transparent: true,
})

const mesh = new THREE.Points(geometry, material)
mesh.castShadow = true
mesh.receiveShadow = true
scene.add(mesh) -->
