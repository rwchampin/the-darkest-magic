<script setup>
import { Utils } from '~/utils'
debugger

onMounted(() => {
    Utils.color.renderColorSwatchGrid(Utils.color.colorList)
})
</script>
