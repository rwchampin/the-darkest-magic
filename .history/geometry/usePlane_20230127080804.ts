import * as THREE from 'three'

interface Plane {
  width: number
  height: number
  widthSegments: number
  heightSegments: number
}
export const usePlane = ({
  width,
  height,
  widthSegments,
  heightSegments,
}: Plane): THREE.PlaneGeometry => {
  const plane = new THREE.PlaneGeometry(
    width,
    height,
    widthSegments,
    heightSegments,
  )
  return plane
}
