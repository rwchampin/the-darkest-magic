import * as THREE from 'three'
import gsap from 'gsap'
import noise from '~/shaders/noise.glsl'
import soulUrl from '~/assets/matcaps/soul.png?url';


export const usePoints = ({ scene, camera, renderer, nuxtApp }) => {

    onMounted(() => {

let pts = new Array(10000).fill().map(() => {
    return new THREE.Vector3().randomDirection().multiplyScalar(Math.sqrt(Math.random()))
  }
)
let g = new THREE.BufferGeometry().setFromPoints(pts);
let u = {
  time: {value: 0}
}
let m = new THREE.PointsMaterial({
  //color: "aqua", 
  size: 0.0125,
  onBeforeCompile: shader => {
    shader.uniforms.time = u.time;
    shader.vertexShader = `
      uniform float time;
      //varying float vNz;
      ${noise}
      ${shader.vertexShader}
    `.replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>
        
        transformed += curlNoise(position + time * 0.05);
      
      `
    )/*.replace(
      `gl_PointSize = size;`,
      `gl_PointSize = size * vNz;`
    );*/
    //console.log(shader.vertexShader);
    /*shader.fragmentShader = `
      varying float vNz;
      
      // https://www.shadertoy.com/view/4dsSzr
      float square(float s) { return s * s; }
      vec3 square(vec3 s) { return s * s; }
      vec3 neonGradient(float t) {
        return clamp(vec3(t * 1.3 + 0.1, square(abs(0.43 - t) * 1.7), (1.0 - t) * 1.7), 0.0, 1.0);
      }

      ${shader.fragmentShader}
    `.replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `
      vec3 col = neonGradient(vNz);
      vec4 diffuseColor = vec4( col, opacity );
      `
    );
    console.log(shader.fragmentShader)*/
  }
});
let p = new THREE.Points(g, m);
scene.add(p);

let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  let t = clock.getElapsedTime() * 0.5;
  u.time.value = t;
  controls.update();
  renderer.render(scene, camera);
})
    })

}