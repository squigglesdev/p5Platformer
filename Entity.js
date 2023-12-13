class Entity {
    constructor (world, id, name, position, mass, maxHealth) {
        this.world = world;
        this.id = id;
        this.name = name;
        this.position = position;
        this.velocity = createVector(0, 10);
        this.previousVelocity = createVector(0, 0);
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
        let v = this.velocity.y;
        let u = this.previousVelocity.y;
        let acceleration = (v - u) / t;
        this.previousVelocity = this.velocity;
        
        let force = this.mass * acceleration * gravity;
        this.velocity.y = force * t;
        console.log(this.velocity.y);

        this.position.y += this.velocity.y;
    }

    handleCollision(entities) {
        if (this.position.y + 25 > height) {
            this.position.y = height - 25;
        }
    }

    draw() {
        console.log(this.position.x + " " + this.position.y);
        circle(this.position.x, this.position.y, 50);
    }

    tick() {
        this.handleCollision(this.world.getEntities());
        this.handleGravity(this.world.getGravity(), this.world.getTickRate());
        this.handleCollision(this.world.getEntities());
        this.draw();
    }
}