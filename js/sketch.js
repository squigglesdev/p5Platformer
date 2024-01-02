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

	enemyIdle1 = loadImage("assets/enemyWalk1.png");
	enemyIdle2 = loadImage("assets/enemyWalk1.png");
	enemyWalk1 = loadImage("assets/enemyWalk1.png");
	enemyWalk2 = loadImage("assets/enemyWalk1.png");
	enemyWalk3 = loadImage("assets/enemyWalk2.png");
	enemyWalk4 = loadImage("assets/enemyWalk2.png");
	enemyJump = loadImage("assets/enemyWalk1.png");
	enemyOldJump = loadImage("assets/enemyWalk1.png");
	enemyWallJump = loadImage("assets/enemyWalk1.png");
	enemyFall = loadImage("assets/enemyWalk1.png");

	oldFall = loadImage("assets/fall.png");
	wallFall = loadImage("assets/wallFall.png");

	enemyOldFall = loadImage("assets/enemyWalk1.png");
	enemyWallFall = loadImage("assets/enemyWalk1.png");

	bg = loadImage("assets/bg.webp", function(img) {
        bgWidth = img.width;
        bgHeight = img.height;
    });

}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	window.onresize = () => windowResized();

	// Create a new world
	world = new World("World", 9.8, 20);

	// Create a new entity
	playerEntity = new PlayerEntity(world, 0, "Player", createVector(1000, -1000), createVector(0, 0), 10, 10, 150, 150, 100, 5000);

	/*chaserEnemy = new EnemyEntity(world, 1, "Chaser", createVector((width/2) + 500, 0.1), createVector(0, 0), 10, 10, 150, 150, 100, 5000, [createVector(100, 0), createVector(width - 100, 0)]);
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
	]);*/

	// Add the entity to the world
	//world.addEntity(chaserEnemy);
	//world.addEntity(chaserEnemy2);
	

	// Create a new platform
	platform = new Platform(world, 0, createVector(1000, 1000), 1500, 50, color(255, 0, 255), false);
	platform2 = new Platform(world, 1, createVector(2050, 1000), 200, 50, color(255, 0, 255), false);
	platform3 = new Platform(world, 0, createVector(2600, 750), 200, 50, color(255, 0, 255), false);
	platform4 = new Platform(world, 0, createVector(3000, 1000), 50, 1750, color(255, 0, 255), false);
	platform5 = new Platform(world, 0, createVector(3400, 250), 200, 50, color(255, 0, 255), false);
	platform6 = new Platform(world, 0, createVector(4050, 1000), 1500, 50, color(255, 0, 255), false);
	dummyEntity = new EnemyEntity(world, 1, "Dummy", createVector(4425, 1075), createVector(0, 0), 10, 2, 150, 150, 100, 5000, [createVector(4050, 1075)]);
	dummyEntity.setGoalOrder([
		dummyEntity.goals.dummyGoal
	]);
	platform7 = new Platform(world, 0, createVector(5100, 1000), 200, 50, color(255, 0, 255), false);
	platform8 = new Platform(world, 0, createVector(5500, 1000), 200, 50, color(255, 0, 255), false);
	platform9 = new Platform(world, 0, createVector(6550, 1000), 1500, 50, color(255, 0, 255), false);
	weakEnemy = new EnemyEntity(world, 2, "Weak", createVector(6550, 500), createVector(0, 0), 10, 4, 150, 150, 100, 5000, [createVector(6550, 1075), createVector(7200, 1075)]);
	weakEnemy.sightRange = 250;
	weakEnemy.setGoalOrder([
		weakEnemy.goals.attack,
		weakEnemy.goals.chase,
		weakEnemy.goals.patrol
	]);
	platform10 = new Platform(world, 0, createVector(7600, 1000), 50, 1750, color(255, 0, 255), false);


	// Add the platform to the world
	world.addPlatform(platform);
	world.addPlatform(platform2);
	world.addPlatform(platform3);
	world.addPlatform(platform4);
	world.addPlatform(platform5);
	world.addPlatform(platform6);
	world.addEntity(dummyEntity);
	world.addPlatform(platform7);
	world.addPlatform(platform8);
	world.addPlatform(platform9);
	world.addEntity(weakEnemy);
	world.addPlatform(platform10);


	world.addEntity(playerEntity);

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

function draw() {
	

	world.draw();

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
