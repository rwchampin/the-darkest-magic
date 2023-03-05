import { createSharedComposable } from "@vueuse/core";
let rendererInstance = null;
let renderer = null;
export const Canvas3d = createSharedComposable(async () => {
  if (rendererInstance) return rendererInstance;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  const waitUntilWindowLoaded = () => {
    return new Promise((resolve) => {
      window.addEventListener("load", resolve);
    });
  };

  const init = async () => {
    await waitUntilWindowLoaded();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.domElement.setAttribute("id", "main-canvas-3d");
    renderer.domElement.setAttribute("class", "ui-canvas");

    document.body.appendChild(renderer.domElement);
  };

  await init();

  return renderer;
});
