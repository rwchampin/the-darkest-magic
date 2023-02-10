
  //


  const fuck = () => {

    const volumetericLightShader = {
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
        "vec4 t = texture2D(tDiffuse, texCoord);",
        "t *= illuminationDecay * weight;",
        "color += t;",
        "illuminationDecay *= decay;",
        "}",
        "gl_FragColor = color * exposure;",
        "}"
      ].join("\n")
    };

    const additiveBlendingShader = {
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

    const passThroughShader = {
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


    var composer, box, pointLight,
      occlusionComposer, occlusionRenderTarget, occlusionBox, lightSphere,
      volumetericLightShaderUniforms,
      DEFAULT_LAYER = 0,
      OCCLUSION_LAYER = 1,
      renderScale = 0.5,
      angle = 0




    function setupScene() {
      var ambientLight,
        geometry,
        material;

      ambientLight = new THREE.AmbientLight(0x2c3e50);
      scene.add(ambientLight);

      pointLight = new THREE.PointLight(0xffffff);
      scene.add(pointLight);

      geometry = new THREE.SphereGeometry(1, 16, 16);
      material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      lightSphere = new THREE.Mesh(geometry, material);
      lightSphere.layers.set(OCCLUSION_LAYER);
      lightSphere.position.set(0, 0, 1)
      scene.add(lightSphere);

      geometry = new THREE.BoxGeometry(1, 1, 1);
      material = new THREE.MeshPhongMaterial({ color: 0xe74c3c });
      box = new THREE.Mesh(geometry, material);
      box.position.z = 2;
      scene.add(box);

      material = new THREE.MeshBasicMaterial({ color: 0x000000 });
      occlusionBox = new THREE.Mesh(geometry, material);
      occlusionBox.position.z = 2;
      occlusionBox.layers.set(OCCLUSION_LAYER);
      scene.add(occlusionBox);

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

    function onFrame() {
      requestAnimationFrame(onFrame);
      update();
      render();
    }

    function update() {
      var radius = 2.5,
        xpos = Math.sin(angle) * radius,
        ypos = Math.cos(angle) * radius,
        zpos = Math.cos(angle) * radius;

      box.position.set(xpos, ypos, zpos);
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      occlusionBox.position.copy(box.position);
      occlusionBox.rotation.copy(box.rotation);

      angle += 0.02;
    }

    function render() {
      camera.layers.set(OCCLUSION_LAYER);
      renderer.setClearColor(0x000000);
      occlusionComposer.render();

      // camera.layers.set(DEFAULT_LAYER);
      // renderer.setClearColor(0x090611);
      composer.render();
    }

    // function setupGUI() {
    //   var folder,
    //     min,
    //     max,
    //     step,
    //     updateShaderLight = function () {
    //       var p = lightSphere.position.clone(),
    //         vector = p.project(camera),
    //         x = (vector.x + 1) / 2,
    //         y = (vector.y + 1) / 2;
    //       volumetericLightShaderUniforms.lightPosition.value.set(x, y);
    //       pointLight.position.copy(lightSphere.position);
    //     };

    //   // folder = gui.addFolder('Light Position');
    //   // folder.add(lightSphere.position, 'x').min(-10).max(10).step(0.1).onChange(updateShaderLight);
    //   // folder.add(lightSphere.position, 'y').min(-10).max(10).step(0.1).onChange(updateShaderLight);
    //   // folder.add(lightSphere.position, 'z').min(-10).max(10).step(0.1).onChange(updateShaderLight);
    //   // folder.open();

    //   // folder = gui.addFolder('Volumeteric Light Shader');
    //   Object.keys(volumetericLightShaderUniforms).forEach(function (key) {
    //     if (key !== 'tDiffuse' && key != 'lightPosition') {
    //       prop = volumetericLightShaderUniforms[key];

    //       switch (key) {
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
      var material,
        mesh,
        folder;

      material = new THREE.ShaderMaterial(passThroughShader);
      material.uniforms.tDiffuse.value = occlusionRenderTarget.texture;

      mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      composer.passes[0].scene.add(mesh);
      mesh.visible = false;


    }

    window.addEventListener('resize', function () {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      var pixelRatio = renderer.getPixelRatio(),
        newWidth = Math.floor(window.innerWidth / pixelRatio) || 1,
        newHeight = Math.floor(window.innerHeight / pixelRatio) || 1;

      composer.setSize(newWidth, newHeight);
      occlusionComposer.setSize(newWidth * renderScale, newHeight * renderScale);

    }, false);

    setupScene();
    setupPostprocessing();
    // setupGUI();
    addRenderTargetImage();
    onFrame();


  }


  // fuck();

