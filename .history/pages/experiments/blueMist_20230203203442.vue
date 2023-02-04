<script lang="ts" setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Utils } from '~/utils';
import gsap from 'gsap';
const nuxtApp = useNuxtApp();

var canvas = document.createElement("canvas");

var TWO_PI = Math.PI * 2;

const mobile =
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    //|| navigator.userAgent.match(/iPad/i)
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i);

//Spatial variables
var width = 2000;
var height = 2000;
var depth = 2000;
var centre = [width / 2, height / 2, depth / 2];

var particleCount;

if (mobile) {
    particleCount = 25000;
} else {
    particleCount = 25000;


    var speed = 5;
    //Noise field zoom
    var step = 2000;
    //Camera rotate
    var rotate = true;

    //Initialise three.js
    var scene = new THREE.Scene();

    var renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.physicallyCorrectLights = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x111b44, 1);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement);

    distance = 400;

    var FOV = (2 * Math.atan(window.innerHeight / (2 * distance)) * 90) / Math.PI;

    var camera = new THREE.PerspectiveCamera(
        FOV,
        window.innerWidth / window.innerHeight,
        1,
        200000
    );

    camera.position.set(-2 * width, -2 * height, -4 * width);
    window.addEventListener("load", function () {
        gsap.to(camera.position, { z: -2 * width, duration: 0.3, ease: "expo" });
    });
    scene.add(camera);

    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //OrbitControls.js for camera manipulation
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxDistance = 200000 - 5 * width;
    controls.minDistance = 100;
    controls.autoRotate = rotate;

    //Particles
    var particles = [];
    var velocities = [];
    const geometry = new THREE.BufferGeometry();
    //Initial ember colour
    var colour = 0xff6800;

    //Add texture to particles
    //https://stackoverflow.com/questions/24087757/three-js-and-loading-a-cross-domain-image
    THREE.ImageUtils.crossOrigin = "";
    var texture = new THREE.TextureLoader().load(
        "http://res.cloudinary.com/al-ro/image/upload/c_scale,h_512/v1518264821/ember_ihk6rp.png"
    );

    //Variable size for particle material
    var size = 70;
    var sizes = [70, 20, 40, 60, 50, 65];
    var material = new THREE.PointsMaterial({
        // color: `#${new THREE.Color()
        // 	.setHSL(0.5 + (THREE.MathUtils.randInt(201, 220) / 3) * 0.25, 0.6, 0.7)
        // 	.getHexString()}`,
        size: () => {
            debugger;
            sizes[Math.random() * 6];
        },
        transparent: true,
        opacity: 1.0,
        vertexColors: true,
        map: texture,
        //Other particles show through transparent sections of texture
        depthTest: false,
        //For glow effect
        blending: THREE.AdditiveBlending
    });

    const colors = [];
    //Generate random particles
    for (i = 0; i < particleCount; i++) {
        let x = width / 2 - Math.random() * width;
        let y = height / 2 - Math.random() * height;
        let z = depth / 2 - Math.random() * depth;
        let vel_x = 0.5 - Math.random();
        let vel_y = 0.5 - Math.random();
        let vel_z = 0.5 - Math.random();

        const b = `#${new THREE.Color().setHSL(0.5 + (i / 3) * 0.25, 0.6, 0.7)}`;
        colors.push(b);

        particles.push(x, y, z);
        velocities.push(vel_x, vel_y, vel_z);
    }

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(particles, 3)
    );

    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 1));

    const points = new THREE.Points(geometry, material);

    scene.add(points);

    //-----------GUI-----------//
    //dat.gui library controls
    var reset_button = {
        reset: function () {
            //Use noise.js library to generate a grid of 3D simplex noise values
            try {
                noise.seed(Math.random());
            } catch (err) {
                console.log(err.message);
            }

            for (i = 0; i < particleCount * 3.0; i += 3) {
                var x = 0.5 - Math.random();
                var y = 0.5 - Math.random();
                var z = 0.5 - Math.random();

                velocities[i] = x;
                velocities[i + 1] = y;
                velocities[i + 2] = z;

                particles[i] = width / 2 - Math.random() * width;
                particles[i + 1] = height / 2 - Math.random() * height;
                particles[i + 2] = depth / 2 - Math.random() * depth;
            }
        }
    };

    var gui = new dat.GUI();
    gui.add(this, "speed").min(0).max(10).step(1).listen();
    gui.add(this, "step").min(10).max(3000).step(10).listen();
    gui
        .add(this, "size")
        .min(1)
        .max(300)
        .step(1)
        .listen()
        .onChange(function (value) {
            setSize();
        });
    if (!mobile) {
        gui
            .addColor(this, "colour")
            .listen()
            .onChange(function (value) {
                setColour();
            });
    }
    gui.add(reset_button, "reset");
    gui
        .add(this, "rotate")
        .listen()
        .onChange(function (value) {
            controls.autoRotate = rotate;
        });
    gui.close();

    function setSize() {
        material.size = size;
    }

    function setColour() {
        material.color.setHex(colour);
    }

    //----------NOISE---------//
    var noise_ = [];

    //Use noise.js library to generate a grid of 3D simplex noise values
    try {
        //noise.seed(Math.random());
    } catch (err) {
        console.log(err.message);
    }

    //Find the curl of the noise field based on on the noise value at the location of a particle
    function computeCurl(x, y, z) {
        var eps = 0.0001;

        var curl = new THREE.Vector3();

        //Find rate of change in YZ plane
        var n1 = noise.simplex3(x, y + eps, z);
        var n2 = noise.simplex3(x, y - eps, z);
        //Average to find approximate derivative
        var a = (n1 - n2) / (2 * eps);
        var n1 = noise.simplex3(x, y, z + eps);
        var n2 = noise.simplex3(x, y, z - eps);
        //Average to find approximate derivative
        var b = (n1 - n2) / (2 * eps);
        curl.x = a - b;

        //Find rate of change in ZX plane
        n1 = noise.simplex3(x, y, z + eps);
        n2 = noise.simplex3(x, y, z - eps);
        //Average to find approximate derivative
        a = (n1 - n2) / (2 * eps);
        n1 = noise.simplex3(x + eps, y, z);
        n2 = noise.simplex3(x - eps, y, z);
        //Average to find approximate derivative
        b = (n1 - n2) / (2 * eps);
        curl.y = a - b;

        //Find rate of change in XY plane
        n1 = noise.simplex3(x + eps, y, z);
        n2 = noise.simplex3(x - eps, y, z);
        //Average to find approximate derivative
        a = (n1 - n2) / (2 * eps);
        n1 = noise.simplex3(x, y + eps, z);
        n2 = noise.simplex3(x, y - eps, z);
        //Average to find approximate derivative
        b = (n1 - n2) / (2 * eps);
        curl.z = a - b;

        return curl;
    }

    //----------MOVE----------//
    function move(dt) {
        for (i = 0; i < particleCount * 3.0; i += 3) {
            //Find curl value at partile location
            var curl = computeCurl(
                particles[i] / step,
                particles[i + 1] / step,
                particles[i + 2] / step
            );

            //Update particle velocity according to curl value and speed
            velocities[i] = dt * speed * curl.x;
            velocities[i + 1] = dt * speed * curl.y;
            velocities[i + 2] = dt * speed * curl.z;

            //Update particle position based on velocity
            particles[i] += velocities[i];
            particles[i + 1] += velocities[i + 1];
            particles[i + 2] += velocities[i + 2];

            //Boudnary conditions
            //If a particle gets too far away from (0,0,0), reset it to a random location
            var dist = Math.sqrt(
                particles[i] * particles[i] +
                particles[i + 1] * particles[i + 1] +
                particles[i + 2] * particles[i + 2]
            );
            if (dist > 5 * width) {
                particles[i] = width / 2 - Math.random() * width;
                particles[i + 1] = height / 2 - Math.random() * height;
                particles[i + 2] = depth / 2 - Math.random() * depth;
            }
        }

        geometry.getAttribute("position").copyArray(particles);
        geometry.getAttribute("position").needsUpdate = true;
    }

    let lastFrame = Date.now();
    let thisFrame;
    let dt = 0;

    function draw() {
        //Update time
        thisFrame = Date.now();
        dt = (thisFrame - lastFrame) / 1000.0;
        lastFrame = thisFrame;

        if (rotate) {
            controls.update();
        }

        move(50 * dt);

        renderer.render(scene, camera);
        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);

</script>

<template>

</template>
