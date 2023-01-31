<script setup lang="ts">

</script>

<template>
  <h1 class="inset-title">
    {{ title }}
  </h1>
</template>

<style scoped>
.inset-title {
    text-shadow: var(--text-shadow-inset);
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 2rem;
    font: "Montserrat-Black";
    background-color: #565656;
    color: transparent;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
}
</style>
