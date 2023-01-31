import { useMagicKeys } from '@vueuse/core'
import { watchEffect } from 'vue'
const keys = useMagicKeys()
const shiftCtrlA = keys['Shift+A']

export const useMagicKeyRegistration = async () => {
  watchEffect(shiftCtrlA, (v) => {
    alert(v)
    // window.location.hash = v === true ? '#debug' : ''
  })
}
