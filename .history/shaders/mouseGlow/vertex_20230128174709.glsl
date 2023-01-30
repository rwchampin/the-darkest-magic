uniform float uTime;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
uniform vec3 uLight;
varying vec3 vPosition;
varying vec3 vNormal;
 
varying vec3 v_worldPosition;
float PI = 3.141592653589793238;

void main() {
    vUv=uv; 
    vPosition = position;
    gl_Position =  projectionMatrix*modelViewMatrix*vec4(position,1.);
}   
