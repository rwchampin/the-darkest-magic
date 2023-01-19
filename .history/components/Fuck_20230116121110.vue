<script setup>
onMounted(() => {
  const c3 = document.querySelector('.main-canvas-3d')
  const c2 = document.querySelector('.main-canvas-2d')

  const experience = new Experience({
    targetElement: c3,
    ctx: c2,
  })

  class Paerticle {
    constructor(x, y) {
      this.position = new THREE.Vector2(x, y)
      this.velocity = new THREE.Vector2(0, 0)
      this.lastPosition = new THREE.Vector2(0, 0)
      this.radius = Math.random() * 10
      this.weight = Math.random() * 2
    }
  }
})
</script>
