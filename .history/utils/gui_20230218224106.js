import { Pane } from 'tweakpane'

const sceneParams = {
    background: '#000000',
    backgroundBlurriness: 0,
    backgroundIntensity: 1,
    environment: false,
    environmentIntensity: 1,
    
    fog: false,
    fogColor: '#000000',
    fogNear: 0,
    fogFar: 0,

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
