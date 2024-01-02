class PlayerEntity extends Entity {

    constructor (world, id, name, position, velocity, mass, width, height, maxHealth, strafingForce, jumpingForce) {
        super(world, id, name, position, velocity, mass, width, height, maxHealth, strafingForce, jumpingForce);
        this.flipped = false;
    }

    handleInput() {
        // Reset all input states
        this.strafingLeft = false;
        this.strafingRight = false;
        this.jumping = false;
        this.crouching = false;
    
        // Check for specific keys being pressed
        if (keyIsDown(65)) {
            this.strafingLeft = true;
        } else {
            this.strafingLeft = false;
        }
    
        if (keyIsDown(68)) {
            this.strafingRight = true;
        } else {
            this.strafingRight = false;
        }
    
        if ((keyIsDown(32) || keyIsDown(87)) && this.jumpCooldown <= 0) {
            this.jumping = true;
        } 
    
        if (keyIsDown(83)) {
            this.crouching = true;
        }

        if (mouseIsPressed) {
            this.attack();
        }
    }

    handleHealth() {
        if (this.health <= 0) {
            location.reload();
            this.health = this.maxHealth;
        }
    }


    attack() {
        if (this.attackCooldown <= 0) {
            this.attackCooldown = 0.5;
            if (this.flipped) {
                const attack = new BulletEntity(this.world, this.world.getEntities().length, "Attack", this.position.copy().add(80), this.velocity.copy().add(1000), 1, 1, 10, 10, 0, 0);
                this.world.addEntity(attack);
            } else {
                const attack = new BulletEntity(this.world, this.world.getEntities().length, "Attack", this.position.copy().add(-80), this.velocity.copy().add(-1000), 1, 1, 10, 10, 0, 0);
                this.world.addEntity(attack);
            }
            
        }
    }

    animation() {
        if (frame % 25 == 0) {
            animationFrame += 1;
        }
        if (animationFrame > 4) {
            animationFrame = 1;
        }

        if (this.wallTimer > 0.05) {
            fall = oldFall;
            jump = oldJump;
        }
    
        if (this.velocity.y > 0.1) {
            PLAYERSPRITE = fall;
            if (this.strafingLeft) {
                this.flipped = false;
            } else if (this.strafingRight) {
                this.flipped = true;
            }
        } else if (this.velocity.y < 0) {
            PLAYERSPRITE = jump;
            if (this.strafingLeft) {
                this.flipped = false;
            } else if (this.strafingRight) {
                this.flipped = true;
            }
        } else {
            if ((this.strafingLeft || this.strafingRight) && animationFrame == 1) {
                PLAYERSPRITE = walk1;
                if (this.strafingLeft) {
                    this.flipped = false;
                } else if (this.strafingRight) {
                    this.flipped = true;
                }
            } else if ((this.strafingLeft || this.strafingRight) && animationFrame == 2) {
                PLAYERSPRITE = walk2;
                if (this.strafingLeft) {
                    this.flipped = false;
                } else if (this.strafingRight) {
                    this.flipped = true;
                }
            } else if ((this.strafingLeft || this.strafingRight) && animationFrame == 3) {
                PLAYERSPRITE = walk3;
                if (this.strafingLeft) {
                    this.flipped = false;
                } else if (this.strafingRight) {
                    this.flipped = true;
                }
            } else if ((this.strafingLeft || this.strafingRight) && animationFrame == 4) {
                PLAYERSPRITE = walk4;
                if (this.strafingLeft) {
                    this.flipped = false;
                } else if (this.strafingRight) {
                    this.flipped = true;
                }
            } else {
                if (animationFrame % 4 == 0) {
                    PLAYERSPRITE = idle1;
                } else {
                    PLAYERSPRITE = idle2;
                }
            }
        }
    }

    draw() {
        push();
        imageMode(CENTER);
        if (this.flipped) {
            push();
            scale(-1, 1);
            image(PLAYERSPRITE, -this.position.x, this.position.y, this.width, this.height);
            pop();
        } else {
            image(PLAYERSPRITE, this.position.x, this.position.y, this.width, this.height);
        }
        pop();
    }
    

    tick() {
        this.handleInput();
        this.handleMovement(this.world.getPlatforms(), this.world.getGravity());
        this.handleHealth();
        this.animation();
    }

    toString() {
        return "PlayerEntity[" + this.id + ", " + this.name + ", " + this.position + ", " + this.velocity + ", " + this.mass + ", " + this.maxHealth + ", " + this.health + "]";
    }
}