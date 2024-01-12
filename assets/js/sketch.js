let world;
let deltaTime;
let oldDeltaTime;
let cameraX;
let cameraY;
let time;


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
	idle1 = loadImage("assets/img/idle1.png");
	oldIdle1 = loadImage("assets/img/idle1.png");
	idle2 = loadImage("assets/img/idle2.png");
	oldIdle2 = loadImage("assets/img/idle2.png");
	walk1 = loadImage("assets/img/walk1.png");
	oldWalk1 = loadImage("assets/img/walk1.png");
	walk2 = loadImage("assets/img/walk2.png");
	oldWalk2 = loadImage("assets/img/walk2.png");
	walk3 = loadImage("assets/img/walk3.png");
	oldWalk3 = loadImage("assets/img/walk3.png");
	walk4 = loadImage("assets/img/walk4.png");
	oldWalk4 = loadImage("assets/img/walk4.png");
	jump = loadImage("assets/img/jump.png");
	oldJump = loadImage("assets/img/jump.png");
	oldOldJump = loadImage("assets/img/jump.png");
	wallJump = loadImage("assets/img/wallJump.png");
	fall = loadImage("assets/img/fall.png");

	gunIdle1 = loadImage("assets/img/gunIdle1.png");
	gunIdle2 = loadImage("assets/img/gunIdle2.png");
	gunWalk1 = loadImage("assets/img/gunWalk1.png");
	gunWalk2 = loadImage("assets/img/gunWalk2.png");
	gunWalk3 = loadImage("assets/img/gunWalk3.png");
	gunWalk4 = loadImage("assets/img/gunWalk4.png");
	gunJump = loadImage("assets/img/gunJump.png");
	gunOldJump = loadImage("assets/img/gunJump.png");
	gunFall = loadImage("assets/img/gunFall.png");


	enemyIdle1 = loadImage("assets/img/enemyWalk1.png");
	enemyIdle2 = loadImage("assets/img/enemyWalk1.png");
	enemyWalk1 = loadImage("assets/img/enemyWalk1.png");
	enemyWalk2 = loadImage("assets/img/enemyWalk1.png");
	enemyWalk3 = loadImage("assets/img/enemyWalk2.png");
	enemyWalk4 = loadImage("assets/img/enemyWalk2.png");
	enemyJump = loadImage("assets/img/enemyWalk1.png");
	enemyOldJump = loadImage("assets/img/enemyWalk1.png");
	enemyWallJump = loadImage("assets/img/enemyWalk1.png");
	enemyFall = loadImage("assets/img/enemyWalk1.png");

	oldFall = loadImage("assets/img/fall.png");
	wallFall = loadImage("assets/img/wallFall.png");

	enemyOldFall = loadImage("assets/img/enemyWalk1.png");
	enemyWallFall = loadImage("assets/img/enemyWalk1.png");

	bg = loadImage("assets/img/bg.png", function(img) {
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
	dummyEntity = new EnemyEntity(world, 1, "Dummy", createVector(4425, 1075), createVector(0, 0), 10, 4, 150, 150, 100, 5000, [createVector(4050, 1075)]);
	dummyEntity.setGoalOrder([
		dummyEntity.goals.dummyGoal
	]);
	platform7 = new Platform(world, 0, createVector(5100, 1000), 200, 50, color(255, 0, 255), false);
	platform8 = new Platform(world, 0, createVector(5500, 1000), 200, 50, color(255, 0, 255), false);
	platform9 = new Platform(world, 0, createVector(6550, 1000), 1500, 50, color(255, 0, 255), false);
	weakEnemy = new EnemyEntity(world, 2, "Weak", createVector(6550, 500), createVector(0, 0), 10, 4, 150, 150, 100, 5000, [createVector(6550, 1075), createVector(7200, 1075)]);
	weakEnemy.sightRange = 350;
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
	time = 0;
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
	time += deltaTime;

	
	
	
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
