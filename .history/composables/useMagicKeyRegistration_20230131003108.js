import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
const keys = useMagicKeys()
const shiftD = keys['Shift+D']
export const useMagicKeyRegistration = async () => {
  // watch(shiftD, (v) => {
  //   alert(v)
  //   window.location.hash = v === true ? '#debug' : ''
  // })
}
