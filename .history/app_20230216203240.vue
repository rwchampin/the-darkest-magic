<script setup>
import * as THREE from 'three'
import Naive from 'naive-ui'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import MagicMouse from './core/MagicMouse'
import { updatePropertySignature } from 'typescript'
import Resources from '~/core/Resources'
// import { useRoom } from '~/composables/useRoom'
import { useMagicKeyRegistration } from '~/composables/useMagicKeyRegistration'
// import { usePoints } from '~/composables/usePoints.js'
// import { useDarkLightSphere } from '~/composables/useDarkLightSphere.js'
import dotTexture from '~/assets/particles/dotTexture.png?url'

import { useCore } from '~~/composables/useCore'

let scene, camera, renderer, updateParticles, updateLightSphere
/*********************************
  * GLOBAL COMPONENTS
*********************************/
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.config.devtools = true
/**************************
 * GLOBAL Vars
 *************************/
const debugMode = nuxtApp.$appStore.getDebugMode

/*********************************
** FUCK START
*********************************/
const b = () => {
  const sphereGeometry = new THREE.BufferGeometry()
  const clock = new THREE.Clock()
  clock.getDelta()
  function mapRange(value, a, b, c, d) {
    value = (value - a) / (b - a)
    return c + value * (d - c)
  }
  const radius = 10
  const rand = () => Math.random() * 2 - 1
  const originalVertex = new THREE.Vector3(radius, rand(), rand())
  const vectors = []
  const vertices = []
  const sizes = []
  const particlesDelay = 50
  for (let i = 0; i < 100; i++) {
    const vertex = originalVertex.clone()
    vertex.rotationAxis = new THREE.Vector3(0, Math.random() * 2 - 1, Math.random() * 2 - 1)
    vertex.rotationAxis.normalize()
    vertex.delay = Date.now() + (particlesDelay * Math.random() * i)
    vertex.angle = 0

    vectors.push(vertex)
    vertices.push(vertex.x, vertex.y, vertex.z)
    sizes.push(Math.random() * 1.5)
  }

  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))

  geo.setDrawRange(0, verts.length / 3)

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0x000000) },
      pointTexture: { value: new THREE.TextureLoader().load(dotTexture) },
    },
    vertexShader: `
           attribute float size;
			attribute vec3 customColor;

			varying vec3 vColor;

			void main() {

				vColor = customColor;

				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

				gl_PointSize = size * ( 300.0 / -mvPosition.z );

				gl_Position = projectionMatrix * mvPosition;

			}

        `,
    fragmentShader: `
            uniform vec3 color;
			uniform sampler2D pointTexture;

			varying vec3 vColor;

			void main() {

				gl_FragColor = vec4( color * vColor, 1.0 );
				gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

			}
        `,
    sizeAttenuation: true,
    depthTest: false,
    transparent: true,
    vertexColors: true,
    // map: texture
  })

  const pts = new THREE.Points(geo, shaderMaterial)

  const positionAttribute = geo.getAttribute('position')
  positionAttribute.setUsage(THREE.DynamicDrawUsage)
  scene.add(pts)

  function udatepts() {
    const g = pts.geometry.getAttribute('position')
    for (let i = 0; i < g.count; i++) {
      const c = clock.getDelta()
      const v1 = new THREE.Vector3(g.array[i], g.array[i + 1], g.array[i + 2])
      v1.lerp(new THREE.Vector3(Math.random(), Math.random(), Math.random()), THREE.MathUtils.clamp(c, 0, Math.PI * 2))
      g.array[i] += v1.x * 0.11
      g.array[i + 1] += v1.y * 0.11
      g.array[i + 2] += v1.z * 0.11
    }
    pts.geometry.attributes.position.needsUpdate = true
  }

  gsap.ticker.add(() => {
    udatepts()
  })
}
/*********************************
** FUCK END
*********************************/

const init = () => {
  /*********************************
  ** Create core variables
  *********************************/
  ({ scene, camera, renderer } = useCore())
  camera.position.set(0, 0, 10)
  camera.lookAt(0, 0, 0)
  camera.updateProjectionMatrix()
  const axesHelper = new THREE.AxesHelper(500)
  scene.add(axesHelper)

  // const magicMouse = new MagicMouse({ scene, camera, renderer })

  // updateParticles = usePoints({ scene, camera, renderer, nuxtApp })
  // useDarkLightSphere({ scene, camera, renderer })
  b()
  const controls = new OrbitControls(camera, renderer.domElement)
  // controls.addEventListener('change', (r) => {
  //   debugger
  // })
  // // debugger
  gsap.ticker.add((time, deltaTime, frame) => {
    // if (updateParticles)
    //   updateParticles()

    // if (updateLightSphere)
    // updateLightSphere()

    renderer.render(scene, camera)
  })

  /*********************************
  ** UNIMPORTANT SHIT
  *********************************/
  useMagicKeyRegistration()
}

/*********************************
** RESOURCES
*********************************/
// const resources = new Resources({ nuxtApp, debugMode, appStore: nuxtApp.$appStore })
// resources.on('assets:progress:complete', (resources) => {
//   init()
// })
onMounted(() => {
  init()
})
/**************************
   * GLOBAL PROVIDES
   *************************/
nuxtApp.vueApp.provide('debugMode', debugMode)
nuxtApp.vueApp.use(Naive)
</script>

<template>
  <Teleport to="body">
    <canvas class="canvas-ui main-canvas-3d" />
  </Teleport>
  <n-message-provider>
    <ClientOnly>
      <TheProvider>
        <div id="cursor" />
        <TheFloatingMenu />
        <TheDarkScrollbar />

        <div id="smooth-wrapper">
          <div id="smooth-content">
            <h1>stuff</h1>
            <TheContent>
              <NuxtLayout />
            </TheContent>
          </div>
        </div>

        <TheDebugger v-if="debugMode" />
      </TheProvider>
    </ClientOnly>
</n-message-provider>
</template>

<style scoped>
.main-canvas-3d,
#canvas-container {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 99 !important;
  background-color: transparent !important;
}

html,
body,
#__nuxt {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
