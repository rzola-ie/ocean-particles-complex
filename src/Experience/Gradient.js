import * as THREE from 'three'

import vertex from './shaders/gradient/vertex.glsl'
import fragment from './shaders/gradient/fragment.glsl'

export default class Gradient {
  constructor() {
    this.experience = window.experience
    this.scene = this.experience.scene
    this.debug = this.experience.debug

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'Gradient'
      })
    }

    this.setColors()
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setColors() {
    this.colors = {}

    this.colors.top = {}
    this.colors.top.value = '#000000'
    this.colors.top.instance = new THREE.Color(this.colors.top.value)

    this.colors.bottom = {}
    this.colors.bottom.value = '#152238'
    this.colors.bottom.instance = new THREE.Color(this.colors.bottom.value)

    if (this.debug) {
      this.debugFolder.addInput(
        this.colors.top,
        'value',
        { label: 'uColorTop' }
      ).on('change', () => {
        this.colors.top.instance.set(this.colors.top.value)
      })

      this.debugFolder.addInput(
        this.colors.bottom,
        'value',
        { label: 'uColorBottom' }
      ).on('change', () => {
        this.colors.bottom.instance.set(this.colors.bottom.value)
      })
    }
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uColorTop: { value: this.colors.top.instance },
        uColorBottom: { value: this.colors.bottom.instance },
        uColorOffset: { value: 0.1 },
        uColorMultiplier: { value: 2.6 }
      }
    })

    if (this.debug) {
      this.debugFolder.addInput(
        this.material.uniforms.uColorOffset,
        'value',
        { label: 'uColorOffset', min: -1.0, max: 1.0, step: 0.001 }
      )

      this.debug.addInput(
        this.material.uniforms.uColorMultiplier,
        'value',
        { label: 'uColorMultiplier', min: 1.0, max: 10.0, step: 0.001 }
      )
    }
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  update() { }
}