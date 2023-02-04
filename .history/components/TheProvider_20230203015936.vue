<script lang="ts" setup>
import { useMessage } from 'naive-ui'
const nuxtApp = useNuxtApp()

const message = useMessage()
nuxtApp.provide('$message', message)
</script>

<template>
  <main class="the-provider">
    <slot />
  </main>
</template>

