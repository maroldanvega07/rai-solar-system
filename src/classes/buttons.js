import * as THREE from '../../node_modules/three/build/three.module.js';

export default class Buttons {
    constructor() {
        this.buttonControls = document.getElementById('buttons');
        
    }
    
    addPlanetButtons() {
        
        
         
        
        var btn1 = document.createElement("button");
        btn1.innerHTML = "Sun";
        btn1.id = "10";
        btn1.className = "planetbuttons btn btn-primary";
        this.buttonControls.appendChild(btn1);   
        
        
        
        var btn2 = document.createElement("button");
        btn2.innerHTML = "Mercury";
        btn2.id = "1";
        btn2.className = "planetbuttons btn btn-primary";
        this.buttonControls.appendChild(btn2);   
        
        
        
        var btn3 = document.createElement("button");
        btn3.innerHTML = "Venus";
        btn3.id = "2";
        btn3.className = "planetbuttons btn btn-primary";
        this.buttonControls.appendChild(btn3);   
        
        
        
        var btn4 = document.createElement("button");
        btn4.innerHTML = "Earth";
        btn4.id = "3";
        btn4.className = "planetbuttons btn btn-primary";
        this.buttonControls.appendChild(btn4);   
        
        
        var btn5 = document.createElement("button");
        btn5.innerHTML = "Mars";
        btn5.id = "4";
        btn5.className = "planetbuttons btn btn-primary";
        this.buttonControls.appendChild(btn5);   


        var btn6 = document.createElement("button");
        btn6.innerHTML = "Jupiter";
        btn6.id = "5";
        btn6.className = "planetbuttons btn btn-primary";
        this.buttonControls.appendChild(btn6); 
        
        
        
        var btn7 = document.createElement("button");
        btn7.innerHTML = "Saturn";
        btn7.id = "6";
        btn7.className = "planetbuttons btn btn-primary";
        this.buttonControls.appendChild(btn7); 

        
        var btn8 = document.createElement("button");
        btn8.innerHTML = "Uranus";
        btn8.id = "7";
        btn8.className = "planetbuttons btn btn-primary";
        this.buttonControls.appendChild(btn8); 

        
        var btn9 = document.createElement("button");
        btn9.innerHTML = "Neptune";
        btn9.id = "8";
        btn9.className = "planetbuttons btn btn-primary";
        this.buttonControls.appendChild(btn9); 


        
        var btn10 = document.createElement("button");
        btn10.innerHTML = "Pluto";
        btn10.id = "9";
        btn10.className = "planetbuttons btn btn-primary";
        this.buttonControls.appendChild(btn10); 




    
     
    }
    
    
    
    
    
    
    
}

