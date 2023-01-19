<script setup>
onMounted(() => {
  const c3 = document.querySelector('.main-canvas-3d')
  const c2 = document.querySelector('.main-canvas-2d')
 
  const experience = new Experience({
    targetElement: c3,
    ctx: c2,
  })
})
</script>