import { useMagicKeys } from '@vueuse/core'
// import { watchEffect } from 'vue'
const { shift, d /* keys you want to monitor */ } = useMagicKeys()

export const useMagicKeyRegistration = async () => {
  watchEffect(() => {
    // if (shift.value && d.value)
    window.location.hash = shift.value && d.value ? '#debugger' : ''
  })
}
