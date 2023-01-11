<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent } from 'vue'

const railStyle = ({
  focused,
  checked,
}: {
  focused: boolean
  checked: boolean
}) => {
  const style: CSSProperties = {}
  if (checked) {
    style.background = 'green'
    if (focused)
      style.boxShadow = '0 0 0 2px black'
  }
  else {
    // style.background = '#2080f0'
    if (focused)
      style.boxShadow = '0 0 0 2px #2080f040'
  }
  return style
}
</script>

<template>
  <The3dSwitch />
</template>

<style scoped>
.n-switch {
    overflow: hidden;
    background: transparent;
}

.n-switch__button--icon {
    --n-switch-checked-color: #fff;
    --n-switch-checked-bg-color: #000;
    --n-switch-unchecked-color: #000;
    --n-switch-unchecked-bg-color: #fff;
    padding: 6px;
}
</style>

