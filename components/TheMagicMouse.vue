<script setup>
import * as THREE from 'three'
import { usePlane } from '~/geometries/usePlane'
import { useSphere } from '~~/geometries/useSphere'

const plane = usePlane()
const sphere = useSphere()

onMounted(() => {
  const { scene, camera, renderer } = SUPERGLOBAL
  scene.add(plane, sphere)
  renderer.render(scene, camera)
})
</script>
