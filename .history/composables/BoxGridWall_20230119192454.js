export const BoxGridWall = (props) => {
    onMounted(() => {
        nextTick(() => {
          var tick = 0,
	smallestDimension = Math.min( window.innerWidth, window.innerHeight ),
	viewportWidth = smallestDimension,
	viewportHeight = smallestDimension,
	worldWidth = 100,
	worldHeight = 100,
	rows = 30,
	cols = 30,
	tileWidth = worldWidth / cols,
	tileHeight = worldHeight / rows,
	FOV = 90,
	scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera( 
		FOV,
		viewportWidth / viewportHeight,
		0.1,
		1000
	),
	renderer = new THREE.WebGLRenderer({
		antialias: true
	}),
	plane = new THREE.Mesh(
		new THREE.PlaneBufferGeometry( worldWidth, worldHeight, 1 ),
		new THREE.MeshPhongMaterial({
			color: 0x222222
		})
	),
	cubes = new THREE.Object3D(),
	spotLight = new THREE.SpotLight( 0xffffff ),
	ambientLight = new THREE.AmbientLight( 0x666666 );

renderer.setSize( viewportWidth, viewportHeight );
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;

scene.add( plane );
scene.add( cubes );
scene.add( spotLight );
scene.add( ambientLight );

for( var x = 0; x < cols; x++ ) {
	for( var y = 0; y < rows; y++ ) {
		var width = tileWidth,
			height = tileHeight,
			dx = ( cols / 2 - x ),
			dy = ( rows / 2 - y ),
			depth = 1 + ( 20 - Math.sqrt( dx * dx + dy * dy ) ) / 4,
			xBase = -worldWidth / 2 + x * tileWidth + tileWidth / 2,
			yBase = -worldHeight / 2 + y * tileHeight + tileHeight / 2,
			zBase = depth / 2,
			cube = new THREE.Mesh(
				new THREE.BoxGeometry( width, height, depth ), 
				new THREE.MeshPhongMaterial({
					color: 'rgb(' + ~~( ( y / rows ) * 255 ) + ', ' + ~~( ( x / cols ) * 255 ) + ', 255)',
					shininess: 50
				})
			);
		cube.position.set(
			xBase,
			yBase,
			zBase
		);
		cube.castShadow = true;
		cube.receiveShadow = true;
		cube.zBase = zBase;
		cube.zScaleTarget = 1;
		cubes.add( cube );
	}
}

plane.position.set( 0, 0, 0 );
plane.castShadow = false;
plane.receiveShadow	= true;

camera.position.set( 0, 0, 100 );

spotLight.position.set( 0, 0, 100 );
spotLight.castShadow = true;
spotLight.shadowCameraNear = 0.1;
spotLight.shadowMapWidth = 2048;
spotLight.shadowMapHeight = 2048;
spotLight.shadowDarkness = 0.1;

function step() {
	spotLight.position.x = Math.sin( tick / 100 ) * ( worldWidth / 2 );
	spotLight.position.y = Math.cos( tick / 100 ) * ( worldHeight / 2 );
	
	cubes.traverse( function( cube ) {
		if( cube instanceof THREE.Mesh ) {
			if( Math.abs( cube.scale.z - cube.zScaleTarget ) > 0.001 ) {
				cube.scale.z += ( cube.zScaleTarget - cube.scale.z ) * 0.05;
			} else {
				cube.zScaleTarget = 1 + Math.random() * 10;
			}
			cube.position.z = cube.geometry.parameters.depth / 2 * cube.scale.z;
		}
	});
	
	tick++;
}

function render() {
	renderer.render( scene, camera );
}

function loop() {
	requestAnimationFrame( loop );
	step();
	render();
}

loop();

document.body.appendChild( renderer.domElement );
        });
    });