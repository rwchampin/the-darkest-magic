
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