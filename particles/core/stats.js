/* global define */
import Stats from 'stats.js'

const stats = new Stats()
stats.setMode(0) // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute'
stats.domElement.style.left = '0px'
stats.domElement.style.bottom = '0px'
stats.domElement.style.width = '200'

document.body.appendChild(stats.domElement)
export default stats

