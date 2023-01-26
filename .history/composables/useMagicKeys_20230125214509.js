import { useEventListener, useMagicKeys } from '@vueuse/core'

export const useMagicKeyRegistration = () => {
  const init = () => {
    const keys = useMagicKeys()
    const shiftPlusD = keys.shift && keys.d

    watch(shiftPlusD, (v) => {
      if (v)
        alert('Shift + D shas been pressed')
    })
  }

  useEventListener(document, 'load', init)
}
