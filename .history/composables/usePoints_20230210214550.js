import * as THREE from 'three'
import gsap from 'gsap'
import chroma from 'chroma-js'
import { Utils } from '~/utils'
import dotTexture from '~/assets/particles/dotTexture.png?url'
import soulUrl from '~/assets/matcaps/soul.png?url';


export const usePoints = ({ scene, camera, renderer, nuxtApp }) => {
    let sunGeometry, sunMaterial, sun, mercuryGeometry, mercuryMaterial, mercury
    // onMounted(() => {
        
    const texture = new THREE.TextureLoader().load(soulUrl)
    // let electrons = [], nucleus, numElectrons = 100; // more electrons = slower updating
    function populateScene() {
        const geoS = new THREE.SphereBufferGeometry(10, 16, 16);
        const matS = new THREE.MeshBasicMaterial({ color: "blue" });
        nucleus = new THREE.Mesh(geoS, matS);
        nucleus.position.set(0, 0, 0); // you can change these values
        camera.lookAt(0, 0, 0)
        camera.updateProjectionMatrix();
        const axesHelper = new THREE.AxesHelper(50)
        scene.add(nucleus, axesHelper);

        let electron = null,
            plane = new THREE.Plane(),
            point = new THREE.Vector3();
       const geoe = new THREE.SphereGeometry(1, 16, 16);
       const mate = new THREE.MeshBasicMaterial({ color: "red" });
        for (var i = 0; i < numElectrons; ++i) {
            electron = new THREE.Mesh(geoe, mate);
            electrons.push(electron);
            electron.angle = new THREE.Vector3(
                Math.random(),
                Math.random(),
                Math.random()
            ).normalize();
            electron.orbitSpeed = (Math.random() * 0.05) + 0.05;
            if (Math.random() > 0.5) electron.orbitSpeed *= -1;
            plane.normal.copy(electron.angle);
            point.set(Math.random(), Math.random(), Math.random());
            plane.projectPoint(point, electron.position);
            electron.position.setLength(Math.floor(Math.random() * 20) + 15);
            electron.position.applyAxisAngle(electron.angle, Math.random() / 10);
            electron.position.add(nucleus.position);
            scene.add(electron);
        }
    }

    function updateParticles() {
        // var obj = null;
        // for (var i = 0; i < numElectrons; ++i) {
        //     obj = electrons[i]
        //     obj.position.sub(nucleus.position);
        //     obj.position.applyAxisAngle(obj.angle, obj.orbitSpeed);
        //     obj.position.add(nucleus.position);
        // }
    }

   /*********************************
   ** SUN
   *********************************/
    sunGeometry = new THREE.SphereGeometry(10, 30, 30);
        sunMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            fog: true,
            emissive: 0xFFFFFF,
            shininess: 50,
            color: 0x000000
        // flatShading: true
    })
    sun = new THREE.Mesh(sunGeometry, sunMaterial)
    sun.position.set(0, 20, 0)
    sun.castShadow = true;
    sun.receiveShadow = true;
    scene.add(sun)


    /*********************************
    ** MERCURY
    *********************************/
    mercuryGeometry = new THREE.SphereGeometry(3.5, 30, 30);
        mercuryMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            fog: true,
            color: 0x444444
        // flatShading: true
    })
    mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial)
    mercury.position.set(0, 20, 0)
    mercury.castShadow = true;
    sun.add(mercury)
       
    const ambientLight = new THREE.AmbientLight(0x000088, 100)
    scene.add(ambientLight)

    return { sun, mercury}
}
//     //   }
//     //   `,
//     //   fragmentShader: `
//     //   #ifdef GL_ES
//     //   precision mediump float;
//     //   #endif
//     //   uniform vec3 uLight;
//     //   uniform vec3 uMouse;
//     //   uniform vec4 uResolution;
//     //   uniform float uTime;
//     //   uniform vec3 uColor;
//     //   varying vec2 vUv;
//     //   varying vec3 vPosition;
//     //   varying vec3 vNormal;

//     //   vec3 noise(vec3 p) {
//     //     vec3 i = floor(p);
//     //     vec3 f = fract(p);
//     //     f = f * f * (3.0 - 2.0 * f);
//     //     vec2 uv = (i.xy + vec2(37.0, 17.0) * i.z) + f.xy;
//     //     vec2 rg = texture2D(iChannel0, (uv + 0.5) / 256.0, -100.0).yx;
//     //     return mix(rg.x, rg.y, f.z) * 2.0 - 1.0;
//     //   }

//     //   float fbm(vec3 p) {
//     //     float f = 0.0;
//     //     f += 0.5000 * noise(p); p = p * 2.02;
//     //     f += 0.2500 * noise(p); p = p * 2.03;
//     //     f += 0.1250 * noise(p); p = p * 2.01;
//     //     f += 0.0625 * noise(p); p = p * 2.04;
//     //     f /= 0.9375;
//     //     return f;
//     //   }

//     //   void main() {
//     //     vec2 uv = vUv;
//     //     vec3 pos = vPosition;
//     //     vec3 normal = vNormal;
//     //     vec3 light = normalize(uLight - pos);
//     //     vec3 color = uColor;
//     //     float d = length(uLight - pos);
//     //     float att = 1.0 - smoothstep(0.0, 1.0, d);
//     //     float diff = clamp(dot(normal, light), 0.0, 1.0);
//     //     float spec = pow(clamp(dot(reflect(-light, normal), normalize(-pos)), 0.0, 1.0), 16.0);
//     //     vec3 diffuse = diff * color;
//     //     vec3 specular = spec * vec3(1.0);
//     //     vec3 ambient = vec3(0.03);
//     //     vec3 col = (ambient + diffuse + specular) * att;
//     //     vec3 noisePos = vec3(uv * 2.0, uTime * 0.2);
//     //     float b = fbm(noisePos);
//     //     float displacement = smoothstep(0.0, 0.5, b);
//     //     vec3 newPosition = pos + normal * displacement * 0.1;
//     //     gl_FragColor = vec4(col, 1.0);  
//     //   }
//     //   `,
//     //         sizeAttenuation: true,
//     //         transparent: true,
//     //         opacity: 0.5,
//     //         depthWrite: false,
//     //         blending: THREE.AdditiveBlending,
//        //         vertexColors: true,
//     //     });
//     var wait;
//     var count;
//     var numToAddEachFrame;
//     var particleList;
//     var recycleBin;
//     var particleAlpha;
//     var fLen;
//     var m;
//     var projCenterX;
//     var projCenterY;
//     var zMax;
//     var turnAngle;
//     var turnSpeed;
//     var sphereCenterX, sphereCenterY, sphereCenterZ;
//     var particleRad;
//     var zeroAlphaDepth;
//     var randAccelX, randAccelY, randAccelZ;
//     var gravity;
//     var rgbString;
//     //we are defining a lot of variables used in the screen update functions globally so that they don't have to be redefined every frame.
//     var p;
//     var outsideTest;
//     var nextParticle;
//     var sinAngle;
//     var cosAngle;
//     var rotX, rotZ;
//     var depthAlphaFactor;
//     var i;
//     var theta, phi;
//     var x0, y0, z0;

		

//     const loader = new THREE.TextureLoader();
//     const texxture = loader.load(s);
//     let pointsMaterial = new THREE.PointsMaterial({
//         size: .1,
//         sizeAttenuation: true,
//         map: texxture,
//         transparent: true,
//         opacity: Math.random(),
//         depthWrite: false,
//         blending: THREE.AdditiveBlending,
//         vertexColors: true,
//     });


//     wait = 1;
//     count = wait - 1;
//     numToAddEachFrame = 8;
//     particleAlpha = 1; //maximum alpha

//     fLen = 320; //represents the distance from the viewer to z=0 depth.

//     //projection center coordinates sets location of origin
//     projCenterX = window.innerWidth / 2;
//     projCenterY = window.innerHeight / 2;

//     //we will not draw coordinates if they have too large of a z-coordinate (which means they are very close to the observer).
//     zMax = fLen - 2;

//     particleList = {};
//     recycleBin = {};

//     //random acceleration factors - causes some random motion
//     randAccelX = Math.random();// 0.1;
//     randAccelY = Math.random(); //0.1;
//     randAccelZ = Math.random();//0.1;

//     gravity = Math.random()//-0; //try changing to a positive number (not too large, for example 0.3), or negative for floating upwards.

//     particleRad = Math.random() * 2.5;

//     sphereCenterX = 0;
//     sphereCenterY = 0;
//     sphereCenterZ = -3 - sphereRad;

//     //alpha values will lessen as particles move further back, causing depth-based darkening:
//     zeroAlphaDepth = -750;

//     turnSpeed = 2 * Math.PI / 1200; //the sphere will rotate at this speed (one complete rotation every 1600 frames).
//     turnAngle = 0; //initial angle

//     // timer = setInterval(renderPoint, 10 / 24);
//     requestAnimationFrame(draw)

//     function draw() {

//         const t = clock.getElapsedTime();


//         for (i = 0; i < 2000; i++) {
//             theta = t * 2 * Math.PI;
//             phi = Math.acos(Math.random() * 2 - 1);
//             x0 = sphereRad * Math.sin(phi) * Math.cos(theta);
//             y0 = sphereRad * Math.sin(phi) * Math.sin(theta);
//             z0 = sphereRad * Math.cos(phi);
//             vertices.push(x0,y0,y0)
//         }
//                  pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
//         pointsGeometry.newParticle
//         const points = new THREE.Points(pointsGeometry, pointsMaterial)
 
//             scene.add(points)
//             // vertColors.push(colors[Math.floor(Math.random() * colors.length)]);
//             //We use the addParticle function to add a new particle. The parameters set the position and velocity components.
//             //Note that the velocity parameters will cause the particle to initially fly outwards away from the sphere center (after
//             //it becomes unstuck).
//            // var p = addParticle(x0, sphereCenterY + y0, sphereCenterZ + z0, 0.002 * x0, 0.002 * y0, 0.002 * z0);

//             //we set some "envelope" parameters which will control the evolving alpha of the particles.
//             // p.attack = 50;
//             // p.hold = 50;
//             // p.decay = 100;
//             // p.initValue = 0;
//             // p.holdValue = particleAlpha;
//             // p.lastValue = 0;

//             //the particle will be stuck in one place until this time has elapsed:
//             // p.stuckTime = 90 + Math.random() * 20;

//             // p.accelX = 0;
//             // p.accelY = gravity;
//             // p.accelZ = 0;

//             // sizes.push(Math.random() * 3)

        

//         // update();
        
//     }
//         //update viewing angle
//         // turnAngle = (turnAngle + turnSpeed) % (2 * Math.PI);
//         // sinAngle = Math.sin(turnAngle);
//         // cosAngle = Math.cos(turnAngle);

//         //background fill
//         // context.fillStyle = "#FFFFFF";
//         // context.fillRect(0, 0, window.innerWidth, window.innerHeight);
//     function update() {
//         //update and draw particles
//         // p = particleList.first;
//         // while (p != null) {
//             // for (let i = 0; i < array.length; i++) {
//             //     const element = array[i];
                
//             // }
//             // const color = colors[Math.floor(Math.random() * colors.length)];
//             //before list is altered record next particle
//             // nextParticle = p.next;

//             //update age
//             p.age++;

//             //if the particle is past its "stuck" time, it will begin to move.
//             if (p.age > p.stuckTime) {
//                 p.velX += p.accelX + randAccelX * (Math.random() * 2 - 1);
//                 p.velY += p.accelY + randAccelY * (Math.random() * 2 - 1);
//                 p.velZ += p.accelZ + randAccelZ * (Math.random() * 2 - 1);

//                 p.x += p.velX;
//                 p.y += p.velY;
//                 p.z += p.velZ;
//             }

//         //     /*
//         //     We are doing two things here to calculate display coordinates.
//         //     The whole display is being rotated around a vertical axis, so we first calculate rotated coordinates for
//         //     x and z (but the y coordinate will not change).
//         //     Then, we take the new coordinates (rotX, y, rotZ), and project these onto the 2D view plane.
//         //     */
//             rotX = cosAngle * p.x + sinAngle * (p.z - sphereCenterZ);
//             rotZ = -sinAngle * p.x + cosAngle * (p.z - sphereCenterZ) + sphereCenterZ;
//             m = radius_sp * fLen / (fLen - rotZ);
//             p.projX = rotX * m + projCenterX;
//             p.projY = p.y * m + projCenterY;

//         //     //update alpha according to envelope parameters.
//             if (p.age < p.attack + p.hold + p.decay) {
//                 if (p.age < p.attack) {
//                     p.alpha = (p.holdValue - p.initValue) / p.attack * p.age + p.initValue;
//                 }
//                 else if (p.age < p.attack + p.hold) {
//                     p.alpha = p.holdValue;
//                 }
//                 else if (p.age < p.attack + p.hold + p.decay) {
//                     p.alpha = (p.lastValue - p.holdValue) / p.decay * (p.age - p.attack - p.hold) + p.holdValue;
//                 }
//             }
//             else {
//                 p.dead = true;
//             }

//         //     //see if the particle is still within the viewable range.
//             if ((p.projX > window.innerWidth) || (p.projX < 0) || (p.projY < 0) || (p.projY > window.innerHeight) || (rotZ > zMax)) {
//                 outsideTest = true;
//             }
//             else {
//                 outsideTest = false;
//             }

//             if (outsideTest || p.dead) {
//                 recycle(p);
//             }

//             else {
//                  pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
// 				pointsGeometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ).setUsage( THREE.DynamicDrawUsage ) );

//         const points = new THREE.Points(pointsGeometry, pointsMaterial)
// scene.add(points)
//                 //depth-dependent darkening
//                 depthAlphaFactor = (1 - rotZ / zeroAlphaDepth);
//                 depthAlphaFactor = (depthAlphaFactor > 1) ? 1 : ((depthAlphaFactor < 0) ? 0 : depthAlphaFactor);
//                 // context.fillStyle = r;

//                 // ;//rgbString + depthAlphaFactor * p.alpha + ")";

//                 //draw
//                 // context.beginPath();
//                 context.arc(p.projX, p.projY, m * particleRad, 0, 1.5 * Math.PI, false);
//                 // context.closePath();
//                 // context.fill();
//                 // context.arc(p.projX, p.projY, m * particleRad, 0, 1.5 * Math.PI, false);
//                 vertices.push(p.projX, p.projY,)
//             }

//             // p = nextParticle;
//         // }

//     }

//     function addParticle(x0, y0, z0, vx0, vy0, vz0) {
//         var newParticle;

//         //check recycle bin for available drop:
//         if (recycleBin.first != null) {
//             newParticle = recycleBin.first;
//             //remove from bin
//             if (newParticle.next != null) {
//                 recycleBin.first = newParticle.next;
//                 newParticle.next.prev = null;
//             }
//             else {
//                 recycleBin.first = null;
//             }
//         }
//         //if the recycle bin is empty, create a new particle (a new ampty object):
//         else {
//             newParticle = {};
//         }

//         //add to beginning of particle list
//         if (particleList.first == null) {
//             particleList.first = newParticle;
//             newParticle.prev = null;
//             newParticle.next = null;
//         }
//         else {
//             newParticle.next = particleList.first;
//             particleList.first.prev = newParticle;
//             particleList.first = newParticle;
//             newParticle.prev = null;
//         }

//         //initialize
//         newParticle.x = x0;
//         newParticle.y = y0;
//         newParticle.z = z0;
//         newParticle.velX = vx0;
//         newParticle.velY = vy0;
//         newParticle.velZ = vz0;
//         newParticle.age = 0;
//         newParticle.dead = false;
//         if (Math.random() < 0.5) {
//             newParticle.right = true;
//         }
//         else {
//             newParticle.right = false;
//         }
//         return newParticle;
//     }

//     function recycle(p) {
//         //remove from particleList
//         if (particleList.first == p) {
//             if (p.next != null) {
//                 p.next.prev = null;
//                 particleList.first = p.next;
//             }
//             else {
//                 particleList.first = null;
//             }
//         }
//         else {
//             if (p.next == null) {
//                 p.prev.next = null;
//             }
//             else {
//                 p.prev.next = p.next;
//                 p.next.prev = p.prev;
//             }
//         }
//         //add to recycle bin
//         if (recycleBin.first == null) {
//             recycleBin.first = p;
//             p.prev = null;
//             p.next = null;
//         }
//         else {
//             p.next = recycleBin.first;
//             recycleBin.first.prev = p;
//             recycleBin.first = p;
//             p.prev = null;
//         }

//     }

// } 