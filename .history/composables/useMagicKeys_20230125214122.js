import { useMagicKeys } from '@vueuse/core'

export const useMagicKeys = () => {
  const keys = useMagicKeys()
  const shiftPlusD = keys.shift && keys.d;

  watch(shiftPlusD, (v) => {
    if (v)
      alert('Shift + D has been pressed')
  })

  
