import * as THREE from 'three'

import vertex from './shaders/portal/vertex.glsl'
import fragment from './shaders/portal/fragment.glsl'

export default class Portal {
  constructor() {
    this.experience = window.experience
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.time = this.experience.time
    this.resources = this.experience.resources

    console.log(this.resources.items.portalModel.scene)

    this.setColors()
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
    this.setModel()
  }

  setColors() {
    this.colors = {}

    this.colors.color1 = {}
    this.colors.color1.value = '#add8e6'
    this.colors.color1.instance = new THREE.Color(this.colors.color1.value)

    this.colors.color2 = {}
    this.colors.color2.value = '#1c2e4a'
    this.colors.color2.instance = new THREE.Color(this.colors.color2.value)

    this.colors.color3 = {}
    this.colors.color3.value = '#23395d'
    this.colors.color3.instance = new THREE.Color(this.colors.color3.value)

    this.colors.color4 = {}
    this.colors.color4.value = '#add8e6'
    this.colors.color4.instance = new THREE.Color(this.colors.color4.value)
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 16, 16)
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: this.colors.color1.instance },
        uColor2: { value: this.colors.color2.instance },
        uColor3: { value: this.colors.color3.instance },
        uColor4: { value: this.colors.color4.instance }
      }
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.y = 0.52

    this.scene.add(this.mesh)
  }

  setModel() {
    this.texture = this.resources.items.portalTexture
    this.texture.flipY = false
    this.texture.encoding = THREE.sRGBEncoding

    this.portalMaterial = new THREE.MeshBasicMaterial({
      map: this.texture
    })

    this.model = this.resources.items.portalModel.scene

    this.portalMesh = this.model.children.find(child => child.name === 'Cube006')

    this.portalMesh.material = this.portalMaterial

    this.model.position.y = -0.1
    this.model.scale.set(0.15, 0.15, 0.15)



    this.brickMaterial = new THREE.MeshBasicMaterial({ color: 0x545454 })

    console.log

    this.scene.add(this.model)
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed * 0.001
  }
}