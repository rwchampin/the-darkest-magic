<script setup>
import Naive from 'naive-ui'
import gsap from 'gsap'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { useFont } from '~/composables/useFont.js'

import logo from '~/assets/models/tits.glb?url'
import { BlackGooBallMaterial } from '~materials/BlackGooBall.js'
import useCore from '~composables/useCore.ts'
import { Effects } from '~/utils/Effects'

let stats, planet, scene, camera, renderer, ambientLight, pointLight, directionalLight, rectAreaLight, spotLight, hemisphereLight
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(Naive)
const canvas2d = ref(null)
const canvas3d = ref(null)
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

const animate = () => {
  stats.update()
  renderer.render(scene, camera)
}

onMounted(() => {
  nextTick(() => {
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
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true })
    // camera = useCore(nuxtApp).camera
    // scene = useCore(nuxtApp).scene
    // renderer = useCore(nuxtApp).renderer

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
      const model = gltf.scene
      model.position.set(0, 0, 0.2)
      model.scale.set(0.03, 0.03, 0.03)
      model.rotation.x = THREE.MathUtils.degToRad(18)
      model.children.map((letter) => {
        const gp = letter.geometry.attributes.position
        const wPos = []
        for (let i = 0; i < gp.count; i++) {
          const p = new THREE.Vector3().fromBufferAttribute(gp, i) // set p from `position`
          letter.localToWorld(p) // p has wordl coords
          wPos.push(p)
        }
      })
      // points attribute from wPos
      const points = fillWithPoints(model.children[0].geometry, 10000)
      const material = new THREE.PointsMaterial({ color: 0xFF0000, size: 0.001 })
      const particles = new THREE.Points(points, material)
      particles.position.set(0, 0, 0)
      scene.add(particles)
      scene.add(model)
    })

    ambientLight = useCore(nuxtApp).ambientLight
    pointLight = useCore(nuxtApp).pointLight
    spotLight = useCore(nuxtApp).spotLight
    hemisphereLight = useCore(nuxtApp).hemisphereLight

    const sgeometry = new THREE.SphereGeometry(15, 100, 100)
    const smaterial = new THREE.MeshBasicMaterial({ color: 0x000055 })
    const sphere = new THREE.Mesh(sgeometry, smaterial)
    sphere.position.set(0, 0, 0)
    scene.add(sphere)
    // const { planet, stars } = useBlackEnergy(nuxtApp)
    camera.position.set(0, 0, 1)
    camera.lookAt(0, 0, 0)
    // const { material, uniforms } = Effects.createWobblyMaterial()
    const material = new THREE.MeshBasicMaterial({ color: 0x8B0800, side: THREE.DoubleSide })
    const g = new THREE.PlaneGeometry(2, 2, 100, 100)
    const mesh = new THREE.Mesh(g, material)
    mesh.position.set(0, 0, 0)
    // mesh.rotation.x = THREE.MathUtils.degToRad(-90)

    const controls = new OrbitControls(camera, renderer.domElement)

    sphere.position.set(0, 0, 0)

    const mousePointLight = new THREE.PointLight(0xFF0000, 100, 100)
    mousePointLight.position.set(0, 0, 10)
    scene.add(ambientLight, camera, pointLight, spotLight, mousePointLight)

    gsap.ticker.add(() => {
      animate()
    })
  })
})

// onMounted(() => {
//   const script = document.createElement('script')
//   script.type = 'text/javascript'
//   script.src = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js'
//   document.head.appendChild(script)

//   const experience = new Experience({
//     targetElement: document.querySelector('.main-canvas-3d'),
//     ctx: document.querySelector('.main-canvas-2d'),
//   })

//   const canvas = experience.canvas2d
//   const ctx = experience.ctx

//   const display = new Display(canvas)
//   display.init()
//   const particleSystem = new ParticleSystem().init(display)
//   display.start()

//   // const gui = new GUI(particleSystem, display)

//   particleSystem.addEmitter(new Vector(360, 230), Vector.fromAngle(0, 2))
//   particleSystem.addField(new Vector(700, 230), -140)
//   particleSystem.addNewParticles()
//   function resize() {
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
//   }
//   window.addEventListener('resize', resize); resize()

//   const mouse = useMagicMouse({ experience })
//   gsap.to('.canvas-ui', {
//     opacity: 1,
//     duration: 1,
//     ease: 'power2.out',
//   })
// })
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
