import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
const keys = useMagicKeys()
const shiftCtrlA = keys['Shift+Ctrl+A']

export const useMagicKeyRegistration = async () => {
  watch(shiftCtrlA, (v) => {
    alert(v)
    window.location.hash = v === true ? '#debug' : ''
  })
}
