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
    this.color = 0xFFFFFF
    this.sphereSize = 0.005
    this.lightIntensity = 100
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
    this.mouseLight.add(this.mouseLightSphere)
    this.scene.add(this.mouseLightPlane)
    this.scene.add(this.mouseLight)
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
    this.mouseLight.castShadow = true
    this.mouseLight.shadow.bias = -0.005
    /**********************
     * Mouse Light Plane
     * @type {THREE.PlaneGeometry}
     * @type {THREE.MeshBasicMaterial}
     * @type {THREE.Mesh}
    */
    const planeGeometry = new THREE.PlaneGeometry(2, 1, 2, 2)
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 0xFFFFFF, specular: 0x333333, side: THREE.DoubleSide })
    this.mouseLightPlane = new THREE.Mesh(planeGeometry, planeMaterial)
    this.mouseLightPlane.receiveShadow = true
    /**********************
     * Mouse Light Sphere
     * @type {THREE.SphereGeometry}
     *  @type {THREE.MeshBasicMaterial}
      * @type {THREE.Mesh}
      * **/
    const sphereGeometry = new THREE.SphereGeometry(this.sphereSize, 32, 32)
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
    sphereMaterial.color.multiplyScalar(this.lightIntensity)
    this.mouseLightSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    /**********************
     * Raycaster
     * @type {THREE.Raycaster}
     * @type {THREE.Vector2}
     **/
    this.raycaster = new THREE.Raycaster()
  }

  attachHandlers() {
    window.addEventListener('mousemove', (event) => {
      this.pos.x = (event.clientX / window.innerWidth) * 2 - 1
      this.pos.y = -(event.clientY / window.innerHeight) * 2 + 1

      this.raycaster.setFromCamera(this.pos, this.camera)
      this.intersects = this.raycaster.intersectObjects(this.scene.children)

      for (let index = 0; index < this.intersects.length; index++) {
        this.mouseLight.position.copy(this.intersects[index].point)
        this.mouseLightSphere.position.copy(this.intersects[index].point)
      }
    })
  }
}
