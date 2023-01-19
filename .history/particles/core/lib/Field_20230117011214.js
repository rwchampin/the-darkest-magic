import Vector from './Vector'

function Field(point, mass) {
  this.position = point
  this.size = 15
  this.mass = 0
  this.drawColor = '#b00'
  this.setMass(mass)
}

Field.drawColor = 'rgb(0,0,255)'
Field.drawColor2 = 'hsl(0,0%,0%)'

Field.prototype.setMass = function (mass) {
  this.mass = mass
  this.drawColor = mass < 0 ? '#f00' : '#0f0'
  return this
}
Field.prototype.moveTo = function (point) {
  this.position = point
}

Field.prototype.toString = function () {
  const coreAttributes = [
    this.position.toString(),
    this.mass,
  ]
  return `F${coreAttributes.join(':')}`
}
Field.fromString = function (string) {
  const parts = string.substr(1).split(':')
  const field = new Field(Vector.fromString(parts.shift()), parseInt(parts.shift(), 10))
  return field
}

export default Field

