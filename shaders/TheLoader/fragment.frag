uniform float pointMultiplier;
uniform float uTime;
    
vec4 red(){
    return vec4(0.0,0.0,0.0,1.0);
}
vec4 black() {
    return vec4(0.,0.,0.,0.);
}
void main() {

    gl_FragColor= mix(red(), black(), 0.5);
}