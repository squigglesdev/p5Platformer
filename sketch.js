function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

	// Create a new world
    world = new World("Test", 9.8, 20);
    console.log(world.toString());

	// Create a new entity
    testEntity = new Entity(world, 0, "Test", createVector(width/2, 0.1), 1, 100);
	console.log(testEntity.toString());

	// Add the entity to the world
    world.addEntity(testEntity);
}

function windowResized() {
  	resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
	background(30, 100, 0);
	world.tick();
}

const sleep = ms => new Promise(r => setTimeout(r, ms));