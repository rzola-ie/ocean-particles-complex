import * as THREE from 'three'
import Gradient from './Gradient.js'
import Water from './Water.js'
import Portal from './Portal.js'
import Particles from './Particles.js'

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
                this.setPortal()
                this.setParticles()
            }
        })
    }

    setGradient() {
        this.gradient = new Gradient()
    }

    setWater() {
        this.water = new Water()
    }

    setPortal() {
        this.portal = new Portal()
    }

    setParticles() {
        this.particles = new Particles()
    }

    resize() {
    }

    update() {
        if (this.water)
            this.water.update()

        if (this.portal)
            this.portal.update()

        if (this.particles)
            this.particles.update()
    }

    destroy() {
    }
}