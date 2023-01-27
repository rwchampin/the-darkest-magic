export const ParticleSystem = function () {
  const particles = []

  function addParticle(particle) {
    particles.push(particle)
  }

  function update() {
    particles.forEach((particle) => {
      particle.update()
    })
  }

  return {
    addParticle,
    update,
  }
}

// Path: particles/Particle.js
