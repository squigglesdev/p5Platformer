class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.targetX = 0;
        this.targetY = 0;
    }

    startFollow(followPosition) {
        this.targetX = followPosition.x - width / 2;
        this.targetY = followPosition.y - height / 2;
        this.x = lerp(this.x, this.targetX, deltaTime * 10);
        this.y = lerp(this.y, this.targetY, deltaTime * 10);
        translate(-this.x, -this.y);
    }

    endFollow() {
        translate(this.x, this.y);
    }
}