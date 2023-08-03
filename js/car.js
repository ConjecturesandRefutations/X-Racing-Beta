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

function addTouchListeners() {
  currentCar.leftButton.addEventListener('touchstart', () => {
    currentCar.leftButtonDown = true;
    currentCar.throttledLeftStart();
  });

  currentCar.rightButton.addEventListener('touchstart', () => {
    currentCar.rightButtonDown = true;
    currentCar.throttledRightStart();
  });

  currentCar.leftButton.addEventListener('touchend', () => {
    currentCar.leftButtonDown = false;
    currentCar.stopMovingCar();
  });

  currentCar.rightButton.addEventListener('touchend', () => {
    currentCar.rightButtonDown = false;
    currentCar.stopMovingCar();
  });

  // Mouse event listeners
  currentCar.leftButton.addEventListener('mousedown', () => {
    currentCar.leftButtonDown = true;
    currentCar.throttledLeftStart();
  });

  currentCar.rightButton.addEventListener('mousedown', () => {
    currentCar.rightButtonDown = true;
    currentCar.throttledRightStart();
  });

  currentCar.leftButton.addEventListener('mouseup', () => {
    currentCar.leftButtonDown = false;
    currentCar.stopMovingCar();
  });

  currentCar.rightButton.addEventListener('mouseup', () => {
    currentCar.rightButtonDown = false;
    currentCar.stopMovingCar();
  });
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
    
      // Variables to track button presses
    this.leftButtonDown = false;
    this.rightButtonDown = false;
    this.throttleDelay = 100; // Set the throttle delay in milliseconds

    // Select the mobile-controls buttons
    this.leftButton = document.getElementById('left');
    this.rightButton = document.getElementById('right');

    // Throttle the touchstart event listeners
    this.throttledLeftStart = this.throttle(() => this.startMovingCar('left'), this.throttleDelay);
    this.throttledRightStart = this.throttle(() => this.startMovingCar('right'), this.throttleDelay);
  
  
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
        if (this.x < 470 ){
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

    throttle(callback, delay) {
      let lastCallTime = 0;
      return function () {
        const now = Date.now();
        if (now - lastCallTime >= delay) {
          lastCallTime = now;
          callback.apply(this, arguments);
        }
      };
    }
    
startMovingCar(direction) {
    // Move the car continuously as long as the corresponding button is pressed
    if (direction === 'left' && this.leftButtonDown && this.x > 5) {
      this.x -= 3;
      turn.play();
    } else if (direction === 'right' && this.rightButtonDown && this.x < myCanvas.width - 40) {
      this.x += 3;
      turn.play();
    }

    // Use requestAnimationFrame to keep moving the car continuously
    if (this.leftButtonDown || this.rightButtonDown) {
      this.requestAnimationFrame = requestAnimationFrame(() => this.startMovingCar(direction));
    }
  }
  
    stopMovingCar() {
      // Stop the car's movement when both buttons are released
      if (!this.leftButtonDown && !this.rightButtonDown) {
        cancelAnimationFrame(this.requestAnimationFrame);
      }
    }

    removeEventListeners() {
      this.leftButton.removeEventListener('touchstart', this.throttledLeftStart);
      this.rightButton.removeEventListener('touchstart', this.throttledRightStart);
      this.leftButton.removeEventListener('touchend', this.stopMovingCar);
      this.rightButton.removeEventListener('touchend', this.stopMovingCar);
      this.leftButton.removeEventListener('mousedown', this.throttledLeftStart);
      this.rightButton.removeEventListener('mousedown', this.throttledRightStart);
      this.leftButton.removeEventListener('mouseup', this.stopMovingCar);
      this.rightButton.removeEventListener('mouseup', this.stopMovingCar);
    }
     
  }