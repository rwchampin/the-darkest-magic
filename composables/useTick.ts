import * as THREE from 'three'
import gsap from 'gsap'
import { useIdle, usePageLeave } from '@vueuse/core'
import { watch } from 'vue'
import { useLogger } from '~~/composables/useLogger'

const { log, warn, error, debug } = useLogger()
const { idle } = useIdle(1 * 60 * 1000)
const isLeft = usePageLeave()
export const useTick = () => {
  const changeFPS = fps => gsap.ticker.fps(fps)

  watch([idle, isLeft], (v) => {
    if (v.includes(true)) {
      debug('Idle')
      gsap.ticker.sleep()
    }
    else {
      debug('Active')
      gsap.ticker.wake()
    }
  })
  const add = gsap.ticker.add

  return {
    changeFPS,
    add,
  }
}
