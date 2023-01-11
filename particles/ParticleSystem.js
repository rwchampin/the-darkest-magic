export const ParticleSystem = function () {
  const particles = [];

  function buildEnvironment() {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.setAttribute("id", "particle-canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    return { canvas, ctx };
  }

  function addParticle(particle) {
    particles.push(particle);
  }

  function update() {
    particles.forEach((particle) => {
      particle.update();
    });
  }

  return {
    addParticle,
    update,
  };
};

// Path: particles/Particle.js
