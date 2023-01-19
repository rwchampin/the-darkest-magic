import * as THREE from 'three'
import Utils from '~/utils/'

export const useCamera = () => {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5
  camera.position.y = 2

  return camera
}
