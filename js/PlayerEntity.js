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
        textSize(32);
        fill(0);
        textAlign(CENTER, CENTER);
        text(this.health, this.position.x-2.5, this.position.y + 10);
        pop();
    }
    

    tick() {
        this.handleInput();
        this.handleMovement(this.world.getPlatforms(), this.world.getGravity());
        this.handleHealth();
    }

    toString() {
        return "PlayerEntity[" + this.id + ", " + this.name + ", " + this.position + ", " + this.velocity + ", " + this.mass + ", " + this.maxHealth + ", " + this.health + "]";
    }
}