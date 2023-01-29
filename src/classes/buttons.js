import * as THREE from '../../node_modules/three/build/three.module.js';

export default class Buttons {
    constructor() {
        this.buttonControls = document.getElementById('buttons');
    }

    addPlanetButtons() {
        var btn = document.createElement("button");
        btn.innerHTML = "Earth";
        this.buttonControls.appendChild(btn);   
    }
}

