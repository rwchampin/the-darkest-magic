<script  setup>
import { Utils } from '~/utils'
debugger

onMounted(() => {
    const swatchGrid = Utils.color.renderColorSwatchGrid(Utils.color.colorList)
    document.body.appendChild(swatchGrid)
})
</script>
