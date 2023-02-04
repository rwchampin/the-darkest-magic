<script lang="ts" setup>
import { Utils } from '~/utils'

onMounted(() => {
    Utils.color.renderColorSwatchGrid(Utils.color.colorList)
})
</script>

<template>
    <div class="swatch-grid" />
</template>
