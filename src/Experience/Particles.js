import * as THREE from 'three'

import vertex from './shaders/particles/vertex.glsl'
import fragment from './shaders/particles/fragment.glsl'

export default class Particles {
  constructor() {
    this.experience = window.experience
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.resources = this.experience.resources

    this.count = 200

    this.setAttributes()
    this.setGeometry()
    this.setMaterial()
    this.setPoints()
  }

  setAttributes() {
    this.attributes = {}

    // position
    this.attributes.position = {}
    this.attributes.position.data = new Float32Array(this.count * 3)
    this.attributes.position.instance = new THREE.BufferAttribute(this.attributes.position.data, 3)

    // progress
    this.attributes.progress = {}
    this.attributes.progress.data = new Float32Array(this.count)
    this.attributes.progress.instance = new THREE.BufferAttribute(this.attributes.progress.data, 1)

    // scale
    this.attributes.scale = {}
    this.attributes.scale.data = new Float32Array(this.count)
    this.attributes.scale.instance = new THREE.BufferAttribute(this.attributes.scale.data, 1)

    // alpha
    this.attributes.alpha = {}
    this.attributes.alpha.data = new Float32Array(this.count)
    this.attributes.alpha.instance = new THREE.BufferAttribute(this.attributes.alpha.data, 1)

    for (let i = 0; i < this.count; i++) {
      const stride = i * 3

      this.attributes.position.data[stride + 0] = (Math.random() - 0.5) * 2
      this.attributes.position.data[stride + 1] = - 0.2
      this.attributes.position.data[stride + 2] = (Math.random() - 0.5) * 2

      this.attributes.progress.data[i] = Math.random()
      this.attributes.scale.data[i] = Math.random()
      this.attributes.alpha.data[i] = Math.random()
    }
  }

  setGeometry() {
    this.geometry = new THREE.BufferGeometry()
    this.geometry.setAttribute('position', this.attributes.position.instance)
    this.geometry.setAttribute('aProgress', this.attributes.progress.instance)
    this.geometry.setAttribute('aScale', this.attributes.scale.instance)
    this.geometry.setAttribute('aAlpha', this.attributes.alpha.instance)
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uMask: { value: this.resources.items.particleTexture },
        uTime: { value: 0 },
        uSize: { value: 25 },
        uProgressSpeed: { value: 0.1 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      }
    })
  }

  setPoints() {
    this.points = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.points)
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed * 0.0001
  }
}