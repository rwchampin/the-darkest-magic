import * as THREE from 'three';

function createRenderer() {
  const renderer = new THREE.WebGLRenderer();

  return renderer;
}

export { createRenderer };