class Entity {
    constructor (world, id, name, position, velocity, mass, maxHealth, strafingForce, jumpingForce, crouchingForce) {
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
        this.crouchingForce = crouchingForce;
        this.strafingLeft = false;
        this.strafingRight = false;
        this.jumping = false;
        this.crouching = false;
        this.grounded = false;
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

    handleGravity(gravity, t) {
        if (!this.grounded) {
            let force = this.mass * gravity;
            this.position.y += t * (this.velocity.y + t * force / 2);
            this.velocity.y += force * t;
        }
    }

    handleMovement(t) {

        let totalForce = createVector(0, 0);

        if (this.strafingLeft) {
            totalForce.x -= this.strafingForce;
        }
        if (this.strafingRight) {
            totalForce.x += this.strafingForce;
        }
        if (this.jumping) {
            totalForce.y -= this.jumpingForce;
            this.grounded = false;
        }
        if (this.crouching) {
            totalForce.y += this.crouchingForce;
        }

        this.position.x += t * (this.velocity.x + t * totalForce.x / 2);
        console.log(this.strafingForce);
        this.position.y += t * (this.velocity.y + t * totalForce.y / 2);

        this.velocity.x = this.velocity.x * 0.98 + totalForce.x * t;
        this.velocity.y += totalForce.y * t;
    }

    handleCollision(entities) {
        let radius = 25;

        if (this.position.y + 25 > height) {
            this.position.y = height - 25;
            this.grounded = true;
        }

        for (let i = 0; i < this.world.platforms.length; i++) {
            let top = this.world.platforms[i].getBounds().top;
            let withinTop = this.position.y + radius > top;
            if (withinTop) {
                push();
                stroke(255, 0, 0);
                line(0, top, width, top)
                pop();
            }
            else {
                line(0, top, width, top)
            }
            let left = this.world.platforms[i].getBounds().left;
            let withinLeft = this.position.x + radius > left;
            if (withinLeft) {
                push();
                stroke(255, 0, 0);
                line(left, 0, left, height)
                pop();
            }
            else {
                line(left, 0, left, height)
            }
            let bottom = this.world.platforms[i].getBounds().bottom;
            let withinBottom = this.position.y - radius < bottom;
            if (withinBottom) {
                push();
                stroke(255, 0, 0);
                line(0, bottom, width, bottom)
                pop();
            }
            else {
                line(0, bottom, width, bottom)
            }
            let right = this.world.platforms[i].getBounds().right;
            let withinRight = this.position.x - radius < right;
            if (withinRight) {
                push();
                stroke(255, 0, 0);
                line(right, 0, right, height)
                pop();
            }
            else {
                line(right, 0, right, height)
            }

            let withinBounds = withinTop && withinLeft && withinBottom && withinRight;

            if (withinBounds && this.position.y < this.world.platforms[i].getPosition().y) {
                this.position.y = top - radius;
                this.grounded = true;
            } else if (withinBounds && this.position.y > this.world.platforms[i].getPosition().y) {
                this.position.y = bottom + radius;
            } else if (withinBounds && this.position.x < this.world.platforms[i].getPosition().x) {
                this.position.x = left - radius;
            } else if (withinBounds && this.position.x > this.world.platforms[i].getPosition().x) {
                this.position.x = right + radius;
            }
        }
    }

    draw() {
        circle(this.position.x, this.position.y, 50);
    }

    tick() {
        this.handleCollision(this.world.getEntities());
        this.handleGravity(this.world.getGravity(), 1/this.world.getTickRate());
        this.handleCollision(this.world.getEntities());
    }
}