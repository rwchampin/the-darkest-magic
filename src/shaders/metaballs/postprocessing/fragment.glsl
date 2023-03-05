 uniform sampler2D tDiffuse;
    varying vec2 vUv;
    void main() {
      vec4 currentScreen = texture2D(tDiffuse, vUv);
      gl_FragColor = vec4(currentScreen.xyz * 1.5, currentScreen.w) * max(sign(currentScreen.w - 0.8), 0.0);
    }