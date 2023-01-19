import { useMouse } from '@vueuse/core'

export const useMagicMouse = ({ experience }) => {
  const { x, y, target } = useMouse()
  onMounted(() => {
    const draw = () => {
      const ctx = experience.ctx
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.fillStyle = 'red'
      ctx.fill()
      ctx.closePath()
    }

    const update = () => {
      draw()
      requestAnimationFrame(update)
    }
    update()
  })
}
