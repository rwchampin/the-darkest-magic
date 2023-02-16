<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { useIdle, usePageLeave, whenever } from '@vueuse/core'
import gsap from 'gsap';

const { idle, lastActive } = useIdle(30000) // 5 min
const isLeft = usePageLeave()

whenever(idle, (e) => {
  gsap.ticker.fps(0)
})
whenever(isLeft, () => {
  debugger; gsap.ticker.fps(0)
})

const nuxtApp = useNuxtApp()
const message = useMessage()
const g = window || self || globalThis
g.messageApi = message
nuxtApp.provide('messageApi', message)
message.success("MESSAGE API READY")
</script>

<template>
  <main class="the-provider">
    <slot />
  </main>
</template>

