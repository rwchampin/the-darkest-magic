<script setup lang="ts">

</script>

<template>
  <Teleport to="body">
    <section class="canvas-parent canvas-event-target layer-bg">
      <canvas class="canvas-ui main-canvas-3d" />
      <!-- <canvas class="canvas-ui main-canvas-2d" /> -->
    </section>
  </teleport>
</template>

<style scoped>
.canvas-parent {
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: red;
}

.main-canvas-3d,
.main-canvas-2d {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(lightgrey,#E0E4E2,#BBC1CC, lightgrey )
}
</style>
