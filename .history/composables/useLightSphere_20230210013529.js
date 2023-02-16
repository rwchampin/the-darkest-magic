import gsap from 'gsap'
import fragment from '~/shaders/lightsphere/fragment.glsl'
import vertex from '~/shaders/lightsphere/vertex.glsl'
 const speedRandom = Math.random(10) / 10000;
import * as THREE from 'three'
export const useLightSphere = ({scene, camera, renderer }) => {
  const start = Date.now();
  const uniforms = {
	time: {
		type: "f",
		value: 1.0
	},
	pointscale: {
		type: "f",
		value: 1.0
	},
	decay: {
		type: "f",
		value: 2.0
	},
	complex: {
		type: "f",
		value: 2.0
	},
	waves: {
		type: "f",
		value: 3.0
	},
	eqcolor: {
		type: "f",
		value: 3.0
	},
	fragment: {
		type: "i",
		value: false
	},
	dnoise: {
		type: "f",
		value: 0.0
	},
	qnoise: {
		type: "f",
		value: 4.0
	},
	r_color: {
		type: "f",
		value: 0.0
	},
	g_color: {
		type: "f",
		value: 0.0
	},
	b_color: {
		type: "f",
		value: 0.0
	}
  };
  const options = {
	perlin: {
		vel: 0.002,
		speed: speedRandom,
		perlins: 1.0,
		decay: 0.4,
		complex: 0.0,
		waves: 10.0,
		eqcolor: 11.0,
		fragment: false,
		redhell: true
	},
	rgb: {
		r_color: 6.0,
		g_color: 0.0,
		b_color: 0.2
	},
	cam: {
		zoom: 10
	}
  };
 
  let mesh 
 
  const _ambientLights = new THREE.AmbientLight(0xffffff, 1);
	const hemi = new THREE.HemisphereLight(0xffffff, 0x000000, 1.4);
	const _lights = new THREE.PointLight(0xffffff, 0.5);
	_lights.position.set(20, 20, 20);
	function createGrid() {
	var gridHelper = new THREE.GridHelper(20, 20);
	gridHelper.position.y = -1;
	scene.add(gridHelper);
}
	scene.add(hemi, _lights);
	scene.add(_ambientLights);
	createGrid();
	const geo = new THREE.IcosahedronGeometry(1, 30);
	// const mat = new THREE.MeshBasicMaterial({color:0xFF0000 });
 mat = new THREE.ShaderMaterial({
		wireframe: false,
		uniforms: uniforms,
		vertexShader: vertex,
		fragmentShader: fragment
	});
	mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0,0,0)

 scene.add(mesh)

  
 
  onMounted(() => {
    scene.fog = new THREE.Fog(0x000000, 5, 15);
	scene.background = new THREE.Color(0x000000);
    
	mesh.scale.set(11, 11, 11);
    scene.add(mesh);

    gsap.ticker.add(updateLightSphere)
  })

function updateLightSphere() {

	var time = Date.now() * 0.003;

	gsap.to(camera.position,{ z: options.cam.zoom + 5, duration: 1 });

	 mesh.rotation.y += 0.001;
	mat.uniforms["time"].value = options.perlin.speed * (Date.now() - start);
	mat.uniforms["pointscale"].value = options.perlin.perlins;
	mat.uniforms["decay"].value = options.perlin.decay;
	mat.uniforms["complex"].value = options.perlin.complex;
	mat.uniforms["waves"].value = options.perlin.waves;
	mat.uniforms["eqcolor"].value = options.perlin.eqcolor;
	mat.uniforms["r_color"].value = options.rgb.r_color;
	mat.uniforms["g_color"].value = options.rgb.g_color;
	mat.uniforms["b_color"].value = options.rgb.b_color;
	mat.uniforms["fragment"].value = options.perlin.fragment;
}


  return updateLightSphere

}

 
  