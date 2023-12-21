class World {
    constructor(name, gravity, tickRate) {
        this.name = name;
        this.gravity = gravity;
        this.tickRate = tickRate;
        this.entities = [];
        this.platforms = [];
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

    addPlatform(platform) {
        this.platforms.push(platform);
    }

    draw() {
        background(30, 100, 0);
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw();
        }
        for (let i = 0; i < this.platforms.length; i++) {
            this.platforms[i].draw();
        }
    }

    tick() {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].tick();
        }
        sleep(1/this.tickRate);
    }
}