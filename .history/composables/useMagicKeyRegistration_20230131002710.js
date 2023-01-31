import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'

export const useMagicKeyRegistration = async (nuxtApp) => {
  const init = () => {
    const keys = useMagicKeys()
    const shiftD = keys['Shift+D']
    const shiftE = keys['Shift+E']

    watch(shiftD, (v) => {
      window.location.hash = v ? '#debug' : ''
    })
    watch(shiftE, (v) => {
      debugger
      nuxtApp.$appStore.setExplode(v)
    })
  }
  init()
}
