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

    getPlatforms() {
        return this.platforms;
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

    draw() {
        for (let i = 0; i < this.platforms.length; i++) {
            this.platforms[i].draw();
        }
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw();
        }
    }

    tick() {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].tick();
        }
        sleep(1/this.tickRate);
    }
}