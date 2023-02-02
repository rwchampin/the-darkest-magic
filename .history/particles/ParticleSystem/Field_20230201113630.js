import Vector from '../Util'
export default function Field(point, mass) {
  this.position = point
  this.size = 8
  this.setMass(mass)
}

Field.drawColor = 'rgb(0,0,255)'
Field.drawColor2 = 'rgb(0,0,0)'

Field.prototype.setMass = function (mass) {
  this.mass = mass
  this.drawColor = mass < 0 ? '#900' : '#090'
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
  const field = new Field(Vector.fromString(parts.shift()), parseInt(parts.shift()))
  return field
}
