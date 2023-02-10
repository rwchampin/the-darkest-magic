import gsap from 'gsap'
import fragment from '~/shaders/lightsphere/fragment.glsl'
import vertex from '~/shaders/lightsphere/vertex.glsl'

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
  const speedRandom = Math.random(10) / 10000;

  let container, _width, _height, mat, _primitive;

  const primitiveElement = function () {
	const mesh = new THREE.Object3D();
	const geo = new THREE.IcosahedronGeometry(1, 6);
	//var mat = new THREE.MeshPhongMaterial({color:0xFF0000, flatShading:true});
	mat = new THREE.ShaderMaterial({
		wireframe: false,
		uniforms: uniforms,
		vertexShader: vertex,
		fragmentShader: fragment
	});
	const mesh = new THREE.Mesh(geo, mat);
	//---
	mesh.add(mesh);
};

function createPrimitive() {
	_primitive = new primitiveElement();
	_primitive.mesh.scale.set(1, 1, 1);
	scene.add(_primitive.mesh);
}
function createGrid() {
	var gridHelper = new THREE.GridHelper(20, 20);
	gridHelper.position.y = -1;
	scene.add(gridHelper);
}

  const init = () => {
 
    // createLights();
    //createGrid();
    createPrimitive();
 
    //---.2
    animation();
  }

  onMounted(() => {
    scene.fog = new THREE.Fog(0x000000, 5, 15);
	scene.background = new THREE.Color(0x000000);
    init()
  })

function updateSphere() {

	var time = Date.now() * 0.003;

	gsap.to(camera.position,{ z: options.cam.zoom + 5, duration: 1 });

	_primitive.mesh.rotation.y += 0.001;
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


  return updateSphere

}

 
 
//--------------------------------------------------------------------
// var _ambientLights, _lights;
// function createLights() {
// 	_ambientLights = new THREE.AmbientLight(0xffffff, 1);
// 	_ambientLights = new THREE.HemisphereLight(0xffffff, 0x000000, 1.4);
// 	_lights = new THREE.PointLight(0xffffff, 0.5);
// 	_lights.position.set(20, 20, 20);
	
// 	scene.add(_lights);
// 	scene.add(_ambientLights);
// }
//--------------------------------------------------------------------


// function createGUI() {
// 	var gui = new dat.GUI();
// 	//gui.close();

// 	var configGUI = gui.addFolder("Setup");
// 	configGUI.add(options.perlin, "speed", 0.0, 0.001);
// 	configGUI.add(options.cam, "zoom", 0, 30);
// 	configGUI.open();

// 	var perlinGUI = gui.addFolder("Perlin");
// 	perlinGUI.add(options.perlin, "decay", 0.0, 1.0).name("Decay").listen();
// 	//perlinGUI.add(options.perlin, 'complex', 0.0, 100.0).name('Complex').listen();
// 	perlinGUI.add(options.perlin, "waves", 0.0, 10.0).name("Waves").listen();
// 	perlinGUI.open();

// 	var colorGUI = gui.addFolder("Color");
// 	colorGUI.add(options.perlin, "eqcolor", 3.0, 50.0).name("Color").listen();
// 	colorGUI.add(options.rgb, "r_color", 0.0, 10.0).name("Red").listen();
// 	colorGUI.add(options.rgb, "g_color", 0.0, 10.0).name("Green").listen();
// 	colorGUI.add(options.rgb, "b_color", 0.0, 10.0).name("Blue").listen();
// 	colorGUI.open();
// }

//--------------------------------------------------------------------

