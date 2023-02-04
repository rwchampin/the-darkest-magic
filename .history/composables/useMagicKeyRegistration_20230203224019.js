import { useMagicKeys } from '@vueuse/core'

import { watch } from 'vue'
import { useAppStore } from '~/store/useAppStore'

export const useMagicKeyRegistration = () => {
  const store = useAppStore()
  // const params = useUrlSearchParams('hash')
  const keys = useMagicKeys()
  const shiftD = keys['Shift+D']

  watch(shiftD, (v) => {
    store.$patch({ debugMode: v })
    window.location.hash = v ? 'debug' : ''
  })
}
