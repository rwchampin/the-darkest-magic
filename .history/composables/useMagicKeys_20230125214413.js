import { useEventListener, useMagicKeys } from '@vueuse/core'

export const useMagicKeys = () => {
  const init = () => {
    const keys = useMagicKeys()
    const shiftPlusD = keys.shift && keys.d

    watch(shiftPlusD, (v) => {
      if (v)
        alert('Shift + D has been pressed')
    })
  }

  useEventListener(document, 'load', init)
}
