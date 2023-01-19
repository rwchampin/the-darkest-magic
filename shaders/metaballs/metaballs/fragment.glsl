uniform vec3 u_color;
varying vec2 vUv;
float drawGradientArc(vec2 center, vec2 currentPosition, float scale) {
  float dist = distance(center, currentPosition) * (2.0 / scale);
  return 1.0 - dist;
}
void main() {
  vec2 center = vec2(0.5, 0.5);
  float alpha = drawGradientArc(center, vUv, 1.0);
  gl_FragColor = vec4(vec3(u_color), alpha);
}