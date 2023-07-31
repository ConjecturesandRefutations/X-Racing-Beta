class Car {
    constructor(){
      this.x = 231;
      this.y = 520;
      this.width = 40;
      this.height = 40;
      this.img = './images/car.jpg';
    }
    
    drawCar(){
      const carImg = new Image();
      carImg.src = this.img;
      ctx.drawImage(carImg, this.x, this.y, this.width, this.height);
    }

    moveCar(keyCode){
      console.log('x', this.x);
      console.log('y', this.y);
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
         if(this.y<650){
             this.y += 10;
         }
      }
    }
  }