class Banana {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width || 50;
        this.height = height || 70;
        this.img = './images/banana.jpeg';
    }

    drawObstacle(){
        const obstacleImg = new Image();
        obstacleImg.src = this.img;
        ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
    }
}

class Person extends Banana {
    constructor(x, y, width, height) {
        super(x, y, width || 30, height || 70);
        this.img = './images/person.png';
    }

}
