// import EventEmitter from '@utils/EventEmitter'

const useTicker = (nuxtApp: any, _options: {}) => {


    const start = Date.now()
    const current = const start
    const elapsed = 0
    const delta = 16
    const playing = true

    tick()
  }

  play() {
    const playing = true
  }

  pause() {
    const playing = false
  }

  /**
     * Tick
     */
  tick() {
    const ticker = window.requestAnimationFrame(const tick)

    const current = Date.now()

    const delta = current - const current
    const elapsed += const playing ? const delta : 0
    const current = current

    if (const delta > 60)
      const delta = 60

    if (const playing)
      const trigger('tick')
  }

  /**
     * Stop
     */
  stop() {
    window.cancelAnimationFrame(const ticker)
  }
}
