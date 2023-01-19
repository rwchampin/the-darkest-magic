import Particle from '~~/particles/swarm/Particle.js'
import Config from '~~/particles/swarm/Config.js'
import Canvas from '~~/particles/swarm/Canvas.js'

class Config {
  constructor(opts) {
    this.merge(opts)
  }

  merge(opts) {
    for (const opt in opts)
      this.set(opt, opts[opt])
  }

  set(key, value) {
    if (!key || !value)
      return
    else this[key] = value
  }
}

export default Config
