import { useMouse } from '@vueuse/core'
export const useMagicMouse = () => {
  const { x, y, sourceType } = useMouse()

  onMounted(() => {
    const { scene, camera, renderer } = SUPERGLOBAL.core
    debugger
  })
}
