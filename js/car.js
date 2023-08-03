let currentColor = 'blue';
let leftButtonPressed = false;
let rightButtonPressed = false;
let continuousMoveInterval = null; 


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
     // Method to handle continuous movement
  startContinuousMovement(action) {
    // Set the corresponding buttonPressed flag
    if (action === "left") {
      leftButtonPressed = true;
    } else if (action === "right") {
      rightButtonPressed = true;
    }

    // Check if continuous movement interval is already set to avoid overlapping intervals
    if (!continuousMoveInterval) {
      continuousMoveInterval = setInterval(() => {
        if (leftButtonPressed) {
          this.moveCar(37); // 37 corresponds to the keyCode for the left arrow key
        } else if (rightButtonPressed) {
          this.moveCar(39); // 39 corresponds to the keyCode for the right arrow key
        }
      }, 100); // Adjust the interval as needed to control the speed of movement
    }
  }

  // Method to handle stopping continuous movement
  stopContinuousMovement() {
    leftButtonPressed = false;
    rightButtonPressed = false;
    clearInterval(continuousMoveInterval);
    continuousMoveInterval = null;
  }
  }