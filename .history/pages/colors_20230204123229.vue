<script lang="ts" setup>
import { Utils } from '~/utils'

onMounted(() => {
    Utils.color.renderColorSwatchGrid()
})
</script>

<template>
    <div class="swatch-grid" />
</template>
