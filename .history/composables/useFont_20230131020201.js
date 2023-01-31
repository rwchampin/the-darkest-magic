import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import * as THREE from 'three'
import { Utils } from '~/utils'
import { WhiteBlackOutlineLogo } from '~/composables/Base64Logos'
import heavenly from '~~/assets/heavenly.typeface.json?url'

let cameraTarget

let group, textMesh1, textMesh2, textGeo, materials

const text = 'Ryan'
const the = 'the'
const devloper = 'Developer'

const bevelEnabled = true

let font

const height = 20
const size = 0.1

const curveSegments = 0.5

const bevelThickness = 0.2
const bevelSize = 0.5

export const useFont = ({ scene, camera, renderer }) => {
  // a
  // SCENE
  onMounted(() => {
    const pane = Utils.tweakpane.get()
    pane.addFolder('Font')
    const windowHalfX = window.innerWidth / 2

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
    group.position.y = 0

    scene.add(group)

    loadFont()
  })
}
