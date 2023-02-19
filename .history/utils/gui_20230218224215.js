import { Pane } from 'tweakpane'

const fog = {
    fog: false,
    color: '#000000',
    fogNear: 0,
    fogFar: 0,
}

const FogExp2 = {
    fog: false,
    color: '#000000',
    density: 0,
}
const sceneParams = {
    background: '#000000',
    backgroundBlurriness: 0,
    backgroundIntensity: 1,
    environment: false,

   

export default class Gui {
  constructor() {
    this.pane = null

    this.init()
  }

  init() {
    if (window) {
      this.pane = new Pane({
        title: 'Settings',
        expanded: true,
      })

      document.body.appendChild(this.pane.element)
    }
  }
}
