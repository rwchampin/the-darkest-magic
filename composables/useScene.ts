import * as THREE from "three";


export const useScene = () => {
    const scene = new THREE.Scene();
    const fog = new THREE.Fog(0x000000, 0, 100);
    scene.fog = fog;
    return scene;
}