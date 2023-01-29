import * as THREE from '../../node_modules/three/build/three.module.js';

export default class Buttons {
    constructor() {
        this.buttonControls = document.getElementById('buttons');
    }

    addPlanetButtons() {

        var btn = document.createElement("button");
        btn.innerHTML = "Control Rotation";
        btn.id = 'toggleRotation';
        this.buttonControls.appendChild(btn);   
    }




}

