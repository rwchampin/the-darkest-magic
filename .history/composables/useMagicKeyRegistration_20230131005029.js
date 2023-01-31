import { useMagicKeys } from '@vueuse/core'
// import { watchEffect } from 'vue'
const keys = useMagicKeys()
const shiftCtrlA = keys['Shift+A']

export const useMagicKeyRegistration = async () => {
  watchEffect(() => {
    if (shift.value && a.value)
      console.log('Shift + A have been pressed')
  })
}
