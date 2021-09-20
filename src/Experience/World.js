import * as THREE from 'three'
import Gradient from './Gradient.js'
import Water from './Water.js'

export default class World {
    constructor(_options) {
        this.experience = window.experience
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('groupEnd', (_group) => {
            if (_group.name === 'base') {
                this.setGradient()
                this.setWater()
            }
        })
    }

    setGradient() {
        this.gradient = new Gradient()
    }

    setWater() {
        this.water = new Water()
    }

    resize() {
    }

    update() {
    }

    destroy() {
    }
}