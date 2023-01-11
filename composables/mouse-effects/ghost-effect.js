import * as THREE from "three";
import { onMounted } from "vue";
import { useEventListener } from "@vueuse/core";

class GhostCursor {
  constructor(args) {
    this.renderer = args.renderer;
    this.camera = new THREE.OrthographicCamera(
      -0.5 * window.innerWidth,
      0.5 * window.innerWidth,
      0.5 * window.innerHeight,
      -0.5 * window.innerHeight,
      0.1,
      10
    );
    this.camera.position.set(0, 0, 1);
    this.scene = args.scene;
    this.scene.add(this.camera);
    this.clock = new THREE.Clock();

    const config = args.config;

    this.touchPoint = new THREE.Vector2(0.5, 0.65);
    this.targetTouchPoint = new THREE.Vector2(0.5, 0.65);
    this.touchCanvasPoint = [
      this.touchPoint.x * window.innerWidth,
      (1 - this.touchPoint.y) * window.innerHeight,
    ];
    this.isMoving = false;

    this.touchCanvas = document.createElement("canvas");
    this.touchCanvasCtx = this.touchCanvas.getContext("2d");
    this.touchTexture = new THREE.CanvasTexture(this.touchCanvas);
    this.touchTrail = new Array(config.dotsNumber);
    for (let i = 0; i < config.dotsNumber; i++) {
      this.touchTrail[i] = {
        x: this.touchCanvasPoint[0],
        y: this.touchCanvasPoint[1],
        vx: 0,
        vy: 0,
        intensity: i
          ? (0.6 * (config.dotsNumber - i)) / config.dotsNumber
          : 0.9,
        r: config.dotsBaseRadius * (1 + Math.pow(i / config.dotsNumber, 0.5)),
      };
    }

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        u_touch_texture: { type: "t", value: this.touchTexture },
        u_mouse: { type: "v2", value: new THREE.Vector2(0, 0) },
        u_target_mouse: { type: "v2", value: new THREE.Vector2(0, 0) },
        u_resolution: { type: "v2", value: new THREE.Vector2(0, 0) },
        u_time: { type: "f", value: 0 },
        u_face_expression: { type: "f", value: config.faceExpression },
        u_ratio: { type: "f", value: window.innerWidth / window.innerHeight },
      },
      vertexShader: `
            varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.);
  }`,
      fragmentShader: `
                 varying vec2 vUv;
  uniform float u_ratio;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_target_mouse;
  uniform float u_face_expression;
  uniform sampler2D u_touch_texture;

  float eyes(vec2 _st) {
    _st.x = abs(_st.x);

    _st.y += pow(_st.x, 2. - .4 * u_face_expression);
    _st.x -= (.08 + .03 * u_face_expression);
    _st.y *= .8;

    _st *= 10.;

    float d = length(_st);
    d = pow(d, .4);

    return clamp(1. - d, 0., 1.);
  }

  float mouth(vec2 _st) {
    _st *= 13.;
    _st.y *= .8;

    _st.x /= (1. + 2. * u_face_expression);
    _st.y *= (1. + .7 * u_face_expression);
    _st.y -= pow(_st.x, 2.) * 2. * u_face_expression;

    float d = length(_st);
    d = pow(d, .7);

    return clamp(1. - d, 0., 1.);
  }

  float face(vec2 _st) {
    _st *= 3.5;

    float eyes_shape = eyes(_st - vec2(0., .1));
    float mouth_shape = mouth(_st - vec2(0., -.2));

    float col;
    col = mix(col, 1., eyes_shape);
    col = mix(col, 1., mouth_shape);

    return col;
  }


  // --------------------------------
  // 2D noise

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }



  void main() {
    vec2 st = vUv;

    vec2 mouse = st - u_mouse.xy;
    mouse.x *= u_ratio;
    vec2 mouse_target = st - u_target_mouse.xy;
    mouse_target.x *= u_ratio;

    // Texture we create and update in JS => bas shape
    float touch = texture2D(u_touch_texture, st).r;

    // Add noise to the base shape
    vec2 noise_pos = vec2(st * 6.);
    float noise = snoise(noise_pos + vec2(0., u_time)) * .25 + .25;
    noise += snoise(noise_pos) * .25 + .3;
    touch *= noise;

    // Add face
    touch -= 1.2 * face(mouse - .1 * (mouse - mouse_target));

    // Apply color scheme
    vec3 color = mix(vec3(.184, .282, .345), vec3(.945, .945, .902), smoothstep(.01, .38, touch));

    gl_FragColor = vec4(color, 1.);
  }
            `,
    });

    const planeGeometry = new THREE.PlaneBufferGeometry(2, 2);
    this.scene.add(new THREE.Mesh(planeGeometry, this.material));

    this.addCanvasEvents();
  }

  addCanvasEvents() {
    const _this = this;

    let movingTimer;
    let movingTimeout = function () {
      _this.isMoving = false;
    };
    movingTimer = setTimeout(movingTimeout, 300);

    window.addEventListener("mousemove", (e) => {
      updateMousePosition(e.clientX, e.clientY);
    });
    window.addEventListener("touchmove", (e) => {
      updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    });

    function updateMousePosition(eX, eY) {
      if (_this.isMoving === false) {
        _this.isMoving = true;
      }
      clearTimeout(movingTimer);
      movingTimer = setTimeout(movingTimeout, 300);

      _this.targetTouchPoint.x = eX / window.innerWidth;
      _this.targetTouchPoint.y = 1.1 - Math.max(eY / window.innerHeight, 0.2);
    }
  }

  updateTrail() {
    this.touchCanvasCtx.fillStyle = "black";
    this.touchCanvasCtx.fillRect(
      0,
      0,
      this.touchCanvas.width,
      this.touchCanvas.height
    );

    this.touchTrail.forEach((p, pIdx) => {
      if (pIdx === 0) {
        p.x = this.touchCanvasPoint[0];
        p.y = this.touchCanvasPoint[1];
      } else {
        p.vx += (this.touchTrail[pIdx - 1].x - p.x) * config.tailSpring;
        p.vx *= config.tailFriction;

        p.vy += (this.touchTrail[pIdx - 1].y - p.y) * config.tailSpring;
        p.vy += config.tailGravity;
        p.vy *= config.tailFriction;

        p.x += p.vx;
        p.y += p.vy;
      }

      const grd = this.touchCanvasCtx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.r
      );
      grd.addColorStop(0, "rgba(255, 255, 255, " + p.intensity + ")");
      grd.addColorStop(1, "rgba(255, 255, 255, 0)");

      this.touchCanvasCtx.beginPath();
      this.touchCanvasCtx.fillStyle = grd;
      this.touchCanvasCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.touchCanvasCtx.fill();
    });

    this.touchTexture.needsUpdate = true;
  }

  render() {
    this.touchPoint.x +=
      (this.targetTouchPoint.x - this.touchPoint.x) * config.catchingSpeed;
    this.touchPoint.y +=
      (this.targetTouchPoint.y - this.touchPoint.y) * config.catchingSpeed;
    this.touchCanvasPoint = [
      this.touchPoint.x * window.innerWidth,
      (1 - this.touchPoint.y) * window.innerHeight,
    ];

    const time = this.clock.getElapsedTime();

    if (this.isMoving) {
      config.faceExpression -= 0.05;
      config.faceExpression = Math.max(config.faceExpression, 0);
      config.tailGravity -= 0.1;
      config.tailGravity = Math.max(
        config.tailGravity,
        config.tailGravityBonds[0]
      );
    } else {
      config.faceExpression += 0.01;
      config.faceExpression = Math.min(config.faceExpression, 1);
      config.tailGravity += 0.1;
      config.tailGravity = Math.min(
        config.tailGravity,
        config.tailGravityBonds[1]
      );
    }
    config.tailGravity += 0.12 * Math.sin(3 * time);

    this.material.uniforms.u_face_expression.value = config.faceExpression;

    this.updateTrail();
    this.material.uniforms.u_touch_texture.value = this.touchTexture;

    this.material.uniforms.u_time.value = time;
    this.material.uniforms.u_mouse.value = new THREE.Vector2(
      this.touchPoint.x,
      this.touchPoint.y
    );
    this.material.uniforms.u_target_mouse.value = new THREE.Vector2(
      this.targetTouchPoint.x,
      this.targetTouchPoint.y
    );
    this.renderer.render(this.scene, this.camera);
  }

  loop() {
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  updateSize() {
    config.dotsBaseRadius = window.innerHeight * 0.1;
    config.tailGravity = window.innerHeight * 0.005;
    config.tailGravityBonds = [
      window.innerHeight * 0.005,
      window.innerHeight * 0.01,
    ];
    config.catchingSpeed = window.innerWidth * 0.0001;

    this.touchCanvas.width = window.innerWidth;
    this.touchCanvas.height = window.innerHeight;
    this.camera.left = -0.5 * window.innerWidth;
    this.camera.right = 0.5 * window.innerWidth;
    this.camera.top = 0.5 * window.innerHeight;
    this.camera.bottom = -0.5 * window.innerHeight;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.material.uniforms.u_ratio.value =
      window.innerWidth / window.innerHeight;
    this.material.uniforms.u_resolution.value = new THREE.Vector2(
      window.innerWidth,
      window.innerHeight
    );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}

export const useTheCursor= (x,y) => {
  init = () => {
      dotsNumber: 11,
      dotsBaseRadius: window.innerHeight * 0.1,
      tailSpring: 0.35,
      tailGravity: window.innerHeight * 0.005,
      tailGravityBonds: [window.innerHeight * 0.005, window.innerHeight * 0.01],
      tailFriction: 0.5,
      faceExpression: 0,
      catchingSpeed: window.innerWidth * 0.0001,
    };

    const gc = new GhostCursor(config);
    gc.updateSize();
    useEventListener(window, "resize", gc.updateSize);
  };
};

window.addEventListener("load", () => {
  useTheGhost();
});
