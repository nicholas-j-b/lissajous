'use strict';

class Line {
    constructor(ctx, speed) {
        this.ctx = ctx;
        this.angle = 0;
        this.speed = speed + 1;
    }

    update() {
        this.updateAngle();
        this.updatePoints();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.points.first.getX(), this.points.first.getY());
        this.ctx.lineTo(this.points.second.getX(), this.points.second.getY());
        this.ctx.closePath();

        this.ctx.lineWidth = Config.LINE_WIDTH;
        this.ctx.strokeStyle = Config.COLOURS.lines;
        this.ctx.stroke();
    }

    updateAngle() {
        this.angle += this.speed * Config.ANIMATION.speed;
        this.angle = this.angle % (2 * Math.PI);
    }

    * forEachPoint() {
        for (let pointName in this.points) {
            yield this.points[pointName];
        }
    }

    getFluctuation() {
        return Math.sin(this.angle) * Config.FLUCTUATION;
    }
}

class HorizontalLine extends Line {
    constructor(ctx, speed, y) {
        super(ctx, speed);
        this.points = {
            first: new Point(0, y), 
            second: new Point(Config.CANVAS_WIDTH, y)
        };
    }

    updatePoints() {
        for (let point of this.forEachPoint()) {
            point.setY(this.getFluctuation());
        }
    }
}

class VerticalLine extends Line {
    constructor(ctx, speed, x) {
        super(ctx, speed);
        this.points = {
            first: new Point(x, 0),
            second: new Point(x, Config.CANVAS_HEIGHT)
        };
    }

    updatePoints() {
        for (let point of this.forEachPoint()) {
            point.setX(this.getFluctuation());
        }
    }

    getFluctuation() {
        return Math.cos(this.angle) * Config.FLUCTUATION;
    }
}