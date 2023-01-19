export const pointsShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2() },
    },
    vertexShader: `
                uniform float time;
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    vec3 pointRotation = vec3(0.0, 0.0, 0.0);
                    pointRotation.x = sin(pos.x * 10.0 + time) * 0.05;
                    pointRotation.y = sin(pos.y * 10.0 + time) * 0.05;
                    pointRotation.z = sin(pos.z * 10.0 + time) * 0.05;
                    pos += pointRotation;
                    float numParticles = 1000.0;
                    float spacing = 0.1;
                    float x = mod(gl_VertexID, numParticles) * spacing;
                    float y = floor(gl_VertexID / numParticles) * spacing;
                    pos.x = x;
                    pos.y = y;
                    pos.z += sin(pos.x * 10.0 + time) * 0.05;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);


                }
            `,
    fragmentShader: `
                uniform vec2 resolution;
                varying vec2 vUv;
                void main() {
                    vec2 st = gl_FragCoord.xy / resolution.xy;
                    vec3 color = vec3(0.0);
                    color.r = vUv.x;
                    color.g = vUv.y;
                    color.b = 0.0;
                    gl_FragColor = vec4(color, 1.0);
                }