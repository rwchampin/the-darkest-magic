import * as THREE from 'three'
import { Vector2 } from '~/utils/Vector'
import { Utils } from '~/utils'

export default class MagicMouse {
  constructor({ camera, scene, renderer }) {
    /*******************
     * 1. Setup
     * *****************/
    this.camera = camera
    this.scene = scene
    this.renderer = renderer

    /*******************
     * 2. Properties
     * *****************/
    this.pos = new Vector2()
    this.prevPos = new Vector2()
    this.radius = Vector2.random2D()
    this.vel = Vector2.random2D()
    this.acc = new Vector2(0, 0)
    this.maxSpeed = 5
    this.maxForce = 0.1
    this.color = Utils.color.getColorsHSL('blue')

    /*******************
     * 3. Methods
     * *****************/
    this.raycaster = null
    this.mouseLight = null
    this.mouseLightPlane = null
    this.mouseLightSphere = null

    this.intersects = []

    /*******************
     * 4. Init
     * *****************/
    this.init()
    this.setPositionsAddScene()
    this.attachHandlers()
  }

  setPositionsAddScene() {
    this.mouseLightPlane.position.set(this.pos.x, this.pos.y, 0)
    this.mouseLightPlane.rotation.x = -Math.PI / 2
    this.mouseLightPlane.scale.set(5, 5, 5)
    this.mouseLight.add(this.mouseLightSphere)
  }

  init() {
    /**********************
     * Mouse Light
     * @type {THREE.PointLight}
     * @type {THREE.SphereGeometry}
     * @type {THREE.MeshBasicMaterial}
     * @type {THREE.Mesh}
      */
    this.mouseLight = new THREE.PointLight(0xFFFFFF, 100, 100)

    /**********************
     * Mouse Light Plane
     * @type {THREE.PlaneGeometry}
     * @type {THREE.MeshBasicMaterial}
     * @type {THREE.Mesh}
    */
    const planeGeometry = new THREE.PlaneGeometry(2, 2, 2, 2)
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00, side: THREE.DoubleSide })
    this.mouseLightPlane = new THREE.Mesh(planeGeometry, planeMaterial)

    /**********************
     * Mouse Light Sphere
     * @type {THREE.SphereGeometry}
     *  @type {THREE.MeshBasicMaterial}
      * @type {THREE.Mesh}
      * **/
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF })
    this.mouseLightSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    /**********************
     * Raycaster
     * @type {THREE.Raycaster}
     * @type {THREE.Vector2}
     **/
    this.raycaster = new THREE.Raycaster()
    this.raycaster.setFromCamera(this.pos, this.camera)
    this.intersects = this.raycaster.intersectObjects(this.scene.children)

    const intersects = this.raycaster.intersectObjects(this.scene.children)
    for (let index = 0; index < intersects.length; index++)
      this.mouseLight.position.copy(intersects[index].point)
  }

  attachHandlers() {
    window.addEventListener('mousemove', (event) => {
      this.pos.x = (event.clientX / window.innerWidth) * 2 - 1
      this.pos.y = -(event.clientY / window.innerHeight) * 2 + 1
    })
  }
}
