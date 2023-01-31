import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'

export const useMagicKeyRegistration = async (nuxtApp) => {
  const keys = useMagicKeys()
  const shiftD = keys['Shift+D']
  debugger
  watch(shiftD, (v) => {
    alert(v)
    window.location.hash = v === true ? '#debug' : ''
  })
}
