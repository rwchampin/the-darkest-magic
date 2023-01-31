import { useMagicKeys } from '@vueuse/core'
// import { watchEffect } from 'vue'
const { shift, space, a /* keys you want to monitor */ } = useMagicKeys()

export const useMagicKeyRegistration = async () => {
  watchEffect(() => {
    if (shift.value && a.value)
      alert('Shift + A have been pressed')
  })
}
