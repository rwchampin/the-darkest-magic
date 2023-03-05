import * as THREE from 'three'

export function useIcosahedronGeometry(radius = 2, detail = 20) {
  const geometry = new THREE.IcosahedronGeometry(radius, detail)
  return geometry
}
