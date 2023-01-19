import { useMouse } from '@vueuse/core'
import Experience from '~~/core/Experience'

export const useMagicMouse = () => {
  const { x, y, sourceType } = useMouse()

  onMounted(() => {
    const experience = new Experience()
    debugger
  })
}
