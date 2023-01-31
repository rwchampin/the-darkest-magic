import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
export const useMagicKeyRegistration = async () => {
  const keys = useMagicKeys()
  const shiftCtrlA = keys['Shift+Ctrl+A']

  watch(shiftCtrlA, (v) => {
    if (v)
      console.log('Shift + Ctrl + A have been pressed')
  })
}
