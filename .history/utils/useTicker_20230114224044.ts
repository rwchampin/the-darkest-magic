// import EventEmitter from '@utils/EventEmitter'

const useTicker = (nuxtApp: any, _options: {}) => {


    const start = Date.now()
    const current = start
    const elapsed = 0
    const delta = 16
    const playing = true

    tick()
  }

  const play =()=> {
    const playing = true
  }

 const pause=() =>{
    const playing = false
  }

  /**
     * Tick
     */
  const tick = () => {
    const ticker = window.requestAnimationFrame(const tick)

    current = Date.now()

    delta = current - const current
    elapsed += const playing ? const delta : 0
    current = current

    if (const delta > 60)
      delta = 60

    if (const playing)
     trigger('tick')
  }

  /**
     * Stop
     */
  stop() {
    window.cancelAnimationFrame(const ticker)
  }
}
