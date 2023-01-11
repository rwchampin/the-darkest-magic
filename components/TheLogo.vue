<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const nuxtApp = useNuxtApp()

useEventListener('assetsLoaded', () => {
  debugger
  console.log('assetsLoaded')
}, { once: true })
</script>
