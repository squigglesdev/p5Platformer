class Grid {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
    
        this.grid = new Array(Math.max(cols, rows));

        this.openSet = [];
        this.closedSet = [];

        this.start = undefined;
        this.end = undefined;

        this.w = width / cols;
        this.h = height / rows;

        this.path = [];
    } 
}