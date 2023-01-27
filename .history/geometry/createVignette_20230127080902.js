import * as THREE from 'three'
import { usePlane } from '~/geometry/usePlane.js'
import { VignetteMaterial } from '~/materials/VignetteMaterial.js'

export const createVignette = () => {
  const plane = usePlane()
  const material = VignetteMaterial

  return new THREE.Mesh(plane, material)
}
