class Point {
    constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(x) {
        this.x = this.baseX + x;
    }

    setY(y) {
        this.y = this.baseY + y;
    }

    getPoints() {
        return [this.x, this.y];
    }
}