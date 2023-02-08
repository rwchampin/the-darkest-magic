/* eslint-disable no-undef */

import useLogger from '~/composables/useLogger'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    // if (nuxtApp.$appStore.debugMode.value)
      useLogger('log', 'app:created')
  })
  nuxtApp.hook('app:error', (err) => {
    /* your code goes here */
    // if (nuxtApp.$appStore.debugMode.value === true)
      useLogger('error', 'app:error')

    throw createError({
      statusCode: 500,
      statusMessage: `Vue error during setup${err}`,
    })
  })
  nuxtApp.hook('app:error:cleared', () => {
    /* your code goes here */
    // if (nuxtApp.$appStore.debugMode.value)
      useLogger('log', 'app:error:cleared')
  })
  nuxtApp.hook('app:data:refresh', () => {
    /* your code goes here */
    // if (nuxtApp.$appStore.debugMode.value)
      useLogger('log', 'app:data:refresh')
  })
  nuxtApp.hook('vue:setup', () => {
    /* your code goes here */
    // if (nuxtApp.$appStore.debugMode.value)
    //   useLogger('log', 'vue:setup')
  })
  nuxtApp.hook('vue:setup:done', () => {
    /* your cxcccode goes here */
    // if (nuxtApp.$appStore.debugMode.value)
    //   useLogger('log', 'vue:setup:done')
  })
  nuxtApp.hook('vue:setup:error', (err) => {
    /* your code goes here */
    // if (nuxtApp.$appStore.debugMode.value == true)
    //   useLogger('error', 'vue:setup:error')

    throw createError({
      statusCode: 500,
      statusMessage: `Vue error during setup${err}`,
    })
  })
  nuxtApp.hook('vue:setup:error:cleared', () => {
    /* your code goes here */
    // if (nuxtApp.$appStore.debugMode.value)
      useLogger('log', 'vue:setup:error:cleared')
  })
  nuxtApp.hook('vue:setup:done', () => {
    /* your code goes here */
    // if (nuxtApp.$appStore.debugMode.value)
    useLogger('log', 'vue:setup:done')
  })

  nuxtApp.hook('app:rendered', () => {
    /* your code goes here */

    // if (nuxtApp.$appStore.debugMode.value)
      useLogger('log', 'app:rendered')
  })
  nuxtApp.hook('app:redirected', () => {
    /* your code goes here */
    // if (nuxtApp.$appStore.debugMode.value)
      useLogger('log', 'app:redirected')
  })
  nuxtApp.hook('app:beforeMount', () => {
    // if (nuxtApp.$appStore.debugMode.value)
    nuxtApp.$registerPlugins();
      useLogger('log', 'app:beforeMount')
  })
  nuxtApp.hook('app:mounted', () => {
    /* your code goes here */
    // if (nuxtApp.$appStore.debugMode.value)
      useLogger('log', 'app:mounted')
  })
  nuxtApp.hook('app:suspense:resolve', () => {
    /* your code goes here */
    // if (nuxtApp.$appStore.debugMode.value)
      useLogger('log', 'app:suspense:resolve')
  })
  nuxtApp.hook('link:prefetch', () => {
    /* your code goes here */
    // if (nuxtApp.$appStore.debugMode.value)
      useLogger('log', 'link:prefetch')
  })
})
