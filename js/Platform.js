class Platform {
    constructor(world, id, position, width, height, color, slippery) {
        this.world = world;
        this.id = id;
        this.position = position;
        this.width  = width;
        this.height = height;
        this.color = color;
        this.slippery = slippery;
    }

    getId() {
        return this.id;
    }

    getPosition() {
        return this.position;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getColor() {
        return this.color;
    }

    getSlippery() {
        return this.slippery;
    }

    getBounds() {
        //return the top, left, bottom and rightmost coordinates of the platform
        return {
            top: this.position.y - this.height/2,
            left: this.position.x - this.width/2,
            bottom: this.position.y + this.height/2,
            right: this.position.x + this.width/2
        };
    }

    setId(id) {
        this.id = id;
    }

    setPosition(position) {
        this.position = position;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    setColor(color) {
        this.color = color;
    }

    setSlippery(slippery) {
        this.slippery = slippery;
    }

    toString() {
        return "Platform[" + this.id + ", " + this.position + ", " + this.width + ", " + this.height + ", " + this.color + ", " + this.slippery + "]";
    }
    
    draw() {
        push();
        rectMode(CENTER);
        fill(this.color);
        rect(this.position.x, this.position.y, this.width, this.height);
        pop();
    }
}