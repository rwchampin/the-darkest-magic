<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import gsap from 'gsap'
// import { useBlackEnergy } from '~~/composables/useBlackEnergy'
// import { usePoints } from '~/particles/usePoints'
const nuxtApp = useNuxtApp()

onMounted(() => {
  useEventListener(document, 'core:singletons:complete', () => {
    // if (nuxtApp.$appStore.getDebugMode)
    console.log('core:singletons:complete')
  })
  const { scene, camera, renderer, clock } = SUPERGLOBAL.core
  // const { planet, stars, starLights } = useBlackEnergy()
  // const points = usePoints()
  // scene.add(points, planet, stars, starLights)
  // const logo = window.assets.logo
})
</script>
