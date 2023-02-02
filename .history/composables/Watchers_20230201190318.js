import { useMagicKeys, useUrlSearchParams } from '@vueuse/core'

import { watch } from 'vue'
import { useAppStore } from '~/store/useAppStore'

export const useMagicKeyRegistration = async () => {
  const store = useAppStore()
  const params = useUrlSearchParams('hash')
  const keys = useMagicKeys()
  const shiftD = keys['Shift+D']

  watch(shiftD, (v) => {
    if (v && window.location.hash === '#debugger') {
      params.debug = ''
      store.$patch({ debugMode: false })
    }
    else if (v && window.location.hash !== '#debugger') {
      params.debugger = true
      store.$patch({ debugMode: true })
    }
  })
}
