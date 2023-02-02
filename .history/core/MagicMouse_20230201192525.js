import * as THREE from 'three'
import { Vector2 } from '~/utils/Vector'
import { Utils } from '~/utils'

export default class MagicMouse {
  constructor({ camera, scene, renderer }) {
    this.pos = new Vector2()
    this.prevPos = new Vector2()
    this.radius = Vector2.random2D()
    this.vel = Vector2.random2D()
    this.acc = new Vector2(0, 0)
    this.maxSpeed = 5
    this.maxForce = 0.1
    this.color = Utils.color.getColorsHSL('blue')

    this.raycaster = null
    this.mouseLight = null
    this.mouseLightPlane = null
    this.mouseLightSphere = null

    this.intersects = []

    this.init()
  }

  init() {
    this.attachHandlers()
    /**********************
     * Raycaster
     * @type {THREE.Raycaster}
     * @type {THREE.Vector2}
     **/
    this.raycaster = new THREE.Raycaster()
    this.raycaster.setFromCamera(this.pos, this.camera)
    this.intersects = this.raycaster.intersectObjects(this.scene.children)

    /**********************
     * Mouse Light
     * @type {THREE.PointLight}
     * @type {THREE.SphereGeometry}
     * @type {THREE.MeshBasicMaterial}
     * @type {THREE.Mesh}
      */
    this.mouseLight = Utils.three.createLight({ color: 0xFF0000, intensity: 200 })

    /**********************
     * Mouse Light Plane
     * @type {THREE.PlaneGeometry}
     * @type {THREE.MeshBasicMaterial}
     * @type {THREE.Mesh}
    */
    const planeGeometry = new THREE.PlaneGeometry(2, 2, 2,2)
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide })
    this.mouseLightPlane = new THREE.Mesh(planeGeometry, planeMaterial)

    /**********************
    this.geometry = new THREE.SphereGeometry(1, 32, 32)
    this.material = new THREE.MeshBasicMaterial({ color: this.color })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.raycaster = new THREE.Raycaster()
    this.raycaster.setFromCamera(this.pos, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children)
    for (let index = 0; index < intersects.length; index++)
      this.pointLight.position.set(pos)

    this.scene.add(this.pointLight)
  }

  attachHandlers() {
    window.addEventListener('mousemove', (event) => {
      this.pos.x = (event.clientX / window.innerWidth) * 2 - 1
	    this.pos.y = -(event.clientY / window.innerHeight) * 2 + 1
    })
  }
}
