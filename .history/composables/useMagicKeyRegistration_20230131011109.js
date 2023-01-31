import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
export const useMagicKeyRegistration = async () => {
  const keys = useMagicKeys()
  const shiftCtrlA = keys['Shift+Ctrl+A']

  watch(shiftCtrlA, (v) => {
    if (v && window.location.hash === '#debugger')
      window.location.hash = ''
    else if (v && window.location.hash !== '#debugger')
      window.location.hash = '#debugger'
  })
}
