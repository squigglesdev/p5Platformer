class Entity {
    constructor (world, id, name, position, velocity, mass, maxHealth, strafingForce, jumpingForce) {
        this.world = world;
        this.id = id;
        this.name = name;
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.strafingForce = strafingForce;
        this.jumpingForce = jumpingForce;
        this.strafingLeft = false;
        this.strafingRight = false;
        this.jumping = false;
        this.jumps = 2;
        this.crouching = false;
        this.grounded = false;
        this.hittingHead = false;
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

    isGrounded() {
        return this.grounded;
    }

    toString() {
        return this.id + " " + this.name + " " + this.position + " " + this.mass + " " + this.maxHealth + " " + this.health;
    }

    getBounds() {
        return {
            top: this.position.y - 25,
            left: this.position.x - 25,
            bottom: this.position.y + 25,
            right: this.position.x + 25
        };
    }

    handleMovement(platforms, gravity) {

        if (isNaN(this.velocity.y) || isNaN(this.velocity.x) || isNaN(deltaTime) || isNaN(this.strafingForce) || isNaN(this.jumpingForce) || isNaN(gravity)) {
            return;
        }

        this.velocity.y = min(100, this.velocity.y + gravity * deltaTime);
        this.airTimer ++;

        if (this.strafingLeft || this.strafingRight || this.jumping) {
            if (this.strafingLeft) {
                this.velocity.x = max(-2, this.velocity.x - this.strafingForce * deltaTime);
            }
            if (this.strafingRight) {
                this.velocity.x = min(2, this.velocity.x + this.strafingForce * deltaTime);
            }
            if (this.jumping && this.jumps > 0) {
                this.jumping = false;   
                this.velocity.y = -5;
                this.jumps--;
                console.log(this.jumps);
            }
        } else {
            this.velocity.x = this.velocity.x * 0.95;
        }


        this.position.x += this.velocity.x;

        platforms.forEach(platform => {
            const platformBounds = platform.getBounds();
            if (this.collides(this.getBounds(), platformBounds)) {
                if (this.velocity.x > 0) {
                    this.position.x = platformBounds.left - 25.1;
                } if (this.velocity.x < 0) {
                    this.position.x = platformBounds.right + 25.1;
                }
            }
        });


        this.position.y += this.velocity.y;

        platforms.forEach(platform => {
            const platformBounds = platform.getBounds();
            if (this.collides(this.getBounds(), platformBounds)) {
                if (this.velocity.y > 0) {
                    this.position.y = platformBounds.top - 25.1;
                    this.velocity.y = 0;
                    this.jumps = 2;
                    this.airTimer = 0;
                } if (this.velocity.y < 0) {
                    this.position.y = platformBounds.bottom + 25.1;
                    this.velocity.y = 0;
                }
            }
        });
    }

    collides(bounds1, bounds2) {
        return bounds1.right >= bounds2.left && bounds1.left <= bounds2.right && bounds1.bottom >= bounds2.top && bounds1.top <= bounds2.bottom;
    }

    draw() {
        push();
        rectMode(CENTER);
        rect(this.position.x, this.position.y, 50, 50);
        pop();
    }

    tick() {
        this.handleMovement(this.world.getPlatforms(), this.world.getGravity());
    }
}