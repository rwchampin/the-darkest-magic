import * as THREE from "three";

interface Plane {
  width: number;
  height: number;
  widthSegments: number;
  heightSegments: number;
  color: THREE.Color;
  side?: THREE.Side;
  receiveShadow?: boolean;
  material?: THREE.Material;
}
export const usePlane = ({
    width, 
    height,
    widthSegments,
    heightSegments, 
    color,
    side,
    receiveShadow,
    material
  }:Plane): THREE.Mesh => {
  const plane = new THREE.PlaneGeometry(
    width,
    height,
    widthSegments,
    heightSegments
  );
  if (material && material instanceof THREE.Material) {
    const mesh = new THREE.Mesh(plane, material);
    return mesh;
  }
  const mat = new THREE.MeshBasicMaterial({
    color: color || 0xffffff,
    side: side,
  });
  return new THREE.Mesh(plane, mat);
};
