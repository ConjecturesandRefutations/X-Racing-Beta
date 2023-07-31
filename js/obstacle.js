class Obstacle {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width =  30;
      this.height =  50;
      this.obstacleType = Math.random() < 0.5 ? 'banana' : 'blue';
    }
  
    drawObstacle() {
      const obstacleImg = new Image();
      obstacleImg.src =
        this.obstacleType === 'banana'
          ? './images/obstacleCarRed.png'
          : './images/obstacleCarBlue.png';
      ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
    }
  }
  