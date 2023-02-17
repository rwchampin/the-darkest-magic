<script setup>
import * as THREE from 'three'
import { usePlane } from '~/geometry/usePlane'
import { useSphere } from '~~/geometry/useSphere'

const plane = usePlane()
const sphere = useSphere()

onMounted(() => {
  const { scene, camera, renderer } = SUPERGLOBAL
  scene.add(plane, sphere)
  renderer.render(scene, camera)
})
</script>
