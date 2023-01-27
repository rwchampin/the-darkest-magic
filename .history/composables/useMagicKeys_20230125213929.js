import { useMagicKeys } from '@vueuse/core'

export const useMagicKeys = () => {
  const { shift, d/* keys you want to monitor */ } = useMagicKeys()

  watch(, (v) => {
    if (v)
      console.log('space has been pressed')
  })

  watchEffect(() => {
    if (shift.value && a.value)
      console.log('Shift + A have been pressed')
  })
}