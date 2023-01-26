import { useMagicKeys } from '@vueuse/core'

export const useMagicKeys = () => {
  const keys = useMagicKeys()
  const shiftPlusD = keys.shift && keys.d;

  watch(, (v) => {
    if (v)
      console.log('space has been pressed')
  })

  watchEffect(() => {
    if (shift.value && a.value)
      console.log('Shift + A have been pressed')
  })
}
