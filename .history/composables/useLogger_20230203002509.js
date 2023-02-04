/* eslint-disable no-console */

export default useLogger = (method, args) => {
  let inGroup = false
  const methodToColorMap = {
    debug: '#7f8c8d',
    log: '#2ecc71',
    warn: '#f39c12',
    error: '#c0392b',
    groupCollapsed: '#3498db',
    groupEnd: null, // No colored prefix on groupEnd
  }

  if (method === 'groupCollapsed') {
    // Safari doesn't print all console.groupCollapsed() arguments:
    // https://bugs.webkit.org/show_bug.cgi?id=182754
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgentData)) {
      console[method](...args)
      return
    }
  }
  const styles = [
                `background: ${methodToColorMap[method]}`,
                'border-radius: 0.5em',
                'color: white',
                'font-weight: bold',
                'padding: 2px 0.5em',
  ]
  // When in a group, the workbox prefix is not displayed.
  const logPrefix = inGroup ? [] : ['%cRYAN THE DEV', styles.join(';')]
  console[method](...logPrefix, ...args)
  if (method === 'groupCollapsed')
    inGroup = true

  if (method === 'groupEnd')
    inGroup = false

  const api = {}
  const loggerMethods = Object.keys(methodToColorMap)
  for (const key of loggerMethods) {
    const method = key
    api[method] = (...args) => {
      print(method, args)
    }
  }
  return api
}

