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
