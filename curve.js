class Curve {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.topCorner = new Point(
            x - Config.HORIZONTAL_SPACING / 2, 
            y - Config.VERTICAL_SPACING / 2
            );
        this.points = [];
    }

    addNewPoint(x, y) {
        this.points.push(new Point(
            x + Config.HORIZONTAL_SPACING / 2, 
            y + Config.VERTICAL_SPACING / 2
            ));
    }


    createImData(imData) {
        for (let point of this.points) {
            let x = point.getX();
            let y = point.getY();
            let index = (Math.round(x) + (Config.HORIZONTAL_SPACING * Math.round(y))) * 4
            imData.data[index] = 155;
            imData.data[index + 1] = 255;
        }
        return imData;
    }

    draw() {
        let imData = this.ctx.getImageData(
            this.topCorner.getX(), 
            this.topCorner.getY(), 
            Config.HORIZONTAL_SPACING, 
            Config.VERTICAL_SPACING
            );
        imData = this.createImData(imData);
        this.ctx.putImageData(imData, ...this.topCorner.getPoints());
    }
}