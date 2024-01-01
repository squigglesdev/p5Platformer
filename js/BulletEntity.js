class BulletEntity extends Entity {
    constructor (world, id, name, position, velocity, mass, maxHealth, width, height, strafingForce, jumpingForce) {
        super(world, id, name, position, velocity, mass, maxHealth, width, height, strafingForce, jumpingForce);
    }

    draw() {
        push();
        fill(0, 255, 0);
        rectMode(CENTER);
        ellipse(this.position.x, this.position.y, this.width, this.height);
        pop();
    }

    tick() {
        this.position.x += this.velocity.x * deltaTime;
        
        this.world.getPlatforms().forEach(platform => {
            if (this.collides(this.getBounds(), platform.getBounds())) {
                this.velocity.x = - this.velocity.x;
                console.log("collided");
            }
        });
        this.position.y += this.velocity.y * deltaTime;

        this.attack();
    }

    attack() {
        this.world.getEntities().forEach(entity => {
            if (entity != this) {
                const entityBounds = entity.getBounds();
                if (this.collides(this.getBounds(), entityBounds)) {
                    entity.health -= 1;
                    entity.velocity.y = -2;
                    entity.velocity.x = -entity.velocity.x * 3.5;
                    this.world.removeEntity(this);
                }
            }
        });
            
    }
}