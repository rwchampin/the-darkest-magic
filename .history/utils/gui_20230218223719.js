import { Pane } from 'tweakpane'

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
    }
  }
}
