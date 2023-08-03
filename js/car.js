let currentColor = 'blue';

function handleColorChange(event) {
  event.stopPropagation();
  if (event.target.checked) {
    currentColor = event.target.value;
    // Uncheck other checkboxes
    const checkboxes = document.querySelectorAll('input[name="color"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox !== event.target) {
        checkbox.checked = false;
      }
    });
  } else {
    // Ensure that at least one checkbox is always checked
    const checkedCheckboxes = document.querySelectorAll('input[name="color"]:checked');
    if (checkedCheckboxes.length === 0) {
      event.target.checked = true;
    }
  }
}

class Car {
    constructor(){
      this.x = canvas.width/2;
      this.y = canvas.height/1.5;
      this.width = 30;
      this.height = 50;
      this.img = this.getImagePath();
        // Variables to track button presses
        this.leftButtonDown = false;
        this.rightButtonDown = false;
    
        // Select the mobile-controls buttons
        this.leftButton = document.getElementById('left');
        this.rightButton = document.getElementById('right');
    
        // Add touch event listeners to start/stop car movement
        this.leftButton.addEventListener('touchstart', () => {
          this.leftButtonDown = true;
          this.startMovingCar('left');
        });
    
        this.rightButton.addEventListener('touchstart', () => {
          this.rightButtonDown = true;
          this.startMovingCar('right');
        });
    
        this.leftButton.addEventListener('touchend', () => {
          this.leftButtonDown = false;
          this.stopMovingCar();
        });
    
        this.rightButton.addEventListener('touchend', () => {
          this.rightButtonDown = false;
          this.stopMovingCar();
        });
    
  
    }
    
    getImagePath() {
      // Return the appropriate image path based on the currentColor
      switch (currentColor) {
        case 'yellow':
          return './images/yellow-car.png';
        case 'blue':
          return './images/blue-car.png';
        case 'red':
        default:
          return './images/red-car.png';
      }
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
          turn.play();
        }
          break;
        case 39: //right
        if (this.x < 450 ){
          this.x += 10;
          turn.play();
        }
          break;
          case 38: //up
          if(this.y>20){
             this.y -= 10;
             turn.play();
          }
          break;
          case 40: //down
         if(this.y<580){
             this.y += 10;
             turn.play();
         }
      }
    }

    startMovingCar(direction) {
      // Move the car repeatedly as long as the corresponding button is pressed
      if (direction === 'left' && this.leftButtonDown) {
        this.x -= 3;
        turn.play();
        this.requestAnimationFrame = requestAnimationFrame(() => this.startMovingCar('left'));
      } else if (direction === 'right' && this.rightButtonDown) {
        this.x += 3;
        turn.play();
        this.requestAnimationFrame = requestAnimationFrame(() => this.startMovingCar('right'));
      }
    }
  
    stopMovingCar() {
      // Stop the car's movement when both buttons are released
      if (!this.leftButtonDown && !this.rightButtonDown) {
        cancelAnimationFrame(this.requestAnimationFrame);
      }
    }
     
  }