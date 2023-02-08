<script lang="ts" setup>
import { useMessage } from 'naive-ui'

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

