import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import * as THREE from 'three'
import { Pane } from 'tweakpane'
import { WhiteBlackOutlineLogo } from '~/composables/Base64Logos'
import heavenly from '~~/assets/heavenly.typeface.json?url'

THREE.Cache.enabled = true

let cameraTarget

let group, textMesh1, textMesh2, textGeo, materials

const firstLetter = true

const text = ['Ryan', 'the', 'Developer']
const textGeometry = []
const textMesh = []
const bevelEnabled = true

let font

const fontWeight = 'bold' // normal bold

const height = 20
const size = 0.1
const hover = 0.3

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

let targetRotation = 0
let targetRotationOnPointerDown = 0

let pointerX = 0
let pointerXOnPointerDown = 0

const fontIndex = 1
export const useFont = ({ scene, camera, renderer }) => {
  // a
  // SCENE

  const windowHalfX = window.innerWidth / 2

  // LIGHTS

  // const dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.125)
  // dirLight.position.set(0, 0, 1).normalize()
  // scene.add(dirLight)

  // const pointLight = new THREE.PointLight(0xFFFFFF, 1.5)
  // pointLight.color.setHSL(Math.random(), 1, 0.5)
  // pointLight.position.set(0, 0, 0)
  // scene.add(pointLight)

  materials = [
    new THREE.MeshPhongMaterial({ color: 0xFFFFFF, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: 0xFFFFFF }), // side
  ]

  group = new THREE.Group()
  group.position.y = 0

  // scene.add(group)

  loadFont()

  // const plane = new THREE.Mesh(
  //   new THREE.PlaneGeometry(10000, 10000),
  //   new THREE.MeshBasicMaterial({ color: 0xFFFFFF, opacity: 0.5, transparent: true }),
  // )
  // plane.position.y = 0
  // plane.rotation.x = -Math.PI / 2
  // scene.add(plane)

  // RENDERER

  // EVENTS

  // container.style.touchAction = 'none'
  // container.addEventListener('pointerdown', onPointerDown)

  // document.addEventListener('keypress', onDocumentKeyPress)
  // document.addEventListener('keydown', onDocumentKeyDown)

  //

  function loadFont() {
    const loader = new FontLoader()
    loader.load(heavenly, (response) => {
      font = response

      refreshText()
    })
  }

  function createText(word) {
    text.forEach((word) => {
      textGeo = new TextGeometry(word, {

        font,

        size,
        height,
        curveSegments,

        bevelThickness,
        bevelSize,
        bevelEnabled,

      })
      textGeo.computeBoundingBox()
      textGeometry.push(textGeo)
      textMesh.push(new THREE.Mesh(textGeo, materials[0]))
    })

    // const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)
  }

  function refreshText() {
    group.remove(textMesh1)
    if (mirror)
      group.remove(textMesh2)

    if (!text)
      return

    createText()
  }

  function onPointerDown(event) {
    if (event.isPrimary === false)
      return

    pointerXOnPointerDown = event.clientX - windowHalfX
    targetRotationOnPointerDown = targetRotation

    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)
  }

  function onPointerMove(event) {
    if (event.isPrimary === false)
      return

    pointerX = event.clientX - windowHalfX

    targetRotation = targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02
  }

  function onPointerUp() {
    if (event.isPrimary === false)
      return

    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerup', onPointerUp)
  }

  //

  function renderText() {
    group.rotation.y += (targetRotation - group.rotation.y) * 0.05

    camera.lookAt(cameraTarget)

    renderer.clear()
    renderer.render(scene, camera)
  }

  return renderText
}
