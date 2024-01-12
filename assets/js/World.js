class World {
    constructor(name, gravity, tickRate) {
        this.name = name;
        this.gravity = gravity;
        this.tickRate = tickRate;
        this.entities = [];
        this.platforms = [];
        this.camera = new Camera();
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }

    getTickRate() {
        return this.tickRate;
    }

    getEntities() {
        return this.entities;
    }

    getPlatforms() {
        return this.platforms;
    }

    getCamera() {
        return this.camera;
    }

    setName(name) {
        this.name = name;
    }

    setGravity(gravity) {
        this.gravity = gravity;
    }

    setTickRate(tickRate) {
        this.tickRate = tickRate;
    }

    toString() {
        return this.name + " " + this.gravity + " " + this.tickRate;
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    getPlayer() {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i] instanceof PlayerEntity) {
                return this.entities[i];
            }
        }
    }

    removeEntity(entity) {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i] == entity) {
                this.entities.splice(i, 1);
            }
        }
    }

    addPlatform(platform) {
        this.platforms.push(platform);
    }

    removePlatform(platform) {
        for (let i = 0; i < this.platforms.length; i++) {
            if (this.platforms[i] == platform) {
                this.platforms.splice(i, 1);
            }
        }
    }

    drawLava() {
        push();
        fill("#fc8803");
        rect(-10000, 1000, 20000, 10000);
        pop();
    }

    drawBackground() {
        background(0);	
        for (let x = -bgWidth; x < width * 8; x += bgWidth - 1) {
            for (let y = -bgHeight; y < height; y += bgHeight - 1) {
                image(bg, x - this.camera.x * 0.5, y - this.camera.y * 0.5, bgWidth, bgHeight);
            }
        }
        strokeWeight(2);
        stroke(31);
    }

    draw() {
        this.drawBackground();
        this.camera.startFollow(this.getPlayer().getPosition());
        
        for (let i = 0; i < this.platforms.length; i++) {
            this.platforms[i].draw();
        }

        push();
        textAlign(CENTER, BOTTOM);
	    textSize(20);
        strokeWeight(4);
        fill(255);
        text("Ah, the abyss welcomes you!\nRevel in the thrill of using the groundbreaking A and D keys\nfor a riveting horizontal journey.", 1000, 800);
        text("Behold the majestic space and W keys—\ngatekeepers to the world of vertical enlightenment.\nPress them to ascend to new heights.", 1850, 800);
        text("Double-jump, because clearly, one jump is for\nbeginners. Show off your gravity-defying skills!", 2300, 800);
        text("Walls aren't just for holding up ceilings.\nGrab them, jump off them, become the\nparkour prodigy you were always meant to be.", 2800, 550);
        text("Congratulations, you navigated a straight line.\nI'm sure Nobel Prize committees are taking note.", 3000, -50);
        text("Meet our resident dummy –\na real Shakespearean tragedy in the making.\nLeft click to end its miserable existence, if you fancy.", 4050, 800);
        text("Oh, and you probably shouldn't fall in the lava. It's hot.", 5300, 800);
        text("Meet your new best friend –\nalive, kicking, and ready to spice up your life.\nBut beware, it's got a knack for the whole 'murdering you' thing.\nProceed with caution, or not. Your call.", 6550, 800)
        pop();

        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw();
        }
        this.drawLava();
        this.camera.endFollow();
    }

    tick() {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].tick();
        }
        sleep(1/this.tickRate);
    }
}