import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import * as THREE from 'three'
import { Pane } from 'tweakpane'
import { WhiteBlackOutlineLogo } from '~/composables/Base64Logos'
import heavenly from '~~/assets/heavenly.typeface.json?url'

THREE.Cache.enabled = true
let container

let camera, cameraTarget, scene, renderer

let group, textMesh1, textMesh2, textGeo, materials

let firstLetter = true

let text = 'three.js'

let bevelEnabled = true

let font

let fontWeight = 'bold' // normal bold

const height = 20
const size = 10
const hover = 30

const curveSegments = 20

const bevelThickness = 2
const bevelSize = 1.5

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

const windowHalfX = window.innerWidth / 2

let fontIndex = 1
export const useFont = ({ scene, camera, renderer }) => {
  // a
  // SCENE

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

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF, opacity: 0.5, transparent: true }),
  )
  plane.position.y = 0
  plane.rotation.x = -Math.PI / 2
  scene.add(plane)

  // RENDERER

  // EVENTS

  // container.style.touchAction = 'none'
  // container.addEventListener('pointerdown', onPointerDown)

  // document.addEventListener('keypress', onDocumentKeyPress)
  // document.addEventListener('keydown', onDocumentKeyDown)

  //

  const params = {
    changeColor() {
      pointLight.color.setHSL(Math.random(), 1, 0.5)
    },
    changeFont() {
      fontIndex++

      fontName = reverseFontMap[fontIndex % reverseFontMap.length]

      loadFont()
    },
    changeWeight() {
      if (fontWeight === 'bold')

        fontWeight = 'regular'

						 else

        fontWeight = 'bold'

      loadFont()
    },
    changeBevel() {
      bevelEnabled = !bevelEnabled

      refreshText()
    },
  }

  //

  //

  //

  function onDocumentKeyDown(event) {
    if (firstLetter) {
      firstLetter = false
      text = ''
    }

    const keyCode = event.keyCode

    // backspace

    if (keyCode == 8) {
      event.preventDefault()

      text = text.substring(0, text.length - 1)
      refreshText()

      return false
    }
  }

  function onDocumentKeyPress(event) {
    const keyCode = event.which

    // backspace

    if (keyCode == 8) {
      event.preventDefault()
    }
    else {
      const ch = String.fromCharCode(keyCode)
      text += ch

      refreshText()
    }
  }

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

      size,
      height,
      curveSegments,

      bevelThickness,
      bevelSize,
      bevelEnabled,

    })

    textGeo.computeBoundingBox()

    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)

    textMesh1 = new THREE.Mesh(textGeo, materials)

    textMesh1.position.x = centerOffset
    textMesh1.position.y = 0
    textMesh1.position.z = 0

    // textMesh1.rotation.x = 0
    // textMesh1.rotation.y = Math.PI * 2

    group.add(textMesh1)

    if (mirror) {
      textMesh2 = new THREE.Mesh(textGeo, materials)

      textMesh2.position.x = centerOffset
      textMesh2.position.y = -hover
      textMesh2.position.z = height

      textMesh2.rotation.x = Math.PI
      textMesh2.rotation.y = Math.PI * 2

      group.add(textMesh2)
    }
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
