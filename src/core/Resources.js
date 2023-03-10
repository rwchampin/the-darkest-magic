import EventEmitter from '~/core/helpers/EventEmitter.js'
import assets from '~/core/assets.js'
import useLogger from '~/composables/useLogger'
import ResourceLoader from '~/core/ResourceLoader'

// const resourceTriggers =
export default class Resources extends EventEmitter {
  constructor({ nuxtApp, debugMode, appStore }) {
    super()
    this.nuxtApp = nuxtApp
    this.debugMode = this.nuxtApp.$appStore.state.debugMode
    this.THREE = this.nuxtApp.$plugins.THREE
    this.gsap = this.nuxtApp.$plugins.gsap

    // Items (will contain every resources)
    this.items = {}
    // Loader
    this.loader = new ResourceLoader({ nuxtApp, debugMode, appStore })

    this.groups = {}
    this.groups.assets = [...assets]
    this.groups.loaded = []
    this.groups.current = null
    this.loadNextGroup()

    // Loader file end event
    this.loader.on('assets:progress:fileEnd', (_resource, _data) => {
      let data = _data
      if (this.debugMode)
        useLogger('log', `Loading complete: ${this.loader.progress}%`)

      // Convert to texture
      if (_resource.type === 'texture') {
        if (!(data instanceof this.THREE.Texture))
          data = new this.THREE.Texture(_data)

        data.needsUpdate = true
      }

      this.items[_resource.name] = data

      // Progress and event
      this.groups.current.loaded++
    })

    // Loader all end event
    this.loader.on('assets:progress:complete', () => {
      this.groups.loaded.push(this.groups.current)
      // Trigger
      this.trigger('assets:groupEnd', [this.groups.current])

      if (this.groups.assets.length > 0)
        this.loadNextGroup()

      else
        this.trigger('assets:progress:complete')
    })
  }

  loadNextGroup() {
    this.groups.current = this.groups.assets.shift()
    this.groups.current.toLoad = this.groups.current.items.length
    this.groups.current.loaded = 0

    this.loader.load(this.groups.current.items)
  }

  createInstancedMeshes(_children, _groups) {
    // Groups
    const groups = []

    for (const _group of _groups) {
      groups.push({
        name: _group.name,
        regex: _group.regex,
        meshesGroups: [],
        instancedMeshes: [],
      })
    }

    // Result
    const result = {}

    for (const _group of groups)
      result[_group.name] = _group.instancedMeshes

    return result
  }

  destroy() {
    for (const _itemKey in this.items) {
      const item = this.items[_itemKey]
      if (item instanceof this.THREE.Texture)
        item.dispose()
    }
  }
}
