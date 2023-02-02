import * as THREE from 'three'
import { Vector2 } from '~/utils/Vector'
import { Utils } from '~/utils'

export default class MagicMouse {
  constructor({ camera, scene, renderer }) {
    const pos = new Vector2()
    const prevPos = new Vector2()
    const radius = Vector2.random2D()
    const vel = Vector2.random2D()
    const acc = new Vector2(0, 0)
    const maxSpeed = 5
    const maxForce = 0.1
    const color = Utils.color.getColorsHSL('blue')

    const raycaster = null
    const mouseLight = null
    const mouseLightPlane = null
    const mouseLightSphere = null

    const intersects = []

    init()
    setObjects()
    attachHandlers()
  }

  setObjects() {
    const mouseLightPlane.position.set(this.pos.x, this.pos.y, 0)
    const mouseLightPlane.rotation.x = -Math.PI / 2
    const mouseLightPlane.scale.set(5, 5, 5)
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
