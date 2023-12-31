let world;
let deltaTime;
let oldDeltaTime;
let cameraX;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	window.onresize = () => windowResized();

	// Create a new world
	world = new World("Test", 9.8, 20);
	console.log(world.toString());

	// Create a new entity
	testEntity = new PlayerEntity(world, 0, "Test", createVector(width/2, 0.1), createVector(0, 0), 10, 10, 100, 5000);
	console.log(testEntity.toString());

	// Add the entity to the world
	world.addEntity(testEntity);

	// Create a new platform
	testPlatform = new Platform(world, 0, createVector(width/2, height/2), 200, 50, color(255, 0, 255), false);
	testPlatform2 = new Platform(world, 1, createVector(width/2 + 200, height/2), 50, 600, color(0, 0, 255), false);

	// Add the platform to the world
	world.addPlatform(testPlatform);
	world.addPlatform(testPlatform2);

	// Begin the tick loop
	world.tick();

	// Set the framerate
	frameRate(165);

	// Delta time
	deltaTime = 0;
	oldDeltaTime = 0;

	// Camera
	cameraX = testEntity.position.x - width / 2;
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
	let targetCameraX = testEntity.position.x - width / 2;
	cameraX = lerp(cameraX, targetCameraX, deltaTime * 10);

	translate(-cameraX, 0);
	world.draw();
	translate(cameraX, 0);

	deltaTime = (millis() - oldDeltaTime) / 1000;
	oldDeltaTime = millis()
	world.tick();
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
