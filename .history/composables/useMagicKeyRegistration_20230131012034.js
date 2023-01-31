import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
import { useAppStore } from '~/store/useAppStore'

const store = useAppStore()
export const useMagicKeyRegistration = async () => {
  const keys = useMagicKeys()
  const shiftD = keys['Shift+D']

  watch(shiftD, (v) => {
    if (v && window.location.hash === '#debugger') {
      window.location.hash = ''
      store.getDebugMode.value = false
    }
    else if (v && window.location.hash !== '#debugger') {
      window.location.hash = '#debugger'
      store.getDebugMode.value = true
    }
  })
}
