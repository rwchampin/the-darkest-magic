<script lang="ts" setup>
import { useMessage } from 'naive-ui'
const nuxtApp = useNuxtApp()

nuxtApp.provide('$message', useMessage())
window.$message = useMessage()
</script>

<template>
  <main class="the-provider">
    <slot />
  </main>
</template>

