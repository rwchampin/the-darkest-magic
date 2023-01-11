import * as THREE from 'three'

interface Sphere {
  radius: number
  widthSegments: number
  heightSegments: number
  color?: THREE.Color

}
export const useSphere = ({ radius = 15, widthSegments = 32, heightSegments = 16, color = new THREE.Color(0xFF0000)}) => {
  const geometry = new THREE.SphereGeometry(15, 32, 16)
  const mat = new THREE.MeshBasicMaterial({ color: 0xFFFF00 })
  return new THREE.Mesh(geometry, mat)
}
