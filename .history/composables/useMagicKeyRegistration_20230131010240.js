import { useMagicKeys } from '@vueuse/core'
// import { watchEffect } from 'vue'
const { shift, d /* keys you want to monitor */ } = useMagicKeys()

export const useMagicKeyRegistration = async () => {
  watchEffect(() => {
    if (shift.value && d.value) {
      if (window.location.hash === '#debugger')
        window.location.hash = '#poop'

      else
        window.location.hash = '#debugger'
    }
  })
}
