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

// Function to handle mobile button clicks and call turnCar with the appropriate action
function handleMobileButtonClick(action) {
  currentCar.turnCar(action); // MoveCar with "left" or "right" action
}

// Function to continuously move the car in the specified direction
let isButtonDown = false;
let intervalId;

function startContinuousMovement(action) {
  isButtonDown = true;
  intervalId = setInterval(function () {
    currentCar.turnCar(action); // MoveCar with the specified action repeatedly
  }, 100);
}

function stopContinuousMovement() {
  isButtonDown = false;
  clearInterval(intervalId);
}

// Add click and hold event listeners to the mobile buttons
document.getElementById("left").addEventListener("click", function () {
  handleMobileButtonClick("left"); // Move left when the left button is clicked once
});

document.getElementById("right").addEventListener("click", function () {
  handleMobileButtonClick("right"); // Move right when the right button is clicked once
});

document.getElementById("left").addEventListener("mousedown", function () {
  startContinuousMovement("left"); // Start moving left when the left button is pressed
});

document.getElementById("right").addEventListener("mousedown", function () {
  startContinuousMovement("right"); // Start moving right when the right button is pressed
});

// Add event listener to stop the car when the button is released
document.addEventListener("mouseup", function () {
  if (isButtonDown) {
    stopContinuousMovement(); // Stop car movement if the button is released while it was down
  }
});


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
     turnCar(action) {
      ctx.clearRect(this.x, this.y, this.width, this.height);
      switch (action) {
          case "left": // left button pressed
              if (this.x > 15) {
                  this.x -= 10;
                  turn.play();
              }
              break;
          case "right": // right button pressed
              if (this.x < 450) {
                  this.x += 10;
                  turn.play();
              }
              break;
          // Add more cases for other actions if needed
      }
  }
  }