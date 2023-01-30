

import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { FlyControls } from './node_modules/three/examples/jsm/controls/FlyControls.js';
import { FontLoader } from './node_modules/three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from './node_modules/three/examples/jsm/geometries/TextGeometry.js';


//import { ObjectLoader } from './node_modules/three/examples/jsm/loaders/ObjectLoader.js';
import Stats from './node_modules/three/examples/jsm/libs/stats.module.js';
import Planet  from './src/classes/planet.js';
import Star  from './src/classes/star.js';
import Buttons from './src/classes/buttons.js';

let flyControls, loader, enableRotation=false, stats, INTERSECTED, radius, theta =0, raycaster, pointer, scene, camera, ambientLight, controls, renderer, plight, container = document.getElementById("canvas");;

const response = await fetch('./src/data.json');
const data = await response.json();
let camera_x = -50;
let camera_y = 45;
let camera_z = 180;

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
	camera.position.set(camera_x,camera_y,camera_z);
	camera.lookAt(0,0,0);
	ambientLight = new THREE.AmbientLight("#ffffff", 1);
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});
	plight = new THREE.PointLight( 0xff0000, 1, 0 );
	
	
	/*const bgloader = new THREE.TextureLoader();
	bgloader.load('./src/assets/space-background/space.jpeg' , function(texture)
	{
		scene.background = texture;   
	});
	*/
	
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
	
	
	document.getElementById('control_button_roation').addEventListener('click', function() {
		enableRotation = !enableRotation;
	})
	
	document.getElementById('control_button_F').addEventListener('click', function() {
		moveForward();
	})
	document.getElementById('control_button_B').addEventListener('click', function() {
		moveBackwards();
	})
	document.getElementById('control_button_L').addEventListener('click', function() {
		moveLeft();
	})
	document.getElementById('control_button_R').addEventListener('click', function() {
		moveRight();
	})
	
	document.getElementById('control_button_U').addEventListener('click', function() {
		moveUp();
	})
	
	document.getElementById('control_button_D').addEventListener('click', function() {
		moveDown();
	})
	
	document.getElementById('control_button_rotate_right').addEventListener('click', function() {
		rotateRight();
	})
	
	
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild( renderer.domElement );
	stats = new Stats();
	//container.appendChild( stats.dom );
	
	
}

const text_loader = new FontLoader();
let text_geometry;
text_loader.load( './node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
	
	text_geometry = new TextGeometry( 'Earth (3)', {
		font: font,
		size: 30,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );
} );

// Adding Planets

const sun = new THREE.Group().add(new Star(35,0,'src/assets/Sun/sun.jpeg').getStar());

const mercury = new Planet(0.350,70,'src/assets/Mercury/mercury.jpg');
const mercury_group = new THREE.Group().add(mercury.getPlanet());

const venus = new Planet(0.42,97,'src/assets/Venus/venus.jpg');
const venus_group = new THREE.Group().add(venus.getPlanet());

const earth = new Planet(0.45,141,'src/assets/Earth/earth.jpg');
const earth_group = new THREE.Group().add(earth.getPlanet());

const mars = new Planet(0.25,160,'src/assets/Mars/mars.jpg');
const mars_group = new THREE.Group().add(mars.getPlanet());



const jupiter = new Planet(3,220,'src/assets/jupiter/jupiter.jpg');
const jupiter_group = new THREE.Group().add(jupiter.getPlanet());

const saturn = new Planet(2,250,'src/assets/saturn/saturn.jpg');
const saturn_group = new THREE.Group().add(saturn.getPlanet());

const rgeometry = new THREE.RingGeometry( 2.8, 4, 50, 1, 5, Math.PI * 2 );
rgeometry.rotateX(1);
const staurn_ring_texture =  new THREE.TextureLoader().load('src/assets/Saturn/saturn_rings.jpg')
const material = new THREE.MeshBasicMaterial( { map: staurn_ring_texture} );
const rmesh = new THREE.Mesh( rgeometry, material );
rmesh.position.x = 250;
rmesh.position.y = 0;
rmesh.position.z = 0;
rmesh.frustumCulled = false;
saturn_group.add(rmesh);


const uranus = new Planet(1,300,'src/assets/uranus/uranus.jpg');
const uranus_group = new THREE.Group().add(uranus.getPlanet());

const neptune = new Planet(1.5,350,'src/assets/neptune/neptune.jpg');;
const neptune_group = new THREE.Group().add(neptune.getPlanet());

const pluto = new Planet(0.15,375,'src/assets/Pluto/pluto.jpg');
const pluto_group = new THREE.Group().add(pluto.getPlanet());



scene.add(sun);
scene.add(mercury_group);
scene.add(venus_group);
scene.add(earth_group);
scene.add(mars_group);
scene.add(jupiter_group);
scene.add(saturn_group);
scene.add(uranus_group);
scene.add(neptune_group);
scene.add(pluto_group);
scene.add(add_asteriod_belt());


let reposition_earth = 0;
var planetbuttons = document.getElementsByClassName('planetbuttons');

//let id = document.getElementsByTagName("a")[0].id;
for (var i = 0; i < planetbuttons.length; i++) {
	let id =document.getElementsByClassName('planetbuttons')[i].id;
	
	planetbuttons.item(i).addEventListener('click', function(i) {
		console.log(id);
		showPlanetData(parseInt(id-1));
		enableRotation = false;
		
		camera_y = 0;
		camera_z = 5;
		
		
		switch(parseInt(id)) {
			case 1:
			camera_x = 71;
			camera_y = 6;
			camera_z = 9;
			mercury_group.rotation.y = 0;
			break;
			case 2:
			camera_x = 97;
			venus_group.rotation.y = 0;
			break;
			case 3:		
			camera_x = 141;		
			camera_z = 3;
			earth_group.rotation.y = 0;			
			break
			case 4:
			camera_x = 160;
			mars_group.rotation.y = 0;
			break
			case 5:
			camera_x = 220;					
			jupiter_group.rotation.y = 0;
			break
			case 6:
			camera_x = 250;
			saturn_group.rotation.y = 0;
			break
			case 7:
			camera_x = 300;
			uranus_group.rotation.y = 0;
			break	
			case 8:
			camera_x = 350;
			neptune_group.rotation.y = 0;
			break
			case 9:
			camera_x = 375;
			pluto_group.rotation.y = 0;
			break		
			default:
			camera_x = 0;
			camera_y = -20;
			camera_z = 100;
			// code block
		}
		
		
		
		
		
		camera.position.set(camera_x,camera_y,camera_z);
		
		camera.lookAt(camera_x,0,0);
		
		
		
	});
}



const EARTH_YEAR = 2 * Math.PI * (1/60) * (1/60);

function animate() {
	
	if(enableRotation == true) {
		
		mercury_group.rotation.y += EARTH_YEAR * 4;
		venus_group.rotation.y += EARTH_YEAR * 2;
		earth_group.rotation.y += EARTH_YEAR;
		mars_group.rotation.y += EARTH_YEAR  * 0.5;
		jupiter_group.rotation.y+= EARTH_YEAR * 0.09;
		saturn_group.rotation.y+= EARTH_YEAR * 0.034;
		uranus_group.rotation.y+= EARTH_YEAR * 0.011;
		neptune_group.rotation.y+= EARTH_YEAR * 0.006;
		pluto_group.rotation.y+= EARTH_YEAR * 0.004;
		
	}
	sun.rotation.y -= 0.001;
	mercury.getPlanet().rotation.y += 0.08;
	venus.getPlanet().rotation.y += 0.05;
	earth.getPlanet().rotation.y += 0.005;
	mars.getPlanet().rotation.y += 0.005;
	jupiter.getPlanet().rotation.y += 0.003;
	saturn.getPlanet().rotation.y += 0.005;
	uranus.getPlanet().rotation.y += 0.005;
	neptune.getPlanet().rotation.y += 0.005;
	pluto.getPlanet().rotation.y += 0.009;
	
	
	
	const now = new Date();
	var secs = (now - lt) / 1000;
	flyControls.update(secs);
	requestAnimationFrame( animate );		
	renderer.render( scene, camera );
	console.log("Position:"+camera.position.x + " " +camera.position.y + " "+camera.position.z );
	
	
}

function moveForward() {
	camera_z = camera_z - 1;
	camera.position.set(camera_x,camera_y,camera_z);
	
	
}


function moveBackwards() {
	camera_z = camera_z + 1;
	camera.position.set(camera_x,camera_y,camera_z);
	
}


function moveLeft() {
	camera_x = camera_x - 1;
	camera.position.set(camera_x,camera_y,camera_z);
	
}


function moveRight() {
	camera_x = camera_x + 1;
	camera.position.set(camera_x,camera_y,camera_z);
	
}

function moveUp() {
	camera_y = camera_y + 1;
	camera.position.set(camera_x,camera_y,camera_z);
	
}

function moveDown() {
	camera_y = camera_y - 1;
	camera.position.set(camera_x,camera_y,camera_z);
	
}

function rotateRight() {
	camera.rotation.y = camera.rotation.y - 0.01;
}




function add_asteriod_belt() {
	//195 to 210
	
	const asteroids = new THREE.Group();
	let loader = null;
	let texture = null;
	let material = null;
	let circle = null;
	let mesh = null;
	const image_radius = 100;
	const number_of_images = 360;
	const radius = 190;
	const radian_interval = (2.0 * Math.PI) / number_of_images;
	const center_of_wheel = 0;
	
	for (let i = 0; i < 360; i++) {
		// Create a texture loader so we can load our image file
		console.log("adding asteroid");
		const asteroid = new THREE.SphereGeometry(0.2);
		const texture = new THREE.TextureLoader().load('/src/assets/AsteroidBelt/asteroid_belt.jpg');
		const material = new THREE.MeshBasicMaterial({map: texture});
		mesh = new THREE.Mesh(asteroid, material);
		var ast2 = new THREE.Mesh(asteroid, material);
		var ast3 = new THREE.Mesh(asteroid, material);
		var ast4 = 	new THREE.Mesh(asteroid, material);
		
		mesh.position.set(
			center_of_wheel + (Math.cos(radian_interval * i) * radius),            
			0,
			center_of_wheel + (Math.sin(radian_interval * i) * radius)
			);
			
		ast2.position.set(
				2 + (Math.cos(radian_interval * i) * radius),            
				2,
				center_of_wheel + (Math.sin(radian_interval * i) * radius)
				);
				
		ast3.position.set(
					-2 + (Math.cos(radian_interval * i) * radius),            
					4,
					center_of_wheel + (Math.sin(radian_interval * i) * radius)
					);
		ast4.position.set(
						center_of_wheel + (Math.cos(radian_interval * i) * radius),            
						-2,
						center_of_wheel + (Math.sin(radian_interval * i) * radius)
						);
						
						// add the image to the group
						console.log(mesh);
						asteroids.add(mesh);
						asteroids.add(ast2);
						asteroids.add(ast3);
						asteroids.add(ast4);
					}
					return asteroids;
				}
				
				
				let lt = new Date();
				animate();
				
				
				
				
				