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