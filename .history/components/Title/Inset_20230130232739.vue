<script setup lang="ts">

</script>

<template>
  <h1 class="inset-title">
    <slot />
  </h1>
</template>

<style scoped>
.inset-title {
    text-shadow: var(--text-shadow-inset);
    font-size: var(--size-header-1);
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
