class Entity {
    constructor (world, id, name, position, velocity, mass, maxHealth, width, height, strafingForce, jumpingForce) {
        this.world = world;
        this.id = id;
        this.name = name;
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.width = width;
        this.height = height;
        this.strafingForce = strafingForce;
        this.jumpingForce = jumpingForce;
        this.strafingLeft = false;
        this.strafingRight = false;
        this.jumping = false;
        this.jumps = 2;
        this.crouching = false;
        this.grounded = false;
        this.hittingHead = false;
        this.jumpCooldown = 0;
        this.maxSpeed = 2;
        this.attackCooldown = 0;
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
            top: this.position.y - this.height / 2,
            left: this.position.x - this.width / 2,
            bottom: this.position.y + this.height / 2,
            right: this.position.x + this.width / 2
        };
    }

    handleMovement(platforms, gravity) {

        if (isNaN(this.velocity.y) || isNaN(this.velocity.x) || isNaN(deltaTime) || isNaN(this.strafingForce) || isNaN(this.jumpingForce) || isNaN(gravity)) {
            return;
        }

        this.velocity.y = min(100, this.velocity.y + gravity * deltaTime);
        this.airTimer ++;

        if (this.strafingLeft || this.strafingRight) {
            if (this.strafingLeft) {
                this.velocity.x = max(-this.maxSpeed, this.velocity.x - this.strafingForce * deltaTime);
            }
            if (this.strafingRight) {
                this.velocity.x = min(this.maxSpeed, this.velocity.x + this.strafingForce * deltaTime);
            }
        } else {
            this.velocity.x = this.velocity.x * 0.95;
        }

        this.jumpCooldown -= deltaTime;

        if (this.jumping && this.jumps > 0) {
            this.jumping = false;
            this.jumpCooldown = 0.5;   
            this.velocity.y = -5;
            this.jumps -= 1;
        }


        this.position.x += this.velocity.x;

        platforms.forEach(platform => {
            const platformBounds = platform.getBounds();
            if (this.collides(this.getBounds(), platformBounds)) {
                if (this.velocity.x > 0) {
                    this.position.x = platformBounds.left - (this.width / 2 + 0.1);
                    this.velocity.y = this.velocity.y * 0.95;
                    if (this.jumps == 0) {
                        this.jumps = 1;
                    }
                } if (this.velocity.x < 0) {
                    this.position.x = platformBounds.right + (this.width / 2 + 0.1);
                    this.velocity.y = this.velocity.y * 0.95;
                    if (this.jumps == 0) {
                        this.jumps = 1;
                    }
                }
            } else {
                this.world.setGravity(9.8);
            }
        });


        this.position.y += this.velocity.y;

        platforms.forEach(platform => {
            const platformBounds = platform.getBounds();
            if (this.collides(this.getBounds(), platformBounds)) {
                if (this.velocity.y > 0) {
                    this.position.y = platformBounds.top - (this.height / 2 + 0.1);
                    this.velocity.y = 0;
                    this.jumps = 2;
                    this.airTimer = 0;
                    this.grounded = true;
                } if (this.velocity.y < 0) {
                    this.position.y = platformBounds.bottom + (this.height / 2 + 0.1);
                    this.velocity.y = 0;
                }
            }
        });

        if (this.position.y > height + 500) {
            this.health = 0;
            this.position.y = -500;
        }
        this.attackCooldown -= deltaTime;
    }

    attack() {
        if (this.attackCooldown <= 0) {
            this.world.getEntities().forEach(entity => {
                if (entity != this) {
                    const entityBounds = entity.getBounds();
                    if (this.collides(this.getBounds(), entityBounds)) {
                        entity.health -= 1;
                        entity.velocity.y = -2;
                        entity.velocity.x = -entity.velocity.x * 3.5;
                    }
                }
            });
            
            this.attackCooldown = 0.5;
        }
    }

    handleHealth() {
        if (this.health <= 0) {
            this.world.removeEntity(this);
        }
    }

    collides(bounds1, bounds2) {
        return bounds1.right >= bounds2.left && bounds1.left <= bounds2.right && bounds1.bottom >= bounds2.top && bounds1.top <= bounds2.bottom;
    }

    draw() {
        push();
        rectMode(CENTER);
        rect(this.position.x, this.position.y, this.width, this.height);
        pop();
    }

    tick() {
        this.handleMovement(this.world.getPlatforms(), this.world.getGravity());
        this.handleHealth();
    }
}