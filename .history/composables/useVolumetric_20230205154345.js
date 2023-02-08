import * as THREE from 'three'
import chroma from 'chroma-js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'

const useVolumetric = ({ scene, camera, ctx, canvas2d }) => {
  // eslint-disable-next-line no-undef

  let additiveBlendingShader, passThroughShader, mesh, material, composer, pointLight,
    occlusionComposer, occlusionRenderTarget, lightSphere, volumetericLightShaderUniforms,
    DEFAULT_LAYER = 0, OCCLUSION_LAYER = 1, renderScale = 0.5
  const sphereRad = 280, radius_sp = 1;



    var introCanvas = canvas2d
    var context = ctx
    const colors = chroma.scale(['gray', 'black']).colors(20);


    // var timer;
    var wait;
    var count;
    var numToAddEachFrame;
    var particleList;
    var recycleBin;
    var particleAlpha;
    var fLen;
    var m;
    var projCenterX;
    var projCenterY;
    var zMax;
    var turnAngle;
    var turnSpeed;
    var sphereCenterX, sphereCenterY, sphereCenterZ;
    var particleRad;
    var zeroAlphaDepth;
    var randAccelX, randAccelY, randAccelZ;
    var gravity;
    //we are defining a lot of variables used in the screen update functions globally so that they don't have to be redefined every frame.
    var p;
    var outsideTest;
    var nextParticle;
    var sinAngle;
    var cosAngle;
    var rotX, rotZ;
    var depthAlphaFactor;
    var i;
    var theta, phi;
    var x0, y0, z0;

    

    function init() {
      wait = 1;
      count = wait - 1;
      numToAddEachFrame = 8;
      particleAlpha = 1; //maximum alpha

      displayWidth = introCanvas.width;
      window.innerHeight = introCanvas.height;

      fLen = 320; //represents the distance from the viewer to z=0 depth.

      //projection center coordinates sets location of origin
      projCenterX = window.innerWidth / 2;
      projCenterY = window.innerHeight / 2;

      //we will not draw coordinates if they have too large of a z-coordinate (which means they are very close to the observer).
      zMax = fLen - 2;

      particleList = {};
      recycleBin = {};

      //random acceleration factors - causes some random motion
      randAccelX = 0.1;
      randAccelY = 0.1;
      randAccelZ = 0.1;

      gravity = -0; //try changing to a positive number (not too large, for example 0.3), or negative for floating upwards.

      particleRad = 2.5;

      sphereCenterX = 0;
      sphereCenterY = 0;
      sphereCenterZ = -3 - sphereRad;

      //alpha values will lessen as particles move further back, causing depth-based darkening:
      zeroAlphaDepth = -750;

      turnSpeed = 2 * Math.PI / 1200; //the sphere will rotate at this speed (one complete rotation every 1600 frames).
      turnAngle = 0; //initial angle

      // timer = setInterval(onTimer, 10 / 24);
    }

    function onTimer() {
      //if enough time has elapsed, we will add new particles.		
      count++;
      if (count >= wait) {

        count = 0;
        for (i = 0; i < numToAddEachFrame; i++) {
          theta = Math.random() * 2 * Math.PI;
          phi = Math.acos(Math.random() * 2 - 1);
          x0 = sphereRad * Math.sin(phi) * Math.cos(theta);
          y0 = sphereRad * Math.sin(phi) * Math.sin(theta);
          z0 = sphereRad * Math.cos(phi);

          //We use the addParticle function to add a new particle. The parameters set the position and velocity components.
          //Note that the velocity parameters will cause the particle to initially fly outwards away from the sphere center (after
          //it becomes unstuck).
          var p = addParticle(x0, sphereCenterY + y0, sphereCenterZ + z0, 0.002 * x0, 0.002 * y0, 0.002 * z0);

          //we set some "envelope" parameters which will control the evolving alpha of the particles.
          p.attack = 50;
          p.hold = 50;
          p.decay = 100;
          p.initValue = 0;
          p.holdValue = particleAlpha;
          p.lastValue = 0;

          //the particle will be stuck in one place until this time has elapsed:
          p.stuckTime = 90 + Math.random() * 20;

          p.accelX = 0;
          p.accelY = gravity;
          p.accelZ = 0;
        }
      }

      //update viewing angle
      turnAngle = (turnAngle + turnSpeed) % (2 * Math.PI);
      sinAngle = Math.sin(turnAngle);
      cosAngle = Math.cos(turnAngle);

      //background fill
      context.fillStyle = "green";
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      //update and draw particles
      p = particleList.first;
      while (p != null) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        //before list is altered record next particle
        nextParticle = p.next;

        //update age
        p.age++;

        //if the particle is past its "stuck" time, it will begin to move.
        if (p.age > p.stuckTime) {
          p.velX += p.accelX + randAccelX * (Math.random() * 2 - 1);
          p.velY += p.accelY + randAccelY * (Math.random() * 2 - 1);
          p.velZ += p.accelZ + randAccelZ * (Math.random() * 2 - 1);

          p.x += p.velX;
          p.y += p.velY;
          p.z += p.velZ;
        }

        /*
        We are doing two things here to calculate display coordinates.
        The whole display is being rotated around a vertical axis, so we first calculate rotated coordinates for
        x and z (but the y coordinate will not change).
        Then, we take the new coordinates (rotX, y, rotZ), and project these onto the 2D view plane.
        */
        rotX = cosAngle * p.x + sinAngle * (p.z - sphereCenterZ);
        rotZ = -sinAngle * p.x + cosAngle * (p.z - sphereCenterZ) + sphereCenterZ;
        m = radius_sp * fLen / (fLen - rotZ);
        p.projX = rotX * m + projCenterX;
        p.projY = p.y * m + projCenterY;

        //update alpha according to envelope parameters.
        if (p.age < p.attack + p.hold + p.decay) {
          if (p.age < p.attack) {
            p.alpha = (p.holdValue - p.initValue) / p.attack * p.age + p.initValue;
          }
          else if (p.age < p.attack + p.hold) {
            p.alpha = p.holdValue;
          }
          else if (p.age < p.attack + p.hold + p.decay) {
            p.alpha = (p.lastValue - p.holdValue) / p.decay * (p.age - p.attack - p.hold) + p.holdValue;
          }
        }
        else {
          p.dead = true;
        }

        //see if the particle is still within the viewable range.
        if ((p.projX > window.innerWidth) || (p.projX < 0) || (p.projY < 0) || (p.projY > window.innerHeight) || (rotZ > zMax)) {
          outsideTest = true;
        }
        else {
          outsideTest = false;
        }

        if (outsideTest || p.dead) {
          recycle(p);
        }

        else {
          //depth-dependent darkening
          const r = colors[Math.round(Math.random() * 20)]
          depthAlphaFactor = (1 - rotZ / zeroAlphaDepth);
          depthAlphaFactor = (depthAlphaFactor > 1) ? 1 : ((depthAlphaFactor < 0) ? 0 : depthAlphaFactor);
          context.fillStyle = r;
          context.globalAlpha = p.alpha * depthAlphaFactor;

          //draw
          context.beginPath();
          context.arc(p.projX, p.projY, m * particleRad, 0, 1.5 * Math.PI, false);
          context.closePath();
          context.fill();
        }

        p = nextParticle;
      }
    }

    function addParticle(x0, y0, z0, vx0, vy0, vz0) {
      var newParticle;
      var color;

      //check recycle bin for available drop:
      if (recycleBin.first != null) {
        newParticle = recycleBin.first;
        //remove from bin
        if (newParticle.next != null) {
          recycleBin.first = newParticle.next;
          newParticle.next.prev = null;
        }
        else {
          recycleBin.first = null;
        }
      }
      //if the recycle bin is empty, create a new particle (a new ampty object):
      else {
        newParticle = {};
      }

      //add to beginning of particle list
      if (particleList.first == null) {
        particleList.first = newParticle;
        newParticle.prev = null;
        newParticle.next = null;
      }
      else {
        newParticle.next = particleList.first;
        particleList.first.prev = newParticle;
        particleList.first = newParticle;
        newParticle.prev = null;
      }

      //initialize
      newParticle.x = x0;
      newParticle.y = y0;
      newParticle.z = z0;
      newParticle.velX = vx0;
      newParticle.velY = vy0;
      newParticle.velZ = vz0;
      newParticle.age = 0;
      newParticle.dead = false;
      if (Math.random() < 0.5) {
        newParticle.right = true;
      }
      else {
        newParticle.right = false;
      }
      return newParticle;
    }

    function recycle(p) {
      //remove from particleList
      if (particleList.first == p) {
        if (p.next != null) {
          p.next.prev = null;
          particleList.first = p.next;
        }
        else {
          particleList.first = null;
        }
      }
      else {
        if (p.next == null) {
          p.prev.next = null;
        }
        else {
          p.prev.next = p.next;
          p.next.prev = p.prev;
        }
      }
      //add to recycle bin
      if (recycleBin.first == null) {
        recycleBin.first = p;
        p.prev = null;
        p.next = null;
      }
      else {
        p.next = recycleBin.first;
        recycleBin.first.prev = p;
        recycleBin.first = p;
        p.prev = null;
      }
    }

   


  onMounted(() => {
     init();
    volumetericLightShader = {
      uniforms: {
        tDiffuse: { value: null },
        lightPosition: { value: new THREE.Vector2(0.5, 0.5) },
        exposure: { value: 0.18 },
        decay: { value: 0.95 },
        density: { value: 0.8 },
        weight: { value: 0.4 },
        samples: { value: 50 }
      },

      vertexShader: [
        "varying vec2 vUv;",
        "void main() {",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"
      ].join("\n"),

      fragmentShader: [
        "varying vec2 vUv;",
        "uniform sampler2D tDiffuse;",
        "uniform vec2 lightPosition;",
        "uniform float exposure;",
        "uniform float decay;",
        "uniform float density;",
        "uniform float weight;",
        "uniform int samples;",
        "const int MAX_SAMPLES = 100;",
        "void main()",
        "{",
        "vec2 texCoord = vUv;",
        "vec2 deltaTextCoord = texCoord - lightPosition;",
        "deltaTextCoord *= 1.0 / float(samples) * density;",
        "vec4 color = texture2D(tDiffuse, texCoord);",
        "float illuminationDecay = 1.0;",
        "for(int i=0; i < MAX_SAMPLES; i++)",
        "{",
        "if(i == samples){",
        "break;",
        "}",
        "texCoord -= deltaTextCoord;",
        "vec4 sample = texture2D(tDiffuse, texCoord);",
        "sample *= illuminationDecay * weight;",
        "color += sample;",
        "illuminationDecay *= decay;",
        "}",
        "gl_FragColor = color * exposure;",
        "}"
      ].join("\n")
    };

    additiveBlendingShader = {
      uniforms: {
        tDiffuse: { value: null },
        tAdd: { value: null }
      },

      vertexShader: [
        "varying vec2 vUv;",
        "void main() {",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"
      ].join("\n"),

      fragmentShader: [
        "uniform sampler2D tDiffuse;",
        "uniform sampler2D tAdd;",
        "varying vec2 vUv;",
        "void main() {",
        "vec4 color = texture2D( tDiffuse, vUv );",
        "vec4 add = texture2D( tAdd, vUv );",
        "gl_FragColor = color + add;",
        "}"
      ].join("\n")
    };

    passThroughShader = {
      uniforms: {
        tDiffuse: { value: null }
      },

      vertexShader: [
        "varying vec2 vUv;",
        "void main() {",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"
      ].join("\n"),

      fragmentShader: [
        "uniform sampler2D tDiffuse;",
        "varying vec2 vUv;",
        "void main() {",
        "gl_FragColor = texture2D( tDiffuse, vec2( vUv.x, vUv.y ) );",
        "}"
      ].join("\n")
    };





    function setupScene() {
      let geometry,
        material;



      geometry = new THREE.SphereBufferGeometry(1, 16, 16);
      material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      lightSphere = new THREE.Mesh(geometry, material);
      lightSphere.layers.set(OCCLUSION_LAYER);
      scene.add(lightSphere);
      camera.position.z = 30
    }

    function setupPostprocessing() {
      var pass;

      occlusionRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth * renderScale, window.innerHeight * renderScale);
      occlusionComposer = new EffectComposer(renderer, occlusionRenderTarget);
      occlusionComposer.addPass(new RenderPass(scene, camera));
      pass = new ShaderPass(volumetericLightShader);
      pass.needsSwap = false;
      occlusionComposer.addPass(pass);

      volumetericLightShaderUniforms = pass.uniforms;

      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      pass = new ShaderPass(additiveBlendingShader);
      pass.uniforms.tAdd.value = occlusionRenderTarget.texture;
      composer.addPass(pass);
      pass.renderToScreen = true;
    }

    // function onFrame() {
    //   // update();
    //   render();
    // }

    // function update(){
    //   var radius = 2.5,
    //       xpos = Math.sin(angle) * radius,
    //       zpos = Math.cos(angle) * radius;

    //   angle += 0.02;
    // }

    function render() {
      camera.layers.set(OCCLUSION_LAYER);
      occlusionComposer.render();

      camera.layers.set(DEFAULT_LAYER);
      composer.render();
      requestAnimationFrame(render);
    }

    // function setupGUI(){
    //   var folder,
    //       min,
    //       max,
    //       step,
    //       updateShaderLight = function(){
    //         var p = lightSphere.position.clone(),
    //             vector = p.project(camera),
    //             x = ( vector.x + 1 ) / 2,
    //             y = ( vector.y + 1 ) / 2;
    //         volumetericLightShaderUniforms.lightPosition.value.set(x, y);
    //         pointLight.position.copy(lightSphere.position);
    //     };

    //   folder = gui.addFolder('Light Position');
    //   folder.add(lightSphere.position, 'x').min(-10).max(10).step(0.1).onChange(updateShaderLight);
    //   folder.add(lightSphere.position, 'y').min(-10).max(10).step(0.1).onChange(updateShaderLight);
    //   folder.add(lightSphere.position, 'z').min(-10).max(10).step(0.1).onChange(updateShaderLight);
    //   folder.open();

    //   folder = gui.addFolder('Volumeteric Light Shader');
    //   Object.keys(volumetericLightShaderUniforms).forEach(function(key) {
    //     if(key !==  'tDiffuse' && key != 'lightPosition' ){
    //       prop = volumetericLightShaderUniforms[key];

    //       switch ( key ) {
    //         case 'exposure':
    //           min = 0;
    //           max = 1;
    //           step = 0.01;
    //           break;
    //         case 'decay':
    //           min = 0.8;
    //           max = 1;
    //           step = 0.001;
    //           break;
    //         case 'density':
    //           min = 0;
    //           max = 1;
    //           step = 0.01;
    //           break;
    //         case 'weight':
    //           min = 0;
    //           max = 1;
    //           step = 0.01;
    //           break;
    //         case 'samples':
    //           min = 1;
    //           max = 100;
    //           step = 1.0;
    //           break;
    //       }

    //       folder.add(prop, 'value').min(min).max(max).step(step).name(key);
    //     }
    //   });
    //   folder.open();

    // }

    function addRenderTargetImage() {
      let material,
        mesh;

      material = new THREE.ShaderMaterial(passThroughShader);
      material.uniforms.tDiffuse.value = occlusionRenderTarget.texture;

      mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), material);
      composer.passes[0].scene.add(mesh);
      mesh.visible = false;

      // folder = gui.addFolder('Light Pass Render Image');
      // folder.add(mesh, 'visible');
      // folder.add({scale:0.5}, 'scale', { Full: 1, Half: 0.5, Quarter: 0.25 })
      //   .onChange(function(value) {
      //   renderScale = value;
      //   window.dispatchEvent(new Event('resize'));
      // });
      // folder.open();

    }

    // window.addEventListener( 'resize', function(){

    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();

    //   renderer.setSize( window.innerWidth, window.innerHeight );

    //   var pixelRatio = renderer.getPixelRatio(),
    //       newWidth  = Math.floor( window.innerWidth / pixelRatio ) || 1,
    //       newHeight = Math.floor( window.innerHeight / pixelRatio ) || 1;

    //   composer.setSize( newWidth, newHeight );
    //   occlusionComposer.setSize( newWidth * renderScale, newHeight * renderScale );

    // }, false );

    setupScene();
    setupPostprocessing();
    // setupGUI();
    addRenderTargetImage();
    render();

  })
};

export { useVolumetric }