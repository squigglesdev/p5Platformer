class EnemyEntity extends Entity {
    constructor (world, id, name, position, velocity, mass, maxHealth, width, height, strafingForce, jumpingForce, patrolPoints) {
        super(world, id, name, position, velocity, mass, maxHealth, width, height, strafingForce, jumpingForce);

        this.patrolPoints = patrolPoints;
        this.patrolIndex = 0;
        this.goals = {
            patrol: this.patrolGoal.bind(this),
            chase: this.chaseGoal.bind(this),
            attack: this.attackGoal.bind(this)
        }
        this.goalOrder = [];
    }

    draw() {
        push();
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(this.position.x, this.position.y, this.width, this.height);
        textSize(32);
        fill(0);
        textAlign(CENTER, CENTER);
        text(this.health, this.position.x, this.position.y);
        pop();
    }

    tick() {
        this.runGoals(this.goalOrder);
        this.handleMovement(this.world.getPlatforms(), this.world.getGravity());
        this.handleHealth();
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


    patrolGoal() {
        const currentWaypoint = this.patrolPoints[this.patrolIndex];
        const distanceToWaypoint = currentWaypoint.x - this.position.x;
        const direction = currentWaypoint.copy().sub(this.position).normalize();
        if (Math.abs(distanceToWaypoint) > 5) {
            if (direction.x > 0) {
                this.strafingRight = true;
                this.strafingLeft = false;
                this.maxSpeed = 2;
            } else if (direction.x < 0) {
                this.strafingLeft = true;
                this.strafingRight = false;
                this.maxSpeed = 2;
            }
        } else {
            this.patrolIndex = (this.patrolIndex + 1) % this.patrolPoints.length;
        }

        return true;
    }

    chaseGoal() {
        const player = this.world.getPlayer();
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
                this.maxSpeed = 4;
            } else if (direction.x < 0) {
                this.strafingLeft = true;
                this.strafingRight = false;
                this.maxSpeed = 4;
            }
        }

        return true;
    }
    attackGoal() {
        const player = this.world.getPlayer();

        if (player == null) {
            return false;
        }
        if (dist(this.position.x, this.position.y, player.position.x, player.position.y) - 50 < 10) {
            this.strafingLeft = false;
            this.strafingRight = false;
            this.attack();
            console.log("attacking");
            return true;
        } else {
            return false;
        }
    }
    
}