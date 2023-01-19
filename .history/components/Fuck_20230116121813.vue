<script setup>
onMounted(() => {
  const c3 = document.querySelector('.main-canvas-3d')
  const c2 = document.querySelector('.main-canvas-2d')

  const experience = new Experience({
    targetElement: c3,
    ctx: c2,
  })

  class Particle {
    constructor(x, y) {
      this.position = new THREE.Vector2(x, y)
      this.velocity = new THREE.Vector2(0, 0)
      this.lastPosition = new THREE.Vector2(0, 0)
      this.radius = Math.random() * 10
      this.weight = Math.random() * 2
    }

    lerp(a, b, n) {
        /**
         * @param {number} a
         * @param {number} b
         * @param {number} n
         * @return {number}
         */@description 
        /* Linear interpolation */

         */
      return (1 - n) * a + n * b
    }
    update() {
      this.lastPosition = this.position.clone()
      this.velocity.y += this.weight * Math.random()
      this.velocity.x += this.weight * Math.random()
      this.position.add(this.velocity)
    }

    drawLerp() {
      const ctx = experience.ctx
      ctx.beginPath()
      ctx.moveTo(this.lastPosition.x, this.lastPosition.y)
      ctx.lineTo(this.position.x, this.position.y)
      ctx.strokeStyle = 'white'
      ctx.stroke()
      ctx.closePath()
    }

  }
})
</script>
