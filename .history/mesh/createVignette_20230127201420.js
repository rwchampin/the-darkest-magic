import * as THREE from 'three'
import usePlane from '~/geometry/usePlane'
import VignetteMaterial from '~/materials/VignetteMaterial'

export const createVignette = () => {
  const plane = new THREE.PlaneGeometry(1, 1, 1, 1)
  const material = VignetteMaterial

  return new THREE.Mesh(plane, material)
}
