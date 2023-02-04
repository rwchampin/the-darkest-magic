import { useMagicKeys, useUrlSearchParams } from '@vueuse/core'

import { watch } from 'vue'
import { useAppStore } from '~/store/useAppStore'

export const useMagicKeyRegistration = async () => {
  const store = useAppStore()
  // const params = useUrlSearchParams('hash')
  const keys = useMagicKeys()
  const shiftD = keys['Shift+D']

  watch(shiftD, (v) => {
    if (v)
      store.$patch({ debugMode: false })
    else
      store.$patch({ debugMode: true })
  })
}
