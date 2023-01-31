import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import * as THREE from 'three'
import { Pane } from 'tweakpane'
import gsap from 'gsap'
import heavenly from '~~/assets/heavenly.typeface.json?url'

let group, textMesh1, textMesh2, textGeo, materials

const firstLetter = true

const text = 'Ryan'
const the = 'the'
const devloper = 'Developer'

const bevelEnabled = true

let font

const fontWeight = 'bold' // normal bold

const height = 20
const size = 0.1

const curveSegments = 0.5

const bevelThickness = 0.2
const bevelSize = 0.5

const mirror = true

const fontMap = {

  'helvetiker': 0,
  'optimer': 1,
  'gentilis': 2,
  'droid/droid_sans': 3,
  'droid/droid_serif': 4,

}

const weightMap = {

  regular: 0,
  bold: 1,

}

const reverseFontMap = []
const reverseWeightMap = []

for (const i in fontMap) reverseFontMap[fontMap[i]] = i
for (const i in weightMap) reverseWeightMap[weightMap[i]] = i

const targetRotation = 0
const targetRotationOnPointerDown = 0

const pointerX = 0
const pointerXOnPointerDown = 0

const fontIndex = 1
export const useFont = ({ scene, camera, renderer }) => {
  // a
  // SCENE

  const windowHalfX = window.innerWidth / 2

  scene.background = new THREE.Color(0x555555)
  scene.fog = new THREE.Fog(0xFFFFFF, 1, 100)

  // LIGHTS

  const dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.125)
  dirLight.position.set(0, 0, 1).normalize()
  scene.add(dirLight)

  const pointLight = new THREE.PointLight(0xFFFFFF, 1.5)
  pointLight.color.setHSL(Math.random(), 1, 0.5)
  pointLight.position.set(0, 0, 0)
  scene.add(pointLight)

  materials = [
    new THREE.MeshPhongMaterial({ color: 0xFFFFFF, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: 0xFFFFFF }), // side
  ]

  group = new THREE.Group()
  group.position.y = 0

  scene.add(group)

  loadFont()

  // RENDERER

  // EVENTS

  // container.style.touchAction = 'none'
  // container.addEventListener('pointerdown', onPointerDown)

  // document.addEventListener('keypress', onDocumentKeyPress)
  // document.addEventListener('keydown', onDocumentKeyDown)

  //

  //

  //

  //

  function loadFont() {
    const loader = new FontLoader()
    loader.load(heavenly, (response) => {
      font = response

      refreshText()
    })
  }

  function createText() {
    textGeo = new TextGeometry(text, {
      font,
      size: 10,
      height: 5,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 5,
    })

    textGeo.computeBoundingBox()

    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)

    textMesh1 = new THREE.Mesh(textGeo, new THREE.MeshBasicMaterial({ color: 0x000000 }))

    textMesh1.position.x = 0
    textMesh1.position.y = 0
    textMesh1.position.z = 0

    textMesh1.rotation.x = 0
    textMesh1.rotation.y = Math.PI * 2

    group.add(textMesh1)

    // if (mirror) {
    //   textMesh2 = new THREE.Mesh(textGeo, materials)

    //   textMesh2.position.x = centerOffset
    //   textMesh2.position.y = -hover
    //   textMesh2.position.z = height

    //   textMesh2.rotation.x = Math.PI
    //   textMesh2.rotation.y = Math.PI * 2

    // group.add(textMesh2)
    // }
  }

  function refreshText() {
    group.remove(textMesh1)
    if (mirror)
      group.remove(textMesh2)

    if (!text)
      return

    createText()
  }

  //

  function renderText() {
    // group.rotation.y += (targetRotation - group.rotation.y) * 0.05

    camera.lookAt(0, 0, 0)

    renderer.clear()
    renderer.render(scene, camera)
  }

  gsap.ticker.add(renderText)
}
