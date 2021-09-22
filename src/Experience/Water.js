import * as THREE from 'three'

import vertex from './shaders/water/vertex.glsl';
import fragment from './shaders/water/fragment.glsl';

export default class Water {
  constructor() {
    this.experience = window.experience
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.time = this.experience.time

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'Water'
      })
    }

    console.log('hello water')

    this.setColors()
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setColors() {
    // colors
    this.colors = {}

    // depth
    this.colors.depth = {}
    this.colors.depth.value = "#18438c"
    this.colors.depth.instance = new THREE.Color(this.colors.depth.value)

    // surface
    this.colors.surface = {}
    this.colors.surface.value = "#ffffff"
    this.colors.surface.instance = new THREE.Color(this.colors.surface.value)
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(3, 3, 512, 512)
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        // big waves
        uBigWavesElevation: { value: 0.13 },
        uBigWavesFrequency: { value: new THREE.Vector2(4, 2.5) },
        uBigWavesSpeed: { value: 0.5 },
        // small waves
        uSmallWavesElevation: { value: 0.1 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallWavesFrequency: { value: 3.0 },
        uSmallWavesIterations: { value: 4.0 },
        // color
        uDepthColor: { value: this.colors.depth.instance },
        uSurfaceColor: { value: this.colors.surface.instance },
        uColorOffset: { value: 0.05 },
        uColorMultiplier: { value: 5.0 }
      }
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = - Math.PI * 0.5
    this.scene.add(this.mesh)
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed * 0.0005
  }
}