import { useMagicKeys } from '@vueuse/core'

import { watchEffect } from 'vue'
import { useAppStore } from '~/store/useAppStore'

export const useMagicKeyRegistration = () => {
  const store = useAppStore()
  // const params = useUrlSearchParams('hash')
  const keys = useMagicKeys()
  const shiftD = keys['Shift+D']

  watchEffect(shiftD, (v) => {
    store.$patch({ debugMode: v })
    window.location.hash = v ? 'debug' : ''
  })
}
