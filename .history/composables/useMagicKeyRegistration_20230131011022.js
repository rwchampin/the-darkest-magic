import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
export const useMagicKeyRegistration = async () => {
  const keys = useMagicKeys()
  const shiftCtrlA = keys['Shift+Ctrl+A']

  watch(shiftCtrlA, (v) => {
    if (v && window.location.hash === '#debugger')
      alert('Shift + Ctrl + A have been pressed')
    else if (v && window.location.hash !== '#debugger')
      alert('Shift + Ctrl + A have been pressed, but you are not in the debugger')
  })
}
