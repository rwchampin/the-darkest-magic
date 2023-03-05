<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="bb-button-wrapper">
    <div class="bb-button">
      {{ props.text }}
    </div>
    <div class="action" />
  </div>
</template>

<style scoped>
.bb-button-wrapper {
    overflow: hidden;
    border-radius: 6px;
    /* box-shadow: 0 0 10px #0bdc89;
    border: 2px solid #1daea5; */
    box-shadow: 0 0 10px #ff0000;
    border: 2px solid #ff000069;
    display: inline-block;
}
.error-btn {

}
.bb-button {

    border: 0 solid #e5e7eb;
    box-sizing: border-box;
    font-family: Roboto, Arial, sans-serif;
    font-weight: bold;
    white-space: nowrap;
    background: linear-gradient(to bottom, #111111, #000000);
    color: #FFF;
    font-size: 14px;
    padding: 25px 50px;
    text-transform: small-caps;
    letter-spacing: 10px !important;
}
.bb-button-wrapper:active {
  transform: scale(0.95);
}
</style>
