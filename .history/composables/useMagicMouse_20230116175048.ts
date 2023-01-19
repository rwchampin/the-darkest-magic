import { useMouse } from '@vueuse/core'
import Experience from '~~/core/Experience'

export const useMagicMouse = () => {
  const { x, y, sourceType } = useMouse()

  const experience = new Experience()
  debugger
  const { scene, camera, renderer } = SUPERGLOBAL.core
  debugger
}
