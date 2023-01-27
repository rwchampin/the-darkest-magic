/* global define */
import Stats from 'stats.js'

const stats = new Stats()
stats.setMode(0) // 0: fps, 1: ms

// Align top-left


document.body.appendChild(stats.domElement)
export default stats

