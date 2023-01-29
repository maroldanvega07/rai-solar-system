

import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import Planet  from './src/classes/planet.js';
import Star  from './src/classes/star.js';

let scene, camera, ambientLight, controls, renderer, plight, container = document.getElementById("canvas");;
init();

function init() {
	
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
	ambientLight = new THREE.AmbientLight("#ffffff", 1);
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});
	plight = new THREE.PointLight( 0xff0000, 1, 0 );
	
	
	camera.position.set(0,0,500);
	ambientLight.position.set(0, 20, 20);
	plight.position.set( 0, 0, 0 );
	
	scene.add( plight);
	scene.add(ambientLight);
			
	controls = new OrbitControls( camera, renderer.domElement);
	controls.mouseButtons = {
		LEFT: THREE.MOUSE.ROTATE,
		MIDDLE: THREE.MOUSE.DOLLY,
		RIGHT: THREE.MOUSE.PAN
	}
	controls.update();

	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild( renderer.domElement );
	
}


// sun
const sun = new THREE.Group().add(new Star(30,0,'src/assets/Sun/sun.jpeg').getStar());
const mercury = new THREE.Group().add(new Planet(0.15,89,'src/assets/Mercury/mercury.jpg').getPlanet());
const venus = new THREE.Group().add(new Planet(0.42,97,'src/assets/Venus/venus.jpg').getPlanet());
const earth = new THREE.Group().add(new Planet(0.45,141,'src/assets/Earth/earth.jpg').getPlanet());
const mars = new THREE.Group().add(new Planet(0.25,181,'src/assets/Mars/mars.jpg').getPlanet());
const jupiter = new THREE.Group().add(new Planet(3,220,'src/assets/jupiter/jupiter.jpg').getPlanet());
const saturn = new THREE.Group().add(new Planet(1,250,'src/assets/saturn/saturn.jpg').getPlanet());
const uranus = new THREE.Group().add(new Planet(0.75,300,'src/assets/unanus/uranus.jpg').getPlanet());
const neptune = new THREE.Group().add(new Planet(0.100,350,'src/assets/neptune/neptune.jpg').getPlanet());
const pluto = new THREE.Group().add(new Planet(0.45,250,'src/assets/pluto/pluto.jpg').getPlanet());



var solar_system = 
	new THREE.Group().add(
		sun,
		earth,
		mercury,
		mars,
		jupiter,
		saturn,
		uranus,
		neptune,
		pluto,
	);

scene.add(solar_system);





const EARTH_YEAR = 2 * Math.PI * (1/60) * (1/60);
function animate() {
	sun.rotation.y += 0.001;
	mercury.rotation.y += EARTH_YEAR * 4;
	earth.rotation.y += EARTH_YEAR;
	mars.rotation.y += EARTH_YEAR;
    jupiter.rotation.y+= EARTH_YEAR
	saturn.rotation.y+= EARTH_YEAR
	uranus.rotation.y+= EARTH_YEAR
	neptune.rotation.y+= EARTH_YEAR
	pluto.rotation.y+= EARTH_YEAR
	requestAnimationFrame( animate );		
	controls.update();	
	renderer.render( scene, camera );
	
}

function move(direction) {
	
	var distance = direction=="f" ?  1 : -1;
	camera.translateZ(distance);
	
}

animate();


var buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onButtonClick, false);
};

function onButtonClick(event) {
  //alert(event.target.id);
  console.log(event.target.id);
  event.target.id == "move_forward" ? move('f') : "";
}
/**
* "Earth" (https://skfb.ly/6Uy6v) by AirStudios is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
* */

/**
* "Sun" (https://skfb.ly/6yGSx) by SebastianSosnowski is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
*/

// var loader_sun = new GLTFLoader();
// loader_sun.load('/src/assets/sun/scene.gltf', function(gltf) {
// 	var sun = gltf.scene;
// 	sun.scale.set(100,100,100);
// 	sun.add(plight);
// 	sun.position.set(91, 91, 91);

// 	scene.add(sun);
// });


// var loader = new GLTFLoader();
// loader.load('/src/assets/earth/scene.gltf', function(gltf) {
// 	var earth = gltf.scene;
// 	earth.scale.set(1,1,1);

// 	scene.add(earth);
// });