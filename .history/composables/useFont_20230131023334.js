import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import * as THREE from 'three'
import { Utils } from '~/utils'

import heavenly from '~~/assets/heavenly.typeface.json?url'

const group = new THREE.Group()
const word = 'Ryan'

const bevelEnabled = true
let text
let font

const height = 20
const size = 33

const curveSegments = 0.5

const bevelThickness = 0.2
const bevelSize = 0.5

function loadFont() {
  const loader = new FontLoader()
  loader.load(heavenly, (response) => {
    font = response
  })
  createText()
}
function createLights() {
  const dirLight = new THREE.DirectionalLight(0xFF0000, 0.125)
  dirLight.position.set(0, 10, 0).normalize()
  dirLight.target.position.set(0, 0, 0)

  const pointLight = new THREE.PointLight(0xFFFFFF, 1.5)
  pointLight.color.setHSL(Math.random(), 1, 0.5)
  pointLight.position.set(0, 0, 0)

  group.add(dirLight, pointLight)
}
function createText() {
  const textGeo = new TextGeometry(word, {

    font,

    size,
    height,
    curveSegments,

    bevelThickness,
    bevelSize,
    bevelEnabled,

  })

  textGeo.computeBoundingBox()

  // const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)
  const material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, flatShading: true }) // front

  const text = new THREE.Mesh(textGeo, material)

  text.position.x = 0
  text.position.y = 0
  text.position.z = 0

  group.add(text)
}

export const useFont = () => {
  // // TWEAKPANE
  // const pane = Utils.tweakpane.get()
  // pane.addFolder('Font')

  createLights()
  loadFont()

  return group
}
