

const Calc = require('./utils/calc');
const Ease = require('./utils/ease');
const AxisHelper = require('./utils/axis');

class Loader {

	constructor(System) {
		this.calc = new Calc();
		this.ease = new Ease();

		this.dom = {
			html: document.documentElement,
			container: document.querySelector('.loader'),
			timescaleWrap: document.querySelector('.timescale-wrap'),
			timescaleRange: document.querySelector('.timescale-range'),
			timescaleValue: document.querySelector('.timescale-value'),
			replayButton: document.querySelector('.replay-animation'),
			debugButton: document.querySelector('.icon--debug')
		}

		this.dom.html.classList.add('loading');

		this.completed = false;
		this.raf = null;

		this.setupDebug();
		this.setupTime();
		this.setupScene();
		this.setupCamera();
		this.setupRenderer();
		this.setupControls();
		this.setupHelpers();
		this.listen();
		this.onResize();

		this.system = new System(this);
		this.loop();
	}

	setupDebug() {
		this.isDebug = location.hash.indexOf('debug') > 0;
		this.isGrid = location.hash.indexOf('grid') > 0;
		this.isOrbit = location.hash.indexOf('orbit') > 0;

		this.debugHash = '';

		if(this.isDebug) {
			this.isGrid = true;
			this.isOrbit = true;
			this.debugHash += 'debug';
			this.dom.html.classList.add('is-debug');
		} else {
			this.debugHash += this.isGrid ? 'grid' : '';
			this.debugHash += this.isOrbit ? 'orbit' : '';
		}

		if(this.debugHash) {
			[].slice.call(document.querySelectorAll('.demo')).forEach((elem, i, arr) => {
				elem.setAttribute('href', `${elem.getAttribute('href')}#${this.debugHash}`);
			});
		}
	}

	setupTime() {
		this.timescale = 1;
		this.clock = new THREE.Clock();
		this.deltaTimeSeconds = this.clock.getDelta() * this.timescale;
		this.deltaTimeMilliseconds = this.deltaTimeSeconds * 1000;
		this.deltaTimeNormal = this.deltaTimeMilliseconds / (1000 / 60);
		this.elapsedMilliseconds = 0;
	}

	setupScene() {
		this.scene = new THREE.Scene();
	}

	setupCamera() {
		this.camera = new THREE.PerspectiveCamera(100, 0, 0.0001, 10000);

		this.cameraBaseX = this.isGrid ? -20 : 0;
		this.cameraBaseY = this.isGrid ? 15 : 0;
		this.cameraBaseZ = this.isGrid ? 20 : 30;

		this.camera.position.x = this.cameraBaseX;
		this.camera.position.y = this.cameraBaseY;
		this.camera.position.z = this.cameraBaseZ;
	}

	setupRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		});

		this.dom.container.appendChild(this.renderer.domElement);
	}

	setupControls() {
		if(this.isOrbit) {
			this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
			this.controls.enableDamping = true;
			this.controls.dampingFactor = 0.2;
			this.controls.enableKeys = false;

			this.dom.timescaleWrap.style.visibility = 'visible';
		}
	}

	setupHelpers() {
		if(this.isGrid) {
			this.gridOpacityMap = [
				0.4, // 1
				0.2, // 2
				0.2, // 3
				0.2, // 4
				0.1, // 5
				0.2, // 6
				0.1, // 7
				0.1  // 8
			];
			this.gridHelper = new THREE.GridHelper(300, 60, 0xffffff, 0xffffff);
			this.gridHelper.material.transparent = true;
			this.gridHelper.material.opacity = this.gridOpacityMap[demoNum - 1];
			this.scene.add(this.gridHelper);

			this.axisOpacityMap = [
				1, // 1
				0.6, // 2
				0.6, // 3
				0.6, // 4
				0.3, // 5
				0.6, // 6
				0.3, // 7
				0.3  // 8
			];
			this.axisHelper = new AxisHelper(150, this.axisOpacityMap[demoNum - 1]);
			this.scene.add(this.axisHelper);

			this.camera.lookAt(new THREE.Vector3());
		}
	}

	update() {
		this.deltaTimeSeconds = this.clock.getDelta();
		if(this.diffTime) {
			this.deltaTimeSeconds -= this.diffTime;
			this.diffTime = 0;
		}
		this.deltaTimeSeconds *= this.timescale;
		this.deltaTimeMilliseconds = this.deltaTimeSeconds * 1000;
		this.deltaTimeNormal = this.deltaTimeMilliseconds / (1000 / 60);
		this.elapsedMilliseconds += this.deltaTimeMilliseconds;

		this.system.update();

		if(this.isOrbit) {
			this.controls.update();
		}
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	listen() {
		window.addEventListener('resize', (e) => this.onResize(e));

		this.dom.replayButton.addEventListener('click', (e) => this.onReplayButtonClick(e));
		this.dom.debugButton.addEventListener('click', (e) => this.onDebugButtonClick(e));

		if(this.isOrbit) {
			this.dom.timescaleRange.addEventListener('change', (e) => this.onTimescaleRangeChange(e));
			this.dom.timescaleRange.addEventListener('mousemove', (e) => this.onTimescaleRangeChange(e));
		}

		this.hidden = null;
		this.visibilityChange = null;
		if(typeof document.hidden !== 'undefined') {
			this.hidden = 'hidden';
			this.visibilityChange = 'visibilitychange';
		} else if(typeof document.msHidden !== 'undefined') {
			this.hidden = 'msHidden';
			this.visibilityChange = 'msvisibilitychange';
		} else if(typeof document.webkitHidden !== 'undefined') {
			this.hidden = 'webkitHidden';
			this.visibilityChange = 'webkitvisibilitychange';
		}
		if(typeof document.addEventListener === 'undefined' || typeof document.hidden === 'undefined') {
		} else {
			window.addEventListener(this.visibilityChange, (e) => this.onVisibilityChange(e));
		}
	}

	replay() {
		document.documentElement.classList.remove('completed');
		document.documentElement.classList.add('loading');

		this.camera.position.x = this.cameraBaseX;
		this.camera.position.y = this.cameraBaseY;
		this.camera.position.z = this.cameraBaseZ;

		this.timescale = 1;
		this.deltaTimeSeconds = 1 / 60;
		this.deltaTimeMilliseconds = this.deltaTimeSeconds * 1000;
		this.deltaTimeNormal = this.deltaTimeMilliseconds / (1000 / 60);
		this.elapsedMilliseconds = 0;
		this.blurTime = 0;
		this.diffTime = 0;
		this.focusTime = 0;

		this.system.replay();
		this.completed = false;
		this.clock.start();
		this.loop();
	}

	complete() {
		if(this.isOrbit || this.isGrid) {
			return;
		}
		setTimeout(() => {
			this.clock.stop();
			cancelAnimationFrame(this.raf);
		}, 600);
		this.completed = true;
		this.dom.html.classList.remove('loading');
		this.dom.html.classList.add('completed');
	}

	onResize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.dpr = window.devicePixelRatio > 1 ? 2 : 1

		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();

		this.renderer.setPixelRatio(this.dpr);
		this.renderer.setSize(this.width, this.height);
	}

	onReplayButtonClick(e) {
		e.preventDefault();
		this.replay();
	}

	onDebugButtonClick(e) {
		e.preventDefault();
		let baseURL = window.location.href.split('#')[0];
		if(this.isDebug) {
			if(history) {
				history.pushState('', document.title, window.location.pathname);
			} else {
				location.hash = '';
			}
			location.href = baseURL;
		} else {
			location.href = `${baseURL}#debug`;
		}
		location.reload();
	}

	onTimescaleRangeChange(e) {
		this.timescale = parseFloat(this.dom.timescaleRange.value);
		this.dom.timescaleValue.innerHTML = this.timescale.toFixed(1);
	}

	onVisibilityChange(e) {
		if(document.hidden) {
			this.blurTime = Date.now();
		} else {
			this.focusTime = Date.now();
			if(this.blurTime) {
				this.diffTime = (this.focusTime - this.blurTime) / 1000;
			}
		}
	}

	loop() {
		this.update();
		this.render();
		this.raf = window.requestAnimationFrame(() => this.loop());
	}

}


class Osc {

	constructor(val, rate, dir = true, flip = false) {
		this._val = val;
		this._rate = rate;
		this._dir = dir;
		this._flip = flip;

		this._valBase = val;
		this._rateBase = rate;
		this._dirBase = dir;
		this._flipBase = flip;

		this.trigger = false;
		this.triggerTop = false;
		this.triggerBot = false;
	}

	reset() {
		this._val = this._valBase;
		this._rate = this._rateBase;
		this._dir = this._dirBase;
		this._flip = this._flipBase;

		this.trigger = false;
		this.triggerTop = false;
		this.triggerBot = false;
	}

	update(dt) {
		this.trigger = false;
		this.triggerTop = false;
		this.triggerBot = false;
		if(this._dir) {
			if(this._val < 1) {
				this._val += this._rate * dt;
			} else {
				this.trigger = true;
				this.triggerTop = true;
				if(this._flip) {
					this._val = this._val - 1;
				} else {
					this._val = 1 - (this._val - 1);
					this._dir = !this._dir;
				}
			}
		} else {
			if(this._val > 0) {
				this._val -= this._rate * dt;
			} else {
				this.trigger = true;
				this.triggerBot = true;
				if(this._flip) {
					this._val = 1 + this._val;
				} else {
					this._val = -(this._val);
					this._dir = !this._dir;
				}
			}
		}
	}

	val(ease) {
		if(ease) {
			return ease(this._val, 0, 1, 1);
		} else {
			return this._val;
		}
	}

}

module.exports = Osc;
class SystemBase {

	constructor(loader) {
		this.loader = loader;

		this.calc = this.loader.calc;
		this.ease = this.loader.ease;

		this.sphereGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
		this.boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
		this.center = new THREE.Vector3();

		this.particles = [];
		this.particleGroup = new THREE.Object3D();
		this.particleGroup.scale.set(0.0001, 0.0001, 0.0001);

		this.loader.scene.add(this.particleGroup);

		this.entering = true;
		this.enterProgress = 0;
		this.enterRate = 0.015;

		this.exiting = false;
		this.exitProgress = 0;
		this.exitRate = 0.01;
		this.duration = Infinity;
	}

	update() {
		let i = this.particles.length;
		while(i--) {
			this.particles[i].update();
		}

		if(this.entering && this.enterProgress < 1) {
			this.enterProgress += this.enterRate * this.loader.deltaTimeNormal;
			if(this.enterProgress > 1) {
				this.enterProgress = 1;
				this.entering = false;
			}
			let scale = this.ease.inOutExpo(this.enterProgress, 0, 1, 1);
			this.particleGroup.scale.set(scale, scale, scale);
		}

		if(!this.exiting && this.loader.elapsedMilliseconds > this.duration) {
			this.exiting = true;
		}

		if(this.exiting) {
			this.exitProgress += this.exitRate * this.loader.deltaTimeNormal;
			if(this.exitProgress >= 1 && !this.loader.completed) {
				this.exitProgress = 1;
				this.loader.complete();
			}
		}
	}

	replay() {
		this.particleGroup.scale.set(0.0001, 0.0001, 0.0001);

		let i = this.particles.length;
		while(i--) {
			this.particles[i].reset();
		}

		this.entering = true;
		this.enterProgress = 0;

		this.exiting = false;
		this.exitProgress = 0;
	}

}


class System extends SystemBase {

	constructor(loader) {
		super(loader);

		this.duration = 9300;
		this.simplex = new FastSimplexNoise();
		this.color = new THREE.Color();

		this.texture = this.generateTexture();
		this.size = 10;
		this.scale = 1;
		this.base = 20;
		this.count = this.base * this.base * this.base;
		this.geometry = new THREE.BufferGeometry();
		this.parts = [];

		this.positions = new Float32Array(this.count * 3);
		this.colors = new Float32Array(this.count * 4);
		this.sizes = new Float32Array(this.count);

		this.geometry.addAttribute('position', new THREE.BufferAttribute(this.positions, 3));
		this.geometry.addAttribute('color', new THREE.BufferAttribute(this.colors, 4));
		this.geometry.addAttribute('size', new THREE.BufferAttribute(this.sizes, 1));

		for(let i = 0; i < this.count; i++) {
			let size = this.calc.rand(0.1, 0.8);
			this.parts.push({
				offset: 0,
				position: new THREE.Vector3(
					this.calc.rand(-this.size / 2, this.size / 2),
					this.calc.rand(-this.size / 2, this.size / 2),
					this.calc.rand(-this.size / 2, this.size / 2)
				),
				baseSize: size,
				size: size,
				r: 1,
				g: 1,
				b: 1,
				a: 0,
				life: 2,
				decay: this.calc.rand(0.05, 0.15),
				firstRun: true
			});
		}

		this.material = new THREE.ShaderMaterial({
			uniforms: {
				texture: {
					type: 't',
					value: this.texture
				}
			},
			vertexShader: `
				attribute float size;
				attribute vec4 color;
				varying vec4 vColor;
				void main() {
					vColor = color;
					vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
					gl_PointSize = size * (300.0 / length(mvPosition.xyz));
					gl_Position = projectionMatrix * mvPosition;
				}
			`,
			fragmentShader: `
				uniform sampler2D texture;
				varying vec4 vColor;
				void main(void) {
					gl_FragColor = vColor * texture2D(texture, gl_PointCoord);
				}
			`,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			transparent: true
		});

		this.mesh = new THREE.Points(this.geometry, this.material);
		this.particleGroup.add(this.mesh);

		this.updateParticleAttributes(true, true, true);

		this.osc = new Osc(0, 0.015, true, false);

		this.reset();
	}

	reset() {
		this.osc.reset();
	}

	generateTexture() {
		let c = document.createElement('canvas');
		let ctx = c.getContext('2d');
		let size = 128;
		c.width = size;
		c.height = size;

		let gradient = ctx.createRadialGradient(size * 0.5, size * 0.5, 0, size * 0.5, size * 0.5, size * 0.4);
		gradient.addColorStop(0, 'hsla(0, 0%, 100%, 1)');
		gradient.addColorStop(1, 'hsla(0, 0%, 100%, 0)');

		ctx.beginPath();
		ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
		ctx.fillStyle = gradient;
		ctx.fill();

		let texture = new THREE.Texture(c);
		texture.needsUpdate = true;

		return texture;
	}

	updateParticleAttributes(color, position, size) {
		let i = this.count;
		while(i--) {
			let part = this.parts[i];
			if(color) {
				this.colors[i * 4 + 0] = part.r;
				this.colors[i * 4 + 1] = part.g;
				this.colors[i * 4 + 2] = part.b;
				this.colors[i * 4 + 3] = part.a;
			}
			if(position) {
				this.positions[i * 3 + 0] = part.position.x;
				this.positions[i * 3 + 1] = part.position.y;
				this.positions[i * 3 + 2] = part.position.z;
			}
			if(size) {
				this.sizes[i] = part.size;
			}
		}

		if(color) {
			this.geometry.attributes.color.needsUpdate = true;
		}
		if(position) {
			this.geometry.attributes.position.needsUpdate = true;
		}
		if(size) {
			this.geometry.attributes.size.needsUpdate = true;
		}
	}

	replay() {
		super.replay();
		this.reset();
	}

	update() {
		super.update();

		this.osc.update(this.loader.deltaTimeNormal);
		this.oscEased = this.osc.val(this.ease.inOutExpo);

		let i = this.count;

		let noiseScale = 0.1;
		let noiseTime = this.loader.elapsedMilliseconds * 0.0008;
		let noiseVelocity = this.calc.map(this.oscEased, 0, 1, 0, 1);

		while(i--) {
			let part = this.parts[i];

			let xScaled = part.position.x * noiseScale;
			let yScaled = part.position.y * noiseScale;
			let zScaled = part.position.z * noiseScale;

			let noise1 = this.simplex.getRaw4DNoise(
				xScaled,
				yScaled,
				zScaled,
				noiseTime
			) * 0.5 + 0.5;
			let noise2 = this.simplex.getRaw4DNoise(
				xScaled + 100,
				yScaled + 100,
				zScaled + 100,
				50 + noiseTime
			) * 0.5 + 0.5;
			let noise3 = this.simplex.getRaw4DNoise(
				xScaled + 200,
				yScaled + 200,
				zScaled + 200,
				100 + noiseTime
			) * 0.5 + 0.5;

			part.position.x += Math.sin(noise1 * Math.PI * 2) * noiseVelocity * this.loader.deltaTimeNormal;
			part.position.y += Math.sin(noise2 * Math.PI * 2) * noiseVelocity * this.loader.deltaTimeNormal;
			part.position.z += Math.sin(noise3 * Math.PI * 2) * noiseVelocity * this.loader.deltaTimeNormal;

			if(part.life > 0 ) {
				part.life -= part.decay * this.oscEased * this.loader.deltaTimeNormal;
			}
			
			if(part.life <= 0 || part.firstRun) {
				part.life = 2;
				part.position.x = this.calc.rand(-this.size / 2, this.size / 2);
				part.position.y = this.calc.rand(-this.size / 2, this.size / 2);
				part.position.z = this.calc.rand(-this.size / 2, this.size / 2);

				let hue = (this.loader.elapsedMilliseconds / 25 + this.calc.rand(90)) % 360 + 110;
				let lightness = Math.round(this.calc.rand(10, 50));
				this.color.set(`hsl(${hue}, 85%, ${lightness}%)`);

				part.r = this.color.r;
				part.g = this.color.g;
				part.b = this.color.b;

				part.firstRun = false;
			}

			part.a = part.life > 1 ? 2 - part.life : part.life;

			part.size = this.calc.map(this.oscEased, 0, 1, part.baseSize * 4, part.baseSize * 1);
		}

		this.updateParticleAttributes(true, true, true);

		this.particleGroup.rotation.y += (0.0075 + this.oscEased * 0.04) * this.loader.deltaTimeNormal;
		this.particleGroup.position.z = 5 - this.oscEased * 15;

		if(this.exiting && !this.loader.isOrbit && !this.loader.isGrid) {
			this.loader.camera.position.z = this.loader.cameraBaseZ - this.ease.inExpo(this.exitProgress, 0, 1, 1) * this.loader.cameraBaseZ;
		}
	}

}

export default System;