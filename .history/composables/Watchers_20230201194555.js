import { useMagicKeys, useUrlSearchParams } from '@vueuse/core'

import { watch } from 'vue'
import { useAppStore } from '~/store/useAppStore'

const instance = null
export default class Watchers {
  constructor() {
    if (instance)
      return instance
    this.store = useAppStore()
    this.params = useUrlSearchParams('hash')
    this.keys = useMagicKeys()
    this.shiftD = keys['Shift+D']

    watch(shiftD, (v) => {
      if (v && window.location.hash === '#debugger') {
        params.debug = ''
        store.$patch({ debugMode: false })
      }
      else if (v && window.location.hash !== '#debugger') {
        params.debugger = true
        store.$patch({ debugMode: true })
      }
    })
    instance = this
  }
}
