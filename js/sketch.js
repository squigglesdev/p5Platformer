let world;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	window.onresize = () => windowResized();

	// Create a new world
	world = new World("Test", 9.8, 20);
	console.log(world.toString());

	// Create a new entity
	testEntity = new PlayerEntity(world, 0, "Test", createVector(width/2, 0.1), createVector(0, 0), 10, 100, 100, 1000, 100);
	console.log(testEntity.toString());

	// Add the entity to the world
	world.addEntity(testEntity);

	// Create a new platform
	testPlatform = new Platform(world, 0, createVector(width/2, height/2), 200, 50, color(255, 0, 255), false);
	console.log(testPlatform.toString());

	// Add the platform to the world
	world.addPlatform(testPlatform);
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
	world.draw();
	world.tick();
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
