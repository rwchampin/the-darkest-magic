import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { WhiteBlackOutlineLogo } from '~/composables/Base64Logos'
import heavenly from '~~/assets/heavenly.typeface.json?url'

export const useFont = () => {
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

  return {
    textMesh1,
  }
}
