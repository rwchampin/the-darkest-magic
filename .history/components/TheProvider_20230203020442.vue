<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { inject } from 'vue'
const nuxtApp = useNuxtApp()

const message = useMessage()
const debugMode = inject('debugMode')

nuxtApp.provide('$message', message)
</script>

<template>
  <main class="the-provider">
    <slot />
  </main>
</template>

