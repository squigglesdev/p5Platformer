class PlayerEntity extends Entity {

    constructor (world, id, name, position, velocity, mass, maxHealth, strafingForce, jumpingForce) {
        super(world, id, name, position, velocity, mass, maxHealth, strafingForce, jumpingForce);
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
    
        if ((keyIsDown(32) || keyIsDown(87))) {
            this.jumping = true;
        }
    
        if (keyIsDown(83)) {
            this.crouching = true;
        }
    }
    

    tick() {
        this.handleInput();
        this.handleMovement(this.world.getPlatforms(), this.world.getGravity());
    }

    toString() {
        return "PlayerEntity[" + this.id + ", " + this.name + ", " + this.position + ", " + this.velocity + ", " + this.mass + ", " + this.maxHealth + ", " + this.health + "]";
    }
}