import { useMouse } from '@vueuse/core'

export const useMagicMouse = ({ experience }) => {
  onMounted(() => {
    const draw = () => {
      const ctx = experience.ctx
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    }
    const animate = () => {
    }
    debugger
  })
}
