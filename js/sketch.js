let world;
let deltaTime;
let oldDeltaTime;
let cameraX;
let cameraY;
let frame;


let PLAYERSPRITE;
let playerImgToggle = true;
let idle1;
let idle2;
let walk1;
let walk2;
let jump;
let fall;

function preload() {
	idle1 = loadImage("assets/idle1.png");
	idle2 = loadImage("assets/idle2.png");
	walk1 = loadImage("assets/idle1.png");
	walk2 = loadImage("assets/idle2.png");
	jump = loadImage("assets/jump.png");
	fall = loadImage("assets/fall.png");
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	window.onresize = () => windowResized();

	// Create a new world
	world = new World("World", 9.8, 20);
	console.log(world.toString());

	// Create a new entity
	playerEntity = new PlayerEntity(world, 0, "Player", createVector(width/2, 0.1), createVector(0, 0), 10, 10, 150, 150, 100, 5000);

	chaserEnemy = new EnemyEntity(world, 1, "Chaser", createVector((width/2) + 50, 0.1), createVector(0, 0), 10, 10, 50, 50, 100, 5000, [createVector(100, 0), createVector(width - 100, 0)]);
	chaserEnemy.setGoalOrder([
		chaserEnemy.goals.attack,
		chaserEnemy.goals.chase,
		chaserEnemy.goals.patrol
	]);


	// Add the entity to the world
	world.addEntity(chaserEnemy);
	world.addEntity(playerEntity);

	// Create a new platform
	testPlatform = new Platform(world, 0, createVector(width/2, height/2), width, 50, color(255, 0, 255), false);

	// Add the platform to the world
	world.addPlatform(testPlatform);

	// Begin the tick loop
	world.tick();

	// Set the framerate
	frameRate(165);

	// Delta time
	frame = 0;
	deltaTime = 0;
	oldDeltaTime = 0;

	// Camera
	cameraX = playerEntity.position.x - width / 2;
	cameraY = playerEntity.position.y - height / 2;
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight);
}

function animation() {
	if (frame % 165 == 0) {
		playerImgToggle = !playerImgToggle;
	}

	if (world.getPlayer().velocity.y > 0.1) {
		PLAYERSPRITE = fall;
		if (world.getPlayer().strafingLeft) {
			world.getPlayer().flipped = false;
		} else if (world.getPlayer().strafingRight) {
			world.getPlayer().flipped = true;
		}
	} else if (world.getPlayer().velocity.y < 0) {
		PLAYERSPRITE = jump;
		if (world.getPlayer().strafingLeft) {
			world.getPlayer().flipped = false;
		} else if (world.getPlayer().strafingRight) {
			world.getPlayer().flipped = true;
		}
	} else {

		if (world.getPlayer().velocity.x != 0 && world.getPlayer().velocity.y == 0 && playerImgToggle) {
			PLAYERSPRITE = walk1;
			if (world.getPlayer().strafingLeft) {
				world.getPlayer().flipped = false;
			} else if (world.getPlayer().strafingRight) {
				world.getPlayer().flipped = true;
			}
		} else if (world.getPlayer().velocity.x != 0 && world.getPlayer().velocity.y == 0 && !playerImgToggle) {
			PLAYERSPRITE = walk2;
			if (world.getPlayer().strafingLeft) {
				world.getPlayer().flipped = false;
			} else if (world.getPlayer().strafingRight) {
				world.getPlayer().flipped = true;
			}
		} else {
			if (playerImgToggle) {
				PLAYERSPRITE = idle1;
			} else {
				PLAYERSPRITE = idle2;
			}
		}
	}
	
}

function draw() {
	animation();

	let targetCameraX = playerEntity.position.x - width / 2;
	let targetCameraY = playerEntity.position.y - height / 2;
	cameraX = lerp(cameraX, targetCameraX, deltaTime * 10);
	cameraY = lerp(cameraY, targetCameraY, deltaTime * 10);


	translate(-cameraX, -cameraY);
	world.draw();
	translate(cameraX, cameraY);

	deltaTime = (millis() - oldDeltaTime) / 1000;
	oldDeltaTime = millis()
	world.tick();
	frame++;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
