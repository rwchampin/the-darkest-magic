export const useExplode = (duration = 1000) => {
  let tessellateGeometry = new THREE.BoxBufferGeometry(40, 40, 40)
  const tessellateMaterial = new THREE.ShaderMaterial({
    uniforms: {
      amplitude: { value: 0 },
    },
    vertexShader: `
    uniform float amplitude;

    attribute vec3 customColor;
    attribute vec3 vel;

    varying vec3 vColor;
    varying vec3 vNormal;


    void main() {
      vNormal = normal;
      vColor = customColor;

      // add velocity to position of vertices
      vec3 newPosition = position + vel * amplitude;

      gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
    }
  `,
    fragmentShader: `
    varying vec3 vColor;
    varying vec3 vNormal;

    void main() {
      const float ambient = 0.4; //nondirectional light


      vec3 light = vec3(1.0);
      light = normalize(light);

      float directional = max(dot(vNormal, light), 0.0);

      gl_FragColor = vec4(vColor * (ambient + directional), 1.0);
    }
  `,
  })
  const tessellateModifier = new TessellateModifier(8, 6)
  tessellateGeometry = tessellateModifier.modify(tessellateGeometry)
  const numFaces = tessellateGeometry.attributes.position.count / 3
  const colors = new Float32Array(numFaces * 3 * 3)
  const vel = new Float32Array(numFaces * 3 * 3)

  const color = new THREE.Color()
  const l = 0.5
  const s = 1.0

  for (let f = 0; f < numFaces; f++) {
    const index = f * 9
    const h = 0.5 + Math.random(0.5)
    color.setHSL(h, s, l)

    const dirX = Math.random() * 2 - 1
    const dirY = Math.random() * 2 - 1
    const dirZ = Math.random() * 2 - 1

    for (let i = 0; i < 3; i++) {
      colors[index + (i * 3)] = color.r
      colors[index + (i * 3) + 1] = color.g
      colors[index + (i * 3) + 2] = color.b

      vel[index + (i * 3)] = dirX
      vel[index + (i * 3) + 1] = dirY
      vel[index + (i * 3) + 2] = dirZ
    }
  }

  tessellateGeometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3))
  tessellateGeometry.setAttribute('vel', new THREE.BufferAttribute(vel, 3))

  const tessellateMesh = new THREE.Mesh(tessellateGeometry, tessellateMaterial)

  const animateTessellate = () => {
    const time = Date.now() * 0.00001
    tessellateMaterial.uniforms.amplitude.value += 0.1
  }
  return { tessellateMesh, animateTessellate }
}
