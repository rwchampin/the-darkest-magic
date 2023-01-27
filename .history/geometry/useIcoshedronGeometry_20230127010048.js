import * as THREE from 'three'

export default function useIcosahedronGeometry(radius, detail) {
  const geometry = new THREE.IcosahedronGeometry(radius, detail)
  return geometry
}
