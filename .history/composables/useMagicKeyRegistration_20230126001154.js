import { useEventListener, useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'

export const useMagicKeyRegistration = () => {
  const init = () => {
    const keys = useMagicKeys()
    const shiftPlusD = keys.shift && keys.d

    watch(shiftPlusD, (v) => {
      if (v) {
        // alert('Shift + D shas been pressed')
        navigateTo('#debug')
      }
      else {
        window.location.hash = ''
      }
    })
  }
  init()
}
