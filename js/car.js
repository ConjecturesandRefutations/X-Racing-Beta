let currentColor = 'blue';
let leftArrowPressed = false;
let rightArrowPressed = false;

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

function addMobileEventListeners() {
  // Event listeners for left and right buttons on mobile
  document.getElementById("left").addEventListener("click", function() {
      moveCar("left"); // MoveCar with "left" action
  });

  document.getElementById("right").addEventListener("click", function() {
      moveCar("right"); // MoveCar with "right" action
  });
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