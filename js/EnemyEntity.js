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
        this.flipped = false;
        this.goalOrder = [];
        this.SPRITE;
        this.enemyFall = enemyFall;
        this.enemyJump = enemyJump
    }

    draw() {
        push();
        fill(255, 0, 0);
        imageMode(CENTER);
        if (this.flipped) {
            push();
            scale(-1, 1);
            image(this.SPRITE, -this.position.x, this.position.y, this.width, this.height);
            pop();
        } else {
            image(this.SPRITE, this.position.x, this.position.y, this.width, this.height);
        }
        

        fill(100, 100, 100);
        rect(this.position.x - this.width/6, this.position.y - 100, 50, 10);
        fill(255, 0, 0);
        rect(this.position.x - this.width/6, this.position.y - 100, this.health * 5, 10);
        pop();
    }

    tick() {
        this.runGoals(this.goalOrder);
        this.handleMovement(this.world.getPlatforms(), this.world.getGravity());
        this.handleHealth();
        this.animation();
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
        const distanceToPlayer = player.getPosition().x - this.position.x;
        const direction = player.getPosition().copy().sub(this.position).normalize();

        if (Math.abs(distanceToPlayer) > 750) {
            return false;
        }
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
        if (dist(this.position.x, this.position.y, player.position.x, player.position.y) < 70) {
            this.strafingLeft = false;
            this.strafingRight = false;
            this.attack();
            return true;
        } else {
            return false;
        }
    }
    dummyGoal() {
        return true;
    }

    animation() {

        if (this.wallTimer > 0.05) {
            this.enemyFall = enemyOldFall;
            this.enemyJump = enemyOldJump;
        }
    
        if (this.velocity.y > 0.1) {
            this.SPRITE = this.enemyFall;
            if (this.strafingLeft) {
                this.flipped = false;
            } else if (this.strafingRight) {
                this.flipped = true;
            }
        } else if (this.velocity.y < 0) {
            this.SPRITE = this.enemyJump;
            if (this.strafingLeft) {
                this.flipped = false;
            } else if (this.strafingRight) {
                this.flipped = true;
            } 
            if (this.enemyFall == enemyWallFall) {
                this.SPRITE = enemyWallJump;
            }
        } else {
            if ((this.strafingLeft || this.strafingRight) && animationFrame == 1) {
                this.SPRITE = enemyWalk1;
                if (this.strafingLeft) {
                    this.flipped = false;
                } else if (this.strafingRight) {
                    this.flipped = true;
                }
            } else if ((this.strafingLeft || this.strafingRight) && animationFrame == 2) {
                this.SPRITE = enemyWalk2;
                if (this.strafingLeft) {
                    this.flipped = false;
                } else if (this.strafingRight) {
                    this.flipped = true;
                }
            } else if ((this.strafingLeft || this.strafingRight) && animationFrame == 3) {
                this.SPRITE = enemyWalk3;
                if (this.strafingLeft) {
                    this.flipped = false;
                } else if (this.strafingRight) {
                    this.flipped = true;
                }
            } else if ((this.strafingLeft || this.strafingRight) && animationFrame == 4) {
                this.SPRITE = enemyWalk4;
                if (this.strafingLeft) {
                    this.flipped = false;
                } else if (this.strafingRight) {
                    this.flipped = true;
                }
            } else {
                if (animationFrame % 4 == 0) {
                    this.SPRITE = enemyIdle1;
                } else {
                    this.SPRITE = enemyIdle2;
                }
            }
        }
    }
    
}