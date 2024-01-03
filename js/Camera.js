class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.shakeDuration = 0;
        this.shakeStrength = 0;
    }

    startFollow(followPosition) {
        this.targetX = followPosition.x - width / 2;
        this.targetY = followPosition.y - (height / 2) - 100;
        this.x = lerp(this.x, this.targetX, deltaTime * 10);
        this.y = lerp(this.y, this.targetY, deltaTime * 10);
        translate(-this.x, -this.y);

        if (this.shakeDuration > 0) {
            this.shakeDuration -= deltaTime;
            this.performShake(this.shakeStrength);
        }
    }

    setDuration(duration) {
        this.shakeDuration = duration;
    }

    shake(strength, duration){
        this.shakeStrength = strength;
        this.shakeDuration = duration;
    }

    performShake(strength) {
        this.x += random(-strength, strength);
        this.y += random(-strength, strength);
    }

    endFollow() {
        translate(this.x, this.y);
    }
}