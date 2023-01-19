uniform float pointMultiplier;
uniform float uTime;
attribute float size;



void main(){
    vec4 mvPosition = modelViewMatrix * vec4(position,1.0);

    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = size * pointMultiplier / gl_Position.w;
}