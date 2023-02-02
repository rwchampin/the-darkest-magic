/* eslint-disable no-console */
/* eslint-disable no-undef */

export default defineNuxtPlugin((nuxtApp) => {
  // const { buildUI } = useUIManager(nuxtApp);
  // Doing something with nuxtApp

  nuxtApp.hook('app:created', () => {
    if (nuxtApp.$appStore.debugMode.value)
      console.log('app:created')
  })
  nuxtApp.hook('app:error', (err) => {
    /* your code goes here */
    if (nuxtApp.$appStore.debugMode.value)
      console.log('app:error')

    throw createError({
      statusCode: 500,
      statusMessage: `Vue error during setup${err}`,
    })
  })
  nuxtApp.hook('app:error:cleared', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.debugMode.value)
      console.log('app:error:cleared')
  })
  nuxtApp.hook('app:data:refresh', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.debugMode.value)
      console.log('app:data:refresh')
  })
  nuxtApp.hook('vue:setup', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.debugMode.value)
      console.log('vue:setup')
  })
  nuxtApp.hook('vue:setup:done', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.debugMode.value)
      console.log('vue:setup:done')
  })
  nuxtApp.hook('vue:setup:error', (err) => {
    /* your code goes here */
    if (nuxtApp.$appStore.debugMode.value)
      console.log(chalk.red.bgBlack('vue:setup:error'))

    throw createError({
      statusCode: 500,
      statusMessage: `Vue error during setup${err}`,
    })
  })
  nuxtApp.hook('vue:setup:error:cleared', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.debugMode.value)
      console.log('vue:setup:error:cleared')
  })
  nuxtApp.hook('vue:setup:done', () => {
    /* your code goes here */
    // if (nuxtApp.$appStore.debugMode.value)
    console.log('vue:setup:done')
  })

  nuxtApp.hook('app:rendered', () => {
    /* your code goes here */

    if (nuxtApp.$appStore.debugMode.value)
      console.log('app:rendered')
  })
  nuxtApp.hook('app:redirected', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.debugMode.value)
      console.log('app:redirected')
  })
  nuxtApp.hook('app:beforeMount', () => {
    if (nuxtApp.$appStore.debugMode.value)
      console.log('app:beforeMount')
  })
  nuxtApp.hook('app:mounted', () => {
    /* your code goes here */
    nuxtApp.$registerPlugins()
    if (nuxtApp.$appStore.debugMode.value)
      console.log('app:mounted')
  })
  nuxtApp.hook('app:suspense:resolve', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.debugMode.value)
      console.log('app:suspense:resolve')
  })
  nuxtApp.hook('link:prefetch', () => {
    /* your code goes here */
    if (nuxtApp.$appStore.debugMode.value)
      console.log('link:prefetch')
  })
})
