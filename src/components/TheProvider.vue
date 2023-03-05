<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import { useIdle, usePageLeave, useMagicKeys, whenever } from '@vueuse/core'
const { idle } = useIdle(30000) // 5 min
const isLeft = usePageLeave()
const { d /* keys you want to monitor */ } = useMagicKeys()


const nuxtApp = useNuxtApp()
const { gsap } = nuxtApp.$plugins
onMounted(() => {
  const message = useMessage()
  window.messageApi = message
  nuxtApp.provide('messageApi', message)


})
whenever(d, (theD) => {
  alert(theD)
})
whenever(idle, (isIdle) => {
  window.messageApi.success("ISIDLE" + isIdle)
  if (isIdle)
    gsap.ticker.fps(0)
  else
    gsap.ticker.fps(60)

})
whenever(isLeft, (hasLeft) => {
  window.messageApi.success("HASLEFT" + hasLeft)

  if (hasLeft)
    gsap.ticker.fps(0)
  else
    gsap.ticker.fps(60)
})
</script>

<template>
  <slot />
</template>

