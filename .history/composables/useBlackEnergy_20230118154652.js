import * as THREE from 'three'

const vertex = `

uniform float u_time;
uniform float u_mouse;
uniform vec2 u_resolution;

attribute vec2 a_position;
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }

  vec3 snoiseVec3( vec3 x ){

  float s  = snoise(vec3( x ));
  float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
  float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
  vec3 c = vec3( s , s1 , s2 );
  return c;

}


vec3 curlNoise( vec3 p ){
  
  const float e = .1;
  vec3 dx = vec3( e   , 0.0 , 0.0 );
  vec3 dy = vec3( 0.0 , e   , 0.0 );
  vec3 dz = vec3( 0.0 , 0.0 , e   );

  vec3 p_x0 = snoiseVec3( p - dx );
  vec3 p_x1 = snoiseVec3( p + dx );
  vec3 p_y0 = snoiseVec3( p - dy );
  vec3 p_y1 = snoiseVec3( p + dy );
  vec3 p_z0 = snoiseVec3( p - dz );
  vec3 p_z1 = snoiseVec3( p + dz );

  float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
  float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
  float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

  const float divisor = 1.0 / ( 2.0 * e );
  return normalize( vec3( x , y , z ) * divisor );

}

varying vec3 newPosition;

void main() {
    gl_PointSize = 1.;
    float speed = 20.;
	  newPosition = position * (1. + curlNoise(position+u_time/speed)* 0.1);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

const fragment = `
uniform float u_time;
uniform float u_mouse;
uniform vec2 u_resolution;
varying vec3 newPosition;

void main() {
  vec4 b = vec4(0.,0.,0., 1.0);
  vec4 c = vec4(1.,0.,0.,1.0);
  vec4 t = mix(b,c, 0.99);
  vec4 r = vec4(1.0, 0.0, 0.0, 1.0);
  gl_FragColor = r;
}
`

function randomSpherePoint(x0, y0, z0, radius) {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  const x = x0 + radius * Math.sin(phi) * Math.cos(theta)
  const y = y0 + radius * Math.sin(phi) * Math.sin(theta)
  const z = z0 + radius * Math.cos(phi)
  return [x, y, z, u, v]
}

export const useBlackEnergy = (nuxtApp) => {
  const time = Date.now() / 3000

  const stars = () => {
    const num = 700
    const starsGeometry = new THREE.BufferGeometry()
    const verts = []
    for (let i = 0; i < num; i++) verts.push(...randomSpherePoint())

    const positions = new Float32Array(verts)
    starsGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    )
    starsGeometry.attributes.position.needsUpdate = true
    const uniforms = {
      u_resolution: { type: 'v2', value: new THREE.Vector2(0, 0) },
      u_time: { type: 'f', value: 1.0 },
    }

    const starsMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    const theStars = new THREE.Points(starsGeometry, starsMaterial)
    return theStars
  }
  const planet = () => {
    const planGeo = new THREE.SphereGeometry(0.05, 32, 32)

    const planMat = new THREE.MeshMatcapMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 1,
      alphaMap: 'none',
      depthTest: true,
      depthWrite: true,
      alphaTest: 0,
      visible: true,
      side: THREE.DoubleSide,
      // matcap: nuxtApp.$resources.items.soulCap,
    })
    planGeo.computeBoundingSphere()
    const thePlanet = new THREE.Mesh(planGeo, planMat)
    return thePlanet
  }

  const starLights = () => {
    const dl = new THREE.DirectionalLight(0xFF0000, 1)
    dl.castShadow = true
    dl.position.set(0, 0, 0)

    dl.shadow.mapSize.width = 512 // default
    dl.shadow.mapSize.height = 512 // default
    dl.shadow.camera.near = 0.5 // default
    dl.shadow.camera.far = 500 // default
    const theStarLights = dl
    return theStarLights
  }

  const obj = { stars: stars(), planet: planet(), starLights: starLights() }
  return obj
}
