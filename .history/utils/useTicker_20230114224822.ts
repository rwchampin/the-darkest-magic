import { createSharedComposable } from '@vueuse/core'
import { useEventEmitter } from '~~/composables/useEventEmitter'

const { on, off, trigger } = useEventEmitter()

const useTickerFN = (nuxtApp: any, _options: {}) => {
  const start = Date.now()
  const current = start
  let elapsed = 0
  let delta = 16
  let playing = true
  let ticker: number

  const play = () => {
    playing = true
  }

  const pause = () => {
    playing = false
  }

  /**
     * Tick
     */
  const tick = () => {
    ticker = window.requestAnimationFrame(tick)

    let current = Date.now()

    delta = current - current
    elapsed += playing ? delta : 0
    current = current

    if (delta > 60)
      delta = 60

    if (playing)
      trigger('tick')
  }
  tick()
  /**
     * Stop
     */
  const stop = () => {
    window.cancelAnimationFrame(ticker)
  }

  return {
    start,
    current,
    elapsed,
    delta,
    playing,
    play,
    pause,
    stop,
  }
}

const useTicker = createSharedComposable(useTickerFN)

export default useTicker
