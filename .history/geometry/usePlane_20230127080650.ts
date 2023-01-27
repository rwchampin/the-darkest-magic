import * as THREE from 'three'

interface Plane {
  width: number
  height: number
  widthSegments: number
  heightSegments: number
  color: THREE.Color
  side?: THREE.Side
  receiveShadow?: boolean
  material?: THREE.Material
}
export const usePlane = ({
  width,
  height,
  widthSegments,
  heightSegments,
}: Plane): THREE.Mesh => {
  const plane = new THREE.PlaneGeometry(
    width,
    height,
    widthSegments,
    heightSegments,
  )
  return plane
}
