import * as THREE from 'three'

const x = y = z = 0
const r = 100
const angle = 0
const dTheta = 0.0567
const bsize = 60
const amp = 80
export const useCubeWall = ({ scene, camera, renderer }) => {
  function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    background(170)
  }

  function draw() {
    orbitControl()
    // angle += dTheta;
    background(0)
    ambientLight(120)
    pointLight(250, 250, 250, 100, 100, 0)
    ambientMaterial(250, 0, 120)

    for (let i = 0; i <= 20; i++) {
      for (let j = -10; j <= 10; j++) {
        push()
        translate(i * bsize - 500, j * bsize, 0)
        // rotateX(0.8 * frameCount * dTheta + sin(i * 0.01));
        // rotateY(0.8 * frameCount * dTheta + cos(j * 0.01));
        box(bsize, bsize, 10, 25, 25)
        pop()
      }
    }
  }
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
  }
}
