export default class Water {
  constructor() {
    this.experience = window.experience
    this.scene = this.experience.scene
    this.debug = this.experience.debug

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'Water'
      })
    }
  }

  setColors() {

  }

  setGeometry() {

  }

  setMaterial() {

  }

  setMesh() {

  }

  update() {

  }
}