//Key Variables

let currentGame;
let currentCar;

let obstaclesFrequency = 0; // support the logic for generating obstacles

let background = new Image();
background.src = "./images/road.png";

//Opening Area and Start Button

const toggleButton = document.querySelector('#start-button');
const toggleOpening = document.querySelector('.opening-section');
toggleOpening.style.display = '';
toggleInfo = document.querySelector('.info');


//Game Area
const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');

myCanvas.style.display = 'none';
toggleInfo.style.display = 'none';

//Start Button

window.onload = () => {
    toggleButton.onclick = () => {
    toggleOpening.style.display = 'none';
    myCanvas.style.display = '';
    toggleInfo.style.display = '';      
    startGame();
    };
  
    document.onkeydown = (e) => {
      let whereToGo = e.keyCode;
      currentCar.moveCar(whereToGo);
  }
  };

  function startGame() {
  
    currentGame = new Game();
    ctx.drawImage(background, 0, 0,myCanvas.width,myCanvas.height); // draw background image
  
    //Instantiate a new Car
    currentCar = new Car();
    currentCar.drawCar();
    updateCanvas();// keeping track of the updates as the game unfolds
  
  }

  function updateCanvas() {
    ctx.clearRect(0, 0, 700, 500); // clear canvas
    ctx.drawImage(background, 0, 0,myCanvas.width,myCanvas.height); // redraw the background
  
   currentCar.drawCar(); // redraw the Car at its current position
    obstaclesFrequency++;

    if (obstaclesFrequency % 60 === 1) {
        //Draw an obstacle
        let randomObstacleX = Math.floor(Math.random() * 500);
        let randomObstacleY = 0;
        let randomObstacleWidth = 30;
        let randomObstacleHeight = 50;
        let newObstacle = new Obstacle(
            randomObstacleX, 
            randomObstacleY, 
            randomObstacleWidth, 
            randomObstacleHeight);
  
        currentGame.obstacles.push(newObstacle);
    }
  
  
    for(let i = 0; i<currentGame.obstacles.length; i++) {
        currentGame.obstacles[i].y += 3; 
        currentGame.obstacles[i].drawObstacle();
  
        // Logic for removing obstacles
        if (currentGame.obstacles.length > 0 && currentGame.obstacles[i].y >= 700) {
          currentGame.obstacles.splice(i, 1); // remove that obstacle from the array
        } 
      }

      requestAnimationFrame(updateCanvas);

  }
  

      
