import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import * as THREE from 'three'
import { Utils } from '~/utils'

import heavenly from '~~/assets/heavenly.typeface.json?url'

let group, textMesh1, textGeo, materials

const text = 'Ryan'

const bevelEnabled = true

let font

const height = 20
const size = 0.1

const curveSegments = 0.5

const bevelThickness = 0.2
const bevelSize = 0.5

function loadFont() {
  const loader = new FontLoader()
  loader.load(heavenly, (response) => {
    font = response

    createText()
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

  // const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)

  textMesh1 = new THREE.Mesh(textGeo, materials)

  textMesh1.position.x = 0
  textMesh1.position.y = 0
  textMesh1.position.z = 0
}

export const useFont = ({ scene, camera, renderer }) => {
  // a
  // SCENE
  onMounted(() => {
    const pane = Utils.tweakpane.get()
    pane.addFolder('Font')

    // LIGHTS

    const dirLight = new THREE.DirectionalLight(0xFF0000, 0.125)
    dirLight.position.set(0, 10, 0).normalize()
    dirLight.target.position.set(0, 0, 0)
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

    scene.add(group)

    loadFont()
  })
}
