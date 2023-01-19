export const pointsShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2() },
    },
    vertexShader: `
                uniform float time;
                varying vec2 vUv;

                void main() {

                    pointNoise = snoise(vec3(pos.x * 0.1, pos.y * 0.1, time * 0.1));

                    vUv = uv;
                    vec3 pos = position;
                    vec3 pointRotation = vec3(0.0, 0.0, 0.0);



                    pointRotation.x = sin(pos.x * 10.0 + time) * 0.05;
                    pointRotation.y = sin(pos.y * 10.0 + time) * 0.05;
                    pointRotation.z = sin(pos.z * 10.0 + time) * 0.05;
                    pos += pointRotation;
                    float numParticles = 1000.0;
                    float spacing = 0.1;

                    float x = mod(float(gl_VertexID), numParticles);
                    float y = floor(float(gl_VertexID) / numParticles);
                    pos.x = x * spacing * pointNoise;
                    pos.y = y * spacing * pointNoise;
                    pos.z = 0.0;

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