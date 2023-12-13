class Entity {
    constructor (world, id, name, position, velocity, mass, maxHealth) {
        this.world = world;
        this.id = id;
        this.name = name;
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPosition() {
        return this.position;
    }

    getMass() {
        return this.mass;
    }

    getMaxHealth() {
        return this.maxHealth;
    }

    getHealth() {
        return this.health;
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setPosition(position) {
        this.position = position;
    }

    setMass(mass) {
        this.mass = mass;
    }

    setMaxHealth(maxHealth) {
        this.maxHealth = maxHealth;
    }

    setHealth(health) {
        this.health = health;
    }

    toString() {
        return this.id + " " + this.name + " " + this.position + " " + this.mass + " " + this.maxHealth + " " + this.health;
    }

    handleGravity(gravity, t) {
        let force = this.mass * gravity;
        this.position.y += t * (this.velocity.y + t * force / 2);
        this.velocity.y += force * t;
    }

    handleCollision(entities) {
        if (this.position.y + 25 > height) {
            this.position.y = height - 25;
        }
    }

    draw() {
        circle(this.position.x, this.position.y, 50);
    }

    tick() {
        this.handleCollision(this.world.getEntities());
        this.handleGravity(this.world.getGravity(), 1/this.world.getTickRate());
        this.handleCollision(this.world.getEntities());
        this.draw();
    }
}