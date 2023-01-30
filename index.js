

import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { FlyControls } from './node_modules/three/examples/jsm/controls/FlyControls.js';
//import { ObjectLoader } from './node_modules/three/examples/jsm/loaders/ObjectLoader.js';
import Stats from './node_modules/three/examples/jsm/libs/stats.module.js';
import Planet  from './src/classes/planet.js';
import Star  from './src/classes/star.js';
import Buttons from './src/classes/buttons.js';

let flyControls, loader, enableRotation=true, stats, INTERSECTED, radius, theta =0, raycaster, pointer, scene, camera, ambientLight, controls, renderer, plight, container = document.getElementById("canvas");;

const response = await fetch('./src/data.json');
const data = await response.json();

init();



function showPlanetData(i) {
	console.log(data.planets[i]);
	var planet_data = data.planets[i];
	var info = document.getElementById('info-section');
	info.style = "color:white";
	info.innerHTML = "<h2>"+planet_data.name+"</h2><table class='table' style='color:white' ><tr><th>Diameter</th><th>Times Smaller Then The Sun</th><th>Distance From Sun</th><th>Fact</th></tr><tr><td>"+planet_data.diameter+"</td><td>"+planet_data.times_smaller_than_sun+"</td><td>"+planet_data.distance_from_sun+"</td><td>"+planet_data.fact +"</td></tr></table>";
	
}




function init() {
	
	
	raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
	camera.position.set(0,0,100);
	camera.lookAt(0,0,0);
	ambientLight = new THREE.AmbientLight("#ffffff", 1);
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});
	plight = new THREE.PointLight( 0xff0000, 1, 0 );
	
	
	
	ambientLight.position.set(0, 20, 20);
	plight.position.set( 0, 0, 0 );
	
	scene.add( plight);
	scene.add(ambientLight);
			
	flyControls = new FlyControls(camera, renderer.domElement);
	
	flyControls.dragToLook = true;
	flyControls.movementSpeed = 0.01;
	//flyControls.rollSpeed = Math.PI / 24;
	flyControls.autoForward = false;

	flyControls.addEventListener('change', (evnt) => {
			
	});
	// supress up and down
const supressKeys = (evnt) => {
    if(evnt.key === 'ArrowUp' || evnt.key === 'ArrowDown'){
        evnt.preventDefault();
    }
};
window.addEventListener('keyup', supressKeys);
window.addEventListener('keydown', supressKeys);
	// controls = new OrbitControls( camera, renderer.domElement);
	// controls.mouseButtons = {
	// 	LEFT: THREE.MOUSE.ROTATE,
	// 	MIDDLE: THREE.MOUSE.DOLLY,
	// 	RIGHT: THREE.MOUSE.PAN
	// }
	// controls.update();

	const buttons = new Buttons();
	buttons.addPlanetButtons();


	document.getElementById('toggleRotation').addEventListener('click', function() {
		enableRotation = !enableRotation;
	})



	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild( renderer.domElement );
	stats = new Stats();
	//container.appendChild( stats.dom );
	window.addEventListener( 'click', onPointerMove );

}


// Adding Planets

const sun = new THREE.Group().add(new Star(25,0,'src/assets/Sun/sun.jpeg').getStar());
const mercury = new THREE.Group().add(new Planet(0.30,89,'src/assets/Mercury/mercury.jpg').getPlanet());
const venus = new THREE.Group().add(new Planet(0.42,97,'src/assets/Venus/venus.jpg').getPlanet());
const earth = new THREE.Group().add(new Planet(0.45,141,'src/assets/Earth/earth.jpg').getPlanet());
const mars = new THREE.Group().add(new Planet(0.25,181,'src/assets/Mars/mars.jpg').getPlanet());
const jupiter = new THREE.Group().add(new Planet(3,220,'src/assets/jupiter/jupiter.jpg').getPlanet());
const saturn = new THREE.Group().add(new Planet(1,250,'src/assets/saturn/saturn.jpg').getPlanet());
const uranus = new THREE.Group().add(new Planet(0.75,300,'src/assets/uranus/uranus.jpg').getPlanet());
const neptune = new THREE.Group().add(new Planet(0.100,350,'src/assets/neptune/neptune.jpg').getPlanet());
const pluto = new THREE.Group().add(new Planet(0.60,250,'src/assets/Pluto/pluto.jpg').getPlanet());


scene.add(sun);
scene.add(mercury);
scene.add(venus);
scene.add(earth);
scene.add(mars);
scene.add(jupiter);
scene.add(saturn);
scene.add(uranus);
scene.add(neptune);
scene.add(pluto);


var planetbuttons = document.getElementsByClassName('planetbuttons');
	
//let id = document.getElementsByTagName("a")[0].id;
	for (var i = 0; i < planetbuttons.length; i++) {
		let id =document.getElementsByClassName('planetbuttons')[i].id;
		planetbuttons.item(i).addEventListener('click', function(i) {
			console.log(id);
			showPlanetData(parseInt(id-1));
			enableRotation = false;
			camera.lookAt(earth.getWorldPosition);
		});
	}



const EARTH_YEAR = 2 * Math.PI * (1/60) * (1/60);

function animate() {

	if(enableRotation == true) {
		sun.rotation.y += 0.001;
		mercury.rotation.y += EARTH_YEAR * 4;
		venus.rotation.y += EARTH_YEAR * 2;
		earth.rotation.y += EARTH_YEAR;
		mars.rotation.y += EARTH_YEAR  * 0.5;
		jupiter.rotation.y+= EARTH_YEAR * 0.083;
		saturn.rotation.y+= EARTH_YEAR * 0.034;
		uranus.rotation.y+= EARTH_YEAR * 0.011;
		neptune.rotation.y+= EARTH_YEAR * 0.006;
		pluto.rotation.y+= EARTH_YEAR * 0.004;
	}
	const now = new Date();
	var secs = (now - lt) / 1000;
	flyControls.update(secs);
	requestAnimationFrame( animate );		
	renderer.render( scene, camera );
	
}





function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

let lt = new Date();
animate();




