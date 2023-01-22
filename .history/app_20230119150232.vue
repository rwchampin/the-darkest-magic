<script setup>
import Naive from 'naive-ui'
import gsap from 'gsap'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js'
import { createNoise3D } from 'simplex-noise'
import { useFont } from '~/composables/useFont.js'
import logo from '~/assets/models/beyonce.glb?url'
import { BlackGooBallMaterial } from '~materials/BlackGooBall.js'
import useCore from '~composables/useCore.ts'
import { Effects } from '~/utils/Effects'
const noise = createNoise3D(Math.random)
let stats, planet, scene, camera, renderer, ambientLight, pointLight, directionalLight, rectAreaLight, spotLight, hemisphereLight
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(Naive)
const canvas2d = ref(null)
const canvas3d = ref(null)
const clock = new THREE.Clock()
// const mode = nuxtApp.$colorMode.preference
THREE.Cache.enabled = true
useHead({
  title: 'RYAN THE DEVELOPER',
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/favicon.ico',
    },
  ],
  script: [
    { children: ' SUPERGLOBAL = {core: {}, gui:{}}' },

    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js',
      ssr: false,
      type: 'module',
    },

    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js',
      ssr: false,

    },
  ],
})

const draggable = ref(null)
const { getDebugMode } = nuxtApp.$appStore

const gradientMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2() },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec2 u_resolution;
    uniform float u_time;
    varying vec2 vUv;
    void main() {
      vec2 st = gl_FragCoord.xy/u_resolution;
      vec3 color = vec3(0.0);
      color.r = sin(st.x * 10.0 + u_time);
      color.g = cos(st.y * 10.0 + u_time);
      color.b = sin(st.x * 10.0 + u_time);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
})
function buildWallOfCubes() {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = gradientMaterial
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(i * 2, j * 2, k * 2)
        scene.add(cube)
      }
    }
  }
}
onMounted(() => {
  nextTick(() => {
    gsap.to('.canvas-ui', {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    })

    stats = new Stats()
    useFont()
    // starlight = useBlackEnergy(nuxtApp).starlight
    stats.showPanel(0)
    document.body.appendChild(stats.dom)
    stats.dom.style.position = 'fixed'
    stats.dom.style.top = '0px'
    stats.dom.style.left = '0px'
    stats.dom.style.zIndex = '8000'
    stats.dom.style.width = 350
    const c = document.querySelector('.main-canvas-2d')
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true })

    const animate = () => {
      stats.update()
      const t = clock.getDelta()
      gradientMaterial.uniforms.u_time.value += t
      gradientMaterial.uniforms.u_resolution.value.x = new THREE.Vector2(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)
    }

    camera.position.set(0, 0, -20)
    const loader = new GLTFLoader()
    function fillWithPoints(geometry, count) {
      const dummyTarget = new THREE.Vector3() // to prevent logging of warnings from ray.at() method

      const ray = new THREE.Ray()

      const size = new THREE.Vector3()
      geometry.computeBoundingBox()
      const bbox = geometry.boundingBox

      const points = []

      const dir = new THREE.Vector3(1, 1, 1).normalize()
      /* for (let i = 0; i < count; i++) {
        let p = setRandomVector(bbox.min, bbox.max);
        points.push(p);
      } */
      let counter = 0
      while (counter < count) {
        const v = new THREE.Vector3(
          THREE.MathUtils.randFloat(bbox.min.x, bbox.max.x),
          THREE.MathUtils.randFloat(bbox.min.y, bbox.max.y),
          THREE.MathUtils.randFloat(bbox.min.z, bbox.max.z),
        )
        if (isInside(v)) {
          points.push(v)
          counter++
        }
      }

      /* function setRandomVector(min, max){
        let v = new THREE.Vector3(
          THREE.Math.randFloat(min.x, max.x),
          THREE.Math.randFloat(min.y, max.y),
          THREE.Math.randFloat(min.z, max.z)
        );
        if (!isInside(v)){return setRandomVector(min, max);}
        return v;
      } */

      function isInside(v) {
        ray.set(v, dir)
        let counter = 0

        const pos = geometry.attributes.position
        const faces = pos.count / 3
        // console.log(faces);
        const vA = new THREE.Vector3()
        const vB = new THREE.Vector3()
        const vC = new THREE.Vector3()
        for (let i = 0; i < faces; i++) {
          vA.fromBufferAttribute(pos, i * 3 + 0)
          vB.fromBufferAttribute(pos, i * 3 + 1)
          vC.fromBufferAttribute(pos, i * 3 + 2)
          if (ray.intersectTriangle(vA, vB, vC, false, dummyTarget))
            counter++
        }

        return counter % 2 === 1
      }
      console.log(points.length)
      const pts = new THREE.BufferGeometry().setFromPoints(points)
      return pts
      debugger
    }

    loader.load(logo, (gltf) => {
      const model = gltf.scene.children[0]
      model.position.set(0, 0, 0.2)
      model.scale.set(0.03, 0.03, 0.03)
      // model.rotation.x = THREE.MathUtils.degToRad(18)
      debugger
      // points attribute from wPos
      const points = fillWithPoints(model.geometry, 10000)
      // const material = new THREE.PointsMaterial({ color: 0xFF0000, size: 0.001 })
      // const particles = new THREE.Points(points, material)
      // particles.position.set(0, 0, 0)
      // scene.add(particles)
      scene.add(model)
    })

    ambientLight = useCore(nuxtApp).ambientLight
    pointLight = useCore(nuxtApp).pointLight
    spotLight = useCore(nuxtApp).spotLight
    hemisphereLight = useCore(nuxtApp).hemisphereLight

    // const sgeometry = new THREE.SphereGeometry(15, 100, 100)
    // const smaterial = new THREE.MeshBasicMaterial({ color: 0x000055 })
    // const sphere = new THREE.Mesh(sgeometry, smaterial)
    // sphere.position.set(0, 0, 0)
    // scene.add(sphere)

    // camera.position.set(0, 0, 1)
    // camera.lookAt(0, 0, 0)

    // const material = new THREE.MeshBasicMaterial({ color: 0x8B0800, side: THREE.DoubleSide })
    // const g = new THREE.PlaneGeometry(2, 2, 100, 100)
    // const mesh = new THREE.Mesh(g, material)
    // mesh.position.set(0, 0, 0)
    // mesh.rotation.x = THREE.MathUtils.degToRad(-90)
    function mouseMe() {
      const planeg = new THREE.PlaneGeometry(2, 2, 100, 100)
      const pmaterial = new THREE.MeshBasicMaterial({ color: 0x8B0800, side: THREE.DoubleSide })
      const plane = new THREE.Mesh(planeg, pmaterial)
      plane.position.set(0, 0, 0)
      plane.rotation.x = THREE.MathUtils.degToRad(-90)
    }
    mouseMe()
    const controls = new OrbitControls(camera, renderer.domElement)

    const mousePointLight = new THREE.PointLight(0xFF0000, 100, 100)
    mousePointLight.position.set(0, 0, 10)
    scene.add(ambientLight, camera, pointLight, spotLight, mousePointLight)

    gsap.ticker.add(() => {
      animate()
    })
  })
})
</script>

<template>
  <TheFloatingMenu />
  <Teleport to="body">
    <canvas ref="canvas2d" class="canvas-ui main-canvas-2d" />
    <canvas ref="canvas3d" class="canvas-ui main-canvas-3d" />
  </Teleport>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <LazyTheDebugger v-if="getDebugMode" />

      <ClientOnly>
        <!-- <TheDarkScrollbar /> -->

        <TheContent />
      </ClientOnly>
    </div>
  </div>
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
