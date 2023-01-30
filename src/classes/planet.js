import * as THREE from '../../node_modules/three/build/three.module.js';

export default class Planet {
    constructor(radius,positionX,textureFile) {
        this.radius = radius;
        this.positionX = positionX;
        this.textureFile = textureFile;
    }

    getPlanet() {
        if(this.mesh===undefined || this.mesh===null) {
            const geometry = new THREE.SphereGeometry(this.radius);
            const texture = new THREE.TextureLoader().load(this.textureFile);
            const material = new THREE.MeshBasicMaterial({map: texture});
            this.mesh = new THREE.Mesh(geometry,material);
            this.mesh.position.x = this.positionX;
            this.mesh.position.y = 0;
            this.mesh.position.z = 0;
            this.mesh.frustumCulled = false;
            
        }
        return this.mesh
    }

    resetPosition() {
        this.mesh.position.x = this.positionX;
        this.mesh.position.y = 0;
        this.mesh.position.z = 0;
    }
}