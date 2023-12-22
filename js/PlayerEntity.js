class PlayerEntity extends Entity {

    constructor (world, id, name, position, velocity, mass, maxHealth, strafingForce, jumpingForce, crouchingForce) {
        super(world, id, name, position, velocity, mass, maxHealth, strafingForce, jumpingForce, crouchingForce);
    }

    handleInput() {
        if (keyIsDown(65)) {
            this.strafingLeft = true;
        }

        else if (keyIsDown(68)) {
            this.strafingRight = true;
        }

        else if ((keyIsDown(32) || keyIsDown(87)) && this.grounded && !this.jumping) {
            this.jumping = true;
        }

        else if (keyIsDown(83)) {
            this.crouching = true;
        }

        else {
            this.strafingLeft = false;
            this.strafingRight = false;
            this.jumping = false;
            this.crouching = false;
        }
    }

    tick() {
        this.handleCollision(this.world.getEntities());
        this.handleInput();
        this.handleMovement(1/this.world.getTickRate());
        this.handleGravity(this.world.getGravity(), 1/this.world.getTickRate());
        this.handleCollision(this.world.getEntities());
    }

    toString() {
        return "PlayerEntity[" + this.id + ", " + this.name + ", " + this.position + ", " + this.velocity + ", " + this.mass + ", " + this.maxHealth + ", " + this.health + "]";
    }
}