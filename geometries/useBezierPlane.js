export const useBezierPlane = (options) => {
  // Bend Three JS plane geometry with bezier curve
  // Curved plane generation, bezier curve plane,
  function bendPlaneGeometry(planeGeometry, centerBendZ) {
    const curve = new THREE.CubicBezierCurve3(
      planeGeometry.vertices[0],
      new THREE.Vector3(planeGeometry.parameters.width / 2, 0, centerBendZ),
      new THREE.Vector3(planeGeometry.parameters.width / 2, 0, centerBendZ),
      planeGeometry.vertices[planeGeometry.vertices.length / 2 - 1]
    );

    const planePoints = curve.getPoints(
      Math.abs(planeGeometry.vertices.length / 2) - 1
    );

    for (let edgeI = 1; edgeI < 3; edgeI++) {
      for (let pointI = 0; pointI < planePoints.length; pointI++)
        planeGeometry.vertices[
          edgeI === 2 ? planePoints.length + pointI : pointI
        ].z = planePoints[pointI].z;
    }

    planeGeometry.computeFaceNormals();
    planeGeometry.computeVertexNormals();

    return planeGeometry;
  }
};
