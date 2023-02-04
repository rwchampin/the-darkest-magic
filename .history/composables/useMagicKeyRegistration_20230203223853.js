import { useMagicKeys } from '@vueuse/core'

import { watch } from 'vue'
import { useAppStore } from '~/store/useAppStore'

export const useMagicKeyRegistration = () => {
  const store = useAppStore()
  // const params = useUrlSearchParams('hash')
  const keys = useMagicKeys()
  const shiftD = keys['Shift+D']

  watch(shiftD, (v) => {
    debugger
    if (v === true) {
      store.$patch({ debugMode: false })
      window.location.hash = ''
    }

    else { store.$patch({ debugMode: true }); window.location.hash = 'debug' }
  })
}
