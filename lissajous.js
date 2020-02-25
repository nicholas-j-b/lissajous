'use strict';

class Lissajous {
    constructor(ctx) {
        this.ctx = ctx;
        this.setupLines();
        this.setupCurves();
    }

    update() {
        this.updateLines();
        this.updateCurves();
    }

    draw() {
        this.drawLines();
        this.drawCurves();
    }

    updateCurves() {
        for (let i = 0; i < Config.NUM_ROWS; i++) {
            for (let j = 0; j < Config.NUM_COLS; j++) {
                this.curves[i][j].addNewPoint(
                        this.lines.verticalLines[j].getFluctuation(), this.lines.horizontalLines[i].getFluctuation()
                    );
            }
        }
    }

    drawCurves() {
        //this.curves[Debug.DEFUALT][Debug.DEFUALT].draw();
        for (let curve of this.forEachCurve()) {
            curve.draw();
        }
    }

    updateLines() {
        for (let line of this.forEachLine()) {
            line.update();
        }
    }

    drawLines() {
        for (let line of this.forEachLine()) {
            line.draw();
        }
    }

    * forEachCurve() {
        for (let curveRow of this.curves) {
            for (let curve of curveRow) {
                yield curve;
            }
        }
    }

    * forEachLine() {
        for (let lineName in this.lines) {
            for (let line of this.lines[lineName]) {
                yield line;
            }
        }
    }

    setupLines() {
        this.lines = {
            horizontalLines: [],
            verticalLines: []
        }
        for (let i = 0; i < Config.NUM_ROWS; i++) {
            let yPos = Config.VERTICAL_SPACING * (i + 1);
            this.lines.horizontalLines.push(new HorizontalLine(this.ctx, i, yPos));
        }
        for (let i = 0; i < Config.NUM_COLS; i++) {
            let xPos = Config.HORIZONTAL_SPACING * (i + 1);
            this.lines.verticalLines.push(new VerticalLine(this.ctx, i, xPos));
        }
    }

    setupCurves() {
        this.curves = [];
        for (let i = 0; i < Config.NUM_ROWS; i++) {
            this.curves.push([]);
            for (let j = 0; j < Config.NUM_COLS; j++) {
                this.curves[i].push(new Curve(this.ctx, (j + 1) * Config.HORIZONTAL_SPACING, (i + 1) * Config.VERTICAL_SPACING));
            }
        }
    }
}