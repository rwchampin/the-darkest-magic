
uniform sampler2D map;
uniform float effector;

varying vec2 vUv;
varying vec4 vPosition;

void main() 
{
gl_FragColor = vec4( 0.2,0.1,0.8,1.0 );
gl_FragColor *= 1.5;


}

