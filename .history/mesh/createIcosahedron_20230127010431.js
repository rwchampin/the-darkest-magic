import * as THREE from 'three'
import { useIcosahedronGeometry } from '~~/geometry'

export default function createIcosahedron(radius = 2, detail = 20) {
  const geometry = useIcosahedronGeometry(radius, detail)
  const material = new THREE.MeshNormalMaterial()
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}
