import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
import { appStore } from '~/stores/appStore'
export const useMagicKeyRegistration = async () => {
  const keys = useMagicKeys()
  const shiftD = keys['Shift+D']

  watch(shiftD, (v) => {
    if (v && window.location.hash === '#debugger')
      window.location.hash = ''
    else if (v && window.location.hash !== '#debugger')
      window.location.hash = '#debugger'
  })
}
