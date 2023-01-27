import * as THREE from 'three'
/**
   * Vignette shader
   * based on PaintEffect postprocess from ro.me
   * http://code.google.com/p/3-dreams-of-black/source/browse/deploy/js/effects/PaintEffect.js
   */
export const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    vignette: { value: 0.4 },
    exposure: { value: 1.4 },
    color: { value: new THREE.Color(0.66, 1.2, 0.66) },
  },
  vertexShader:
    /* glsl */
    `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
  fragmentShader:
    /* glsl */
    `
      uniform float offset;
      uniform float darkness;
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      void main() {
        // Eskil's vignette
        vec4 texel = texture2D( tDiffuse, vUv );
        vec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );
        gl_FragColor = vec4( mix( texel.rgb, vec3( 1.0 - darkness ), dot( uv, uv ) ), texel.a );
      }`,
}

