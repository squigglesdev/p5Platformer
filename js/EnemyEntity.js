class EnemyEntity extends Entity {
    constructor (world, id, name, position, velocity, mass, maxHealth, strafingForce, jumpingForce, patrolPoints) {
        super(world, id, name, position, velocity, mass, maxHealth, strafingForce, jumpingForce);

        this.patrolPoints = patrolPoints;
        this.patrolIndex = 0;
        this.goals = {
            patrol: this.patrol(),
            chase: this.chase(),
            attack: this.attack()
        }
        this.goalOrder = [];
    }

    draw() {
        push();
        fill(255, 0, 0);
        rect(this.position.x, this.position.y, 50, 50);
        pop();
    }

    tick() {
        this.runGoals(this.goalOrder);
        this.handleMovement(this.world.getPlatforms(), this.world.getGravity());
    }

    setGoalOrder(goalList) {
        this.goalOrder = goalList;
    }
    

    runGoals(goalList) {
        for (const goal of goalList) {
            if (goal()) {
                break;
            }
        }
    }


    patrol() {
        const currentWaypoint = this.patrolPoints[this.patrolIndex];
        const direction = currentWaypoint.copy().sub(this.position).normalize();

        if (direction.x > 0) {
            this.strafingRight = true;
            this.strafingLeft = false;
        } else if (direction.x < 0) {
            this.strafingLeft = true;
            this.strafingRight = false;
        }

        const distanceToWaypoint = dist(this.position.x, this.position.y, currentWaypoint.x, currentWaypoint.y);
        if (distanceToWaypoint < 5) {
            this.currentWaypointIndex = (this.currentWaypointIndex + 1) % this.patrolWaypoints.length;
        }

        return true;
    }

    chase() {
        const player = this.world.getPlayer();
        console.log(player);
        if (player == null) {
            return false;
        }
        const direction = player.getPosition().copy().sub(this.position).normalize();

        if (this.strafingLeft && direction.x > 0) {
            return false;
        }
        else if (this.strafingRight && direction.x < 0) {
            return false;
        }
        else {
            if (direction.x > 0) {
                this.strafingRight = true;
                this.strafingLeft = false;
            } else if (direction.x < 0) {
                this.strafingLeft = true;
                this.strafingRight = false;
            }
        }

        return true;
    }
    attack() {}
    
}