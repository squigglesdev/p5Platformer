let world;
let deltaTime;
let oldDeltaTime;
let cameraX;
let cameraY;
let frame;


let PLAYERSPRITE;
let animationFrame = 1;
let idle1;
let idle2;
let walk1;
let walk2;
let walk3;
let walk4;
let jump;
let oldJump;
let fall;
let oldFall;
let wallFall;
let wallJump;

let enemyIdle1;
let enemyIdle2;
let enemyWalk1;
let enemyWalk2;
let enemyWalk3;
let enemyWalk4;
let enemyJump;
let enemyOldJump;
let enemyFall;
let enemyOldFall;
let enemyWallFall;
let enemyWallJump;

let bg;
let bgWidth;
let bgHeight;

let bgm;

function preload() {
	idle1 = loadImage("assets/idle1.png");
	idle2 = loadImage("assets/idle2.png");
	walk1 = loadImage("assets/walk1.png");
	walk2 = loadImage("assets/walk2.png");
	walk3 = loadImage("assets/walk3.png");
	walk4 = loadImage("assets/walk4.png");
	jump = loadImage("assets/jump.png");
	oldJump = loadImage("assets/jump.png");
	wallJump = loadImage("assets/wallJump.png");
	fall = loadImage("assets/fall.png");

	enemyIdle1 = loadImage("assets/idle1.png");
	enemyIdle2 = loadImage("assets/idle2.png");
	enemyWalk1 = loadImage("assets/walk1.png");
	enemyWalk2 = loadImage("assets/walk2.png");
	enemyWalk3 = loadImage("assets/walk3.png");
	enemyWalk4 = loadImage("assets/walk4.png");
	enemyJump = loadImage("assets/jump.png");
	enemyOldJump = loadImage("assets/jump.png");
	enemyWallJump = loadImage("assets/wallJump.png");
	enemyFall = loadImage("assets/fall.png");

	oldFall = loadImage("assets/fall.png");
	wallFall = loadImage("assets/wallFall.png");

	enemyOldFall = loadImage("assets/fall.png");
	enemyWallFall = loadImage("assets/wallFall.png");

	bg = loadImage("assets/bg.png", function(img) {
        bgWidth = img.width;
        bgHeight = img.height;
    });

	bgm = loadSound("assets/bgm.mp3");
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	window.onresize = () => windowResized();

	// Create a new world
	world = new World("World", 9.8, 20);

	// Create a new entity
	playerEntity = new PlayerEntity(world, 0, "Player", createVector(width/2, 0.1), createVector(0, 0), 10, 10, 150, 150, 100, 5000);

	chaserEnemy = new EnemyEntity(world, 1, "Chaser", createVector((width/2) + 500, 0.1), createVector(0, 0), 10, 10, 150, 150, 100, 5000, [createVector(100, 0), createVector(width - 100, 0)]);
	chaserEnemy.setGoalOrder([
		chaserEnemy.goals.attack,
		chaserEnemy.goals.chase,
		chaserEnemy.goals.patrol
	]);

	chaserEnemy2 = new EnemyEntity(world, 2, "Chaser", createVector((width/2) - 500, 0.1), createVector(0, 0), 10, 10, 150, 150, 100, 5000, [createVector(width - 100, 0), createVector(100, 0)]);
	chaserEnemy2.setGoalOrder([
		chaserEnemy2.goals.attack,
		chaserEnemy2.goals.chase,
		chaserEnemy2.goals.patrol
	]);

	// Add the entity to the world
	world.addEntity(chaserEnemy);
	world.addEntity(chaserEnemy2);
	world.addEntity(playerEntity);

	// Create a new platform
	testPlatform = new Platform(world, 0, createVector(width/2, height/2), width, 50, color(255, 0, 255), false);
	testPlatform2 = new Platform(world, 1, createVector(width + 250, height/2), 50, height, color(255, 0, 255), false);
	testPlatform3 = new Platform(world, 0, createVector(width + 550, height/3), 200, 50, color(255, 0, 255), false);
	testPlatform4 = new Platform(world, 0, createVector(width + 1000, height/3 * 2), 200, 50, color(255, 0, 255), false);
	testPlatform5 = new Platform(world, 0, createVector(width + 1500, height/2), 200, 50, color(255, 0, 255), false);

	// Add the platform to the world
	world.addPlatform(testPlatform);
	world.addPlatform(testPlatform2);
	world.addPlatform(testPlatform3);
	world.addPlatform(testPlatform4);
	world.addPlatform(testPlatform5);

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

	bgm.loop();
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {

	let targetCameraX = playerEntity.position.x - width / 2;
	let targetCameraY = playerEntity.position.y - height / 2;
	cameraX = lerp(cameraX, targetCameraX, deltaTime * 10);
	cameraY = lerp(cameraY, targetCameraY, deltaTime * 10);

	background(0);	
	for (let x = -bgWidth; x < width * 2; x += bgWidth) {
        for (let y = -bgHeight; y < height; y += bgHeight) {
            image(bg, x - cameraX * 0.5, y - cameraY * 0.5, bgWidth, bgHeight);
        }
    }

	strokeWeight(2);
	stroke(31)

	translate(-cameraX, -cameraY);
	world.draw();
	translate(cameraX, cameraY);

	push();
	fill(100, 100, 100, 175);
	rect(50, 50, 200, 25);
	fill(255, 0, 0);
	rect(50, 50, world.getPlayer().health * 20, 25);
	pop();

	deltaTime = (millis() - oldDeltaTime) / 1000;
	oldDeltaTime = millis()
	world.tick();
	frame++;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
