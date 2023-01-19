// import EventEmitter from '@utils/EventEmitter'

const useTicker = (nuxtApp: any, _options: {}) => {


   const start = Date.now()
   const current =start
   const elapsed = 0
   let delta = 16
   const playing = true


   tick()
  }

  const play =() =>{
   playing = true
  }

  const pause =() => {
   playing = false
  }

  /**
     * Tick
     */
  const tick =()  =>{
   const ticker = window.requestAnimationFrame( tick)

    const current = Date.now()

   delta = current -current
   elapsed +=playing ?delta : 0
   current = current

    if ( delta > 60)
     delta = 60

    if ( playing)
     trigger('tick')
  }

  /**
     * Stop
     */
 const stop = () => {
    window.cancelAnimationFrame(ticker)
  }

}
