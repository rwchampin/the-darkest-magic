import * as THREE from 'three'
import { Vector2 } from '~/utils/Vector'
import { Utils } from '~/utils'
const f = Utils.color.getColorsHSL('blue')
debugger
export class MagicMouse {
  constructor({ camera, scene, renderer}}) {
    this.pos = new Vector2(x, y)
    this.prevPos = new Vector2(x, y)
    this.radius = r
    this.vel = Vector2.random2D()
    this.acceleration = new Vector2(0, 0)
    this.maxSpeed = 5
    this.maxForce = 0.1
    this.color = Utils.color.getColorsHSL('blue')
  }

  init() {
    this.attachHandlers()
    this.pointLight = Utils.three.createLight({color: 0xFF0000, intensity: 200,})
    this.geometry = new THREE.SphereGeometry(.1, 32, 32)
    this.material = new THREE.MeshBasicMaterial({ color: this.color })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.raycaster = new THREE.Raycaster()
    this.raycaster.setFromCamera(this.pos, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children)
    for (let index = 0; index < intersects.length; index++) {
      this.pointLight.position.set(pos)
      
    }
  }

  attachHandlers() {
    window.addEventListener('mousemove', (event) => {
      pos.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    pos.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    })
  }
}
