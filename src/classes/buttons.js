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

        var btn1 = document.createElement("button");
        btn1.innerHTML = "Mercury";
        btn1.id = "0";
        btn1.className = "planetbuttons btn btn-primary";
        this.buttonControls.appendChild(btn1);   

    }

}

