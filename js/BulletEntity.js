class BulletEntity extends Entity {
    constructor (world, id, name, position, velocity, mass, maxHealth, width, height, strafingForce, jumpingForce) {
        super(world, id, name, position, velocity, mass, maxHealth, width, height, strafingForce, jumpingForce);
    }

    draw() {
        push();
        fill(0, 255, 0);
        rectMode(CENTER);
        rect(this.position.x, this.position.y, this.width, this.height);
        pop();
    }

    tick() {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        console.log(this.velocity.x);
        this.attack();
    }

    attack() {
        this.world.getEntities().forEach(entity => {
            if (entity != this && entity != this.world.getPlayer()) {
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