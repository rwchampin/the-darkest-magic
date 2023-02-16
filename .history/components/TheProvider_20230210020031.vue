<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { useIdle, usePageLeave, whenever } from '@vueuse/core'

const { idle, lastActive } = useIdle(5 * 60 * 1000) // 5 min
const isLeft = usePageLeave()

whenever(idle, () => gsap.ticker.fps(0))
whenever(isLeft, () => gsap.ticker.fps(0))

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

