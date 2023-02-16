import gsap from 'gsap'
import fragment from '~/shaders/lightsphere/fragment.glsl'
import vertex from '~/shaders/lightsphere/vertex.glsl'
 const speedRandom = Math.random(10) / 10000;

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
 
  let mesh, mat;

  const PrimitiveElement = function () {

	const geo = new THREE.IcosahedronGeometry(2, 6);
	//var mat = new THREE.MeshPhongMaterial({color:0xFF0000, flatShading:true});
 mat = new THREE.ShaderMaterial({
		wireframe: false,
		uniforms: uniforms,
		vertexShader: vertex,
		fragmentShader: fragment
	});
	mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0,0,0)

};

  
 
  onMounted(() => {
    scene.fog = new THREE.Fog(0x000000, 5, 15);
	scene.background = new THREE.Color(0x000000);
    
	mesh.scale.set(1, 1, 1);
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

 
  