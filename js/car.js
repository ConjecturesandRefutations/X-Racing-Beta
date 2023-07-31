class Car {
    constructor(){
      this.x = canvas.width/2;
      this.y = canvas.height/1.5;
      this.width = 30;
      this.height = 50;
      this.img = './images/red-car.png';
    }
    
    drawCar(){
      const carImg = new Image();
      carImg.src = this.img;
      ctx.drawImage(carImg, this.x, this.y, this.width, this.height);
    }

    moveCar(keyCode){
      ctx.clearRect(this.x, this.y, this.width, this.height);
      switch(keyCode){
        case 37: //left
        if(this.x > 15){
          this.x -= 10;
        }
          break;
        case 39: //right
        if (this.x < 450 ){
          this.x += 10;
        }
          break;
          case 38: //up
          if(this.y>20){
             this.y -= 10;
          }
          break;
          case 40: //down
         if(this.y<580){
             this.y += 10;
         }
      }
    }
  }