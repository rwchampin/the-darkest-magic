import * as THREE from 'three'
import gsap from 'gsap'
import chroma from 'chroma-js'


export const usePoints = ({ scene, camera, renderer, nuxtApp }) => {


    let material, positions = [], sizes = [], colors = [], particles;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    const clock = new THREE.Clock();
    scene.fog = new THREE.FogExp2(0x000000, 0.01);
    const colorList = chroma.scale(["black", 'darkblue', 'lightblue', "violet"]).colors(20);
    const geometry = new THREE.BufferGeometry();
    const tex = new THREE.TextureLoader().load('~/assets/particles/dotTexture.png?url')


    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            pointTexture: { value: tex }
        },
        vertexShader: `
           attribute float size;

			varying vec3 vColor;

			void main() {

				vColor = color;

				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

				gl_PointSize = size * ( 300.0 / -mvPosition.z );

				gl_Position = projectionMatrix * mvPosition;

			}
        `,
        fragmentShader: `
           uniform sampler2D pointTexture;

			varying vec3 vColor;

			void main() {

				gl_FragColor = vec4( vColor, 1.0 );

				gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

			}
        `,
        blending: THREE.AdditiveBlending,
					depthTest: false,
					transparent: true,
					vertexColors: true
    })
    material = new THREE.PointsMaterial({
    size: .1,
        sizeAttenuation: true,
        alphaTest: .5,
        color: 0x000000,
        // blending: THREE.AdditiveBlending,
					depthTest: false,
					transparent: true,
					vertexColors: true,
            // map: tex
    })
    const radius = 3;
    const t = clock.getElapsedTime();
    let theta = 0, phi = 0;
    for (let i = 0; i < 1000; i++) {

      

      theta += 2 * Math.PI * Math.random();
      phi += Math.acos(2 * Math.random() - 1);
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)

      positions.push(x, y, z);
        sizes.push(Math.random()*10)
        const hex = colorList[Math.round(Math.random() * colorList.length)]
        const rgb = new THREE.Color(hex)
        colors.push(rgb.r, rgb.g, rgb.b)
    }

   geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
				geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
				geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ).setUsage( THREE.DynamicDrawUsage ) );

    geometry.computeBoundingSphere();


    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    const ps = geometry.attributes.position.array;
    const count = ps.length;

    const updateParticles = () => {
        // const positions = particles.geometry.attributes.position.array;
         
var renderer, scene, camera, dots;
var ww = 740,
  wh = 740;
var width = document.body.offsetWidth;
if (width < 321) {
  (ww = 300), (wh = 300);
} else if (width < 416) {
  (ww = 340), (wh = 340);
} else if (width < 1025) {
  (ww = 540), (wh = 540);
} else if (width < 1281) {
  (ww = 640), (wh = 640);
}
var density = 500;
var mouse = { x: 1, y: 1 };
function init() {
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("canvas"),
    antialias: true,
  });
  renderer.setClearColor(0x000000);
  renderer.setSize(ww, wh);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, ww / wh, 0.1, 10000);
  camera.position.z = 500;
  scene.add(camera);
  var geometry = new THREE.Geometry();
  for (var i = 0; i < density; i++) {
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  }
  var material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2,
    transparent: true,
    opacity: 0.75,
  });
  star = new THREE.Points(geometry, material);
  scene.add(star);
  var geometry = new THREE.SphereGeometry(200, 20, 20);
  var material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.05,
    wireframe: true,
  });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  requestAnimationFrame(render);
}
function onResize() {
  ww = window.innerWidth;
  wh = window.innerHeight;
  camera.aspect = ww / wh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, wh);
}
function onMousemove(e) {
  mouse.x = e.clientX / ww;
  mouse.y = e.clientY / wh;
}
function createStar(a) {
  for (var i = 0; i < density; i++) {
    var theta = (i / density) * (mouse.x * 100);
    var delta = (i / density - 0.5) * Math.PI * mouse.y;
    var x = 200 * Math.cos(delta) * Math.cos(theta);
    var y = 200 * Math.cos(delta) * Math.sin(theta);
    var z = 200 * Math.sin(delta);
    star.geometry.vertices[i].x = x;
    star.geometry.vertices[i].y = y;
    star.geometry.vertices[i].z = z;
  }
  star.geometry.verticesNeedUpdate = true;
}
function render(a) {
  requestAnimationFrame(render);
  star.rotation.x += 0.004;
  star.rotation.y += 0.004;
  star.rotation.z -= 0.004;
  sphere.rotation.x += 0.004;
  sphere.rotation.y += 0.004;
  sphere.rotation.z -= 0.004;
  createStar(a);
  renderer.render(scene, camera);
}
init();
//     }

// } 