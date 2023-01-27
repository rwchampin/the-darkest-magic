import { useEventListener, useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'

export const useMagicKeyRegistration = () => {
  const init = () => {
    const keys = useMagicKeys()
    const shiftD = keys['Shift+D']

    watch(shiftD, (v) => {
      if (v)
        navigateTo('#debug')
      else
        window.location.hash = ''
    })
  }
  init()
}
