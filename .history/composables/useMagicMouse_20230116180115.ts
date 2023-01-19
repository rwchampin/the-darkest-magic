import { useMouse } from '@vueuse/core'

export const useMagicMouse = ({ experience }) => {
  const { x, y, sourceType } = useMouse()

  onMounted(() => {
    debugger
  })
}
