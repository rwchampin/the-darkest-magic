import { useMagicKeys, useUrlSearchParams } from '@vueuse/core'

import { watch } from 'vue'
import { useAppStore } from '~/store/useAppStore'

let instance = null
export default class Watchers {
  constructor() {
    if (instance)
      return instance
    this.store = useAppStore()
    this.params = useUrlSearchParams('hash')
    this.keys = useMagicKeys()
    this.shiftD = this.keys['Shift+D']

    watch(this.shiftD, (v) => {
      if (v && window.location.hash === '#debugger') {
        this.params.debug = ''
        this.store.$patch({ debugMode: false })
      }
      else if (v && window.location.hash !== '#debugger') {
        params.debugger = true
        store.$patch({ debugMode: true })
      }
    })
    instance = this
  }
}
