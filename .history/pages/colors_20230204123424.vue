<script lang="ts" setup>
import { Utils } from '~/utils'

onMounted(() => {
    const swatchGrid = Utils.color.renderColorSwatchGrid(Utils.color.colorList)
})
</script>

<template>
    {{ swatchGrid }}
</template>
