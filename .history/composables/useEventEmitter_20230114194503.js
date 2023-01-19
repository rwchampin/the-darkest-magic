export const useEventEmitter = () => {
  /**
     * Constructor
     */

  const callbacks = {}
  callbacks.base = {}

  /**
     * Resolve name
     */
  const resolveName = function (name) {
    const newName = {}
    const parts = name.split('.')

    newName.original = name
    newName.value = parts[0]
    newName.namespace = 'base' // Base namespace

    // Specified namespace
    if (parts.length > 1 && parts[1] !== '')
      newName.namespace = parts[1]

    return newName
  }

  /**
     * Resolve names
     */
  const resolveNames = function (_names) {
    let names = _names
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '')
    names = names.replace(/[,/]+/g, ' ')
    names = names.split(' ')

    return names
  }

  /**
     * On
     */
  const on = function (_names, callback) {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong names')
      return false
    }

    if (typeof callback === 'undefined') {
      console.warn('wrong callback')
      return false
    }

    // Resolve names
    const names = resolveNames(_names)

    // Each name
    names.forEach((_name) => {
      // Resolve name
      const name = resolveName(_name)

      // Create namespace if not exist
      if (!(callbacks[name.namespace] instanceof Object))
        callbacks[name.namespace] = {}

      // Create callback if not exist
      if (!(Array.isArray(callbacks[name.namespace][name.value])))
        callbacks[name.namespace][name.value] = []

      // Add callback
      callbacks[name.namespace][name.value].push(callback)
    })

    // return this
  }

  /**
     * Off
     */
  const off = function (_names) {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong name')
      return false
    }

    // Resolve names
    const names = resolveNames(_names)

    // Each name
    names.forEach((_name) => {
      // Resolve name
      const name = resolveName(_name)

      // Remove namespace
      if (name.namespace !== 'base' && name.value === '') {
        delete callbacks[name.namespace]
      }

      // Remove specific callback in namespace
      else {
        // Default
        if (name.namespace === 'base') {
          // Try to remove from each namespace
          for (const namespace in callbacks) {
            if (callbacks[namespace] instanceof Object && Array.isArray(callbacks[namespace][name.value])) {
              delete callbacks[namespace][name.value]

              // Remove namespace if empty
              if (Object.keys(callbacks[namespace]).length === 0)
                delete callbacks[namespace]
            }
          }
        }

        // Specified namespace
        else if (callbacks[name.namespace] instanceof Object && Array.isArray(callbacks[name.namespace][name.value])) {
          delete callbacks[name.namespace][name.value]

          // Remove namespace if empty
          if (Object.keys(callbacks[name.namespace]).length === 0)
            delete callbacks[name.namespace]
        }
      }
    })

    // return this
  }

  /**
     * Trigger
     */
  const trigger = function (_name, _args) {
    // Errors
    if (typeof _name === 'undefined' || _name === '') {
      console.warn('wrong name')
      return false
    }

    let finalResult = null
    let result = null

    // Default args
    const args = !(Array.isArray(_args)) ? [] : _args

    // Resolve names (should on have one event)
    let name = resolveNames(_name)

    // Resolve name
    name = resolveName(name[0])

    // Default namespace
    if (name.namespace === 'base') {
      // Try to find callback in each namespace
      for (const namespace in callbacks) {
        if (callbacks[namespace] instanceof Object && Array.isArray(callbacks[namespace][name.value])) {
          callbacks[namespace][name.value].forEach((callback) => {
            result = callback.apply(args)

            if (typeof finalResult === 'undefined')
              finalResult = result
          })
        }
      }
    }

    // Specified namespace
    else if (callbacks[name.namespace] instanceof Object) {
      if (name.value === '') {
        console.warn('wrong name')
        return this
      }

      callbacks[name.namespace][name.value].forEach((callback) => {
        result = callback.apply(args)

        if (typeof finalResult === 'undefined')
          finalResult = result
      })
    }

    return finalResult
  }

  return {
    on,
    off,
    trigger,
  }
}
