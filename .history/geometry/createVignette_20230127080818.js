import { usePlane } from '~/geometry/usePlane.js'
import { VignetteMaterial } from '~/materials/VignetteMaterial.js'

export const createVignette = () => {
  const plane = usePlane()
  plane.material = VignetteMaterial
  return plane
}
