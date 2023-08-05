//Key Variables

let currentGame;
let currentCar;

let obstaclesFrequency = 0; // support the logic for generating obstacles
let obstacleSpeed = 3;

let isGameOver = false;
let animationFrameId; 

let background = new Image();
let backgroundY = 0;
background.src = "./images/road.png";

let scoreDisplay = document.querySelector('#yourScore')
let finalScore = document.getElementById('#scoreTwo')
let finalLevel = document.getElementById('#levelTwo')

let frameCount = 0;

let level = document.querySelector('#level')
let lastDifficultyUpdate = 0;

let modulo = 30;

let isRestarting = false; // A flag to prevent multiple restarts


//Opening Area and Start Button

const toggleButton = document.querySelector('#start-button');
const toggleOpening = document.querySelector('.opening-section');
const toggleInfo = document.querySelector('.info');
const endScreen = document.querySelector('.full-time')
const mobile = document.querySelector('.mobile-controls')

toggleOpening.style.display = '';
endScreen.style.display = 'none';
mobile.style.display = 'none';


//Game Area
const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');

myCanvas.style.display = 'none';
toggleInfo.style.display = 'none';

//Start Button
window.onload = () => {
    toggleButton.onclick = (event) => {
    event.stopPropagation();
    pauseOpeningAudio();
    drive.play();
    toggleOpening.style.display = 'none';
    myCanvas.style.display = '';
    toggleInfo.style.display = '';      
    mobile.style.display = '';
    startGame();
    };

  
    document.onkeydown = (e) => {
      let whereToGo = e.keyCode;
      currentCar.moveCar(whereToGo);
  }

  };

  

  //Main Menu Button
let mainMenuButton = document.getElementsByClassName('main-menu-button')
for (let i = 0 ; i < mainMenuButton.length; i++) {
  mainMenuButton[i].addEventListener('click',  ()=>{
    location.reload() 
  })  
}
function startGame() {
  cancelAnimationFrame(animationFrameId);
  drive.play();
  currentGame = new Game();
  ctx.drawImage(background, 0, 0, myCanvas.width, myCanvas.height); // draw background image
  // Instantiate a new Car
  currentCar = new Car();
  currentCar.drawCar();
  animationFrameId = requestAnimationFrame(updateCanvas);

  // Add touch event listeners
  if (!isGameOver) {
    addTouchListeners();
  }

  const restartButton = document.querySelector('#restart-button');
restartButton.addEventListener('click', restartGame);

function restartGame() {
  if (isRestarting) return;
  isRestarting = true;
  myCanvas.style.display = 'block';
  endScreen.style.display = 'none';
  toggleOpening.style.display = 'none';
  closing.pause();
  toggleInfo.style.display = '';
  mobile.style.display = '';
  isGameOver = false;
  obstacleSpeed = 3;
  resetScore();
  startGame();
  isRestarting = false;
  restartButton.addEventListener('click', restartGame);
}

function resetScore() {
  currentGame.score = 0;
  scoreDisplay.innerText = 0;
  currentGame.level = 1;
  level.innerText = currentGame.level;
  lastDifficultyUpdate = 0;
  modulo = 30;
}
}
    
  

  function updateCanvas() {

    if (isGameOver) return;
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); // clear canvas
    
    // Scroll the background downwards
    backgroundY += 5;
    if (backgroundY >= myCanvas.height) {
        backgroundY = 0;
    }

    // Draw the background image twice, one above the other, to cover the entire canvas
    ctx.drawImage(background, 0, backgroundY, myCanvas.width, myCanvas.height);
    ctx.drawImage(background, 0, backgroundY - myCanvas.height, myCanvas.width, myCanvas.height);

    currentCar.drawCar(); // redraw the Car at its current position
    obstaclesFrequency++;

    if (obstaclesFrequency % modulo === 1) {
        //Draw an obstacle
        let randomObstacleX = Math.floor(Math.random() * myCanvas.width);
        let randomObstacleY = -50;
        let randomObstacleWidth = 30;
        let randomObstacleHeight = 50;
        let newObstacle = new Obstacle(
            randomObstacleX, 
            randomObstacleY, 
            randomObstacleWidth, 
            randomObstacleHeight);
  
        currentGame.obstacles.push(newObstacle);
        currentGame.score++;
        scoreDisplay.innerText = currentGame.score

    }

  
    for(let i = 0; i<currentGame.obstacles.length; i++) {
        currentGame.obstacles[i].y += obstacleSpeed; 
        currentGame.obstacles[i].drawObstacle();
 
     if (detectCollision(currentGame.obstacles[i])) {
          congrats.pause();
          crash.play();
          currentCar.x = myCanvas.width/2;
          currentCar.y = myCanvas.height/1.5;
          endGame();
        }   
  
        // Logic for removing obstacles
        if (currentGame.obstacles.length > 0 && currentGame.obstacles[i].y >= 700) {
          currentGame.obstacles.splice(i, 1); // remove that obstacle from the array
        } 
      }

      if (currentGame.score >= lastDifficultyUpdate + 50 && obstacleSpeed) {
        congrats.play();
        obstacleSpeed += 0.5;
        currentGame.level++;
        lastDifficultyUpdate = currentGame.score;
        level.innerText = currentGame.level;
        console.log(currentGame.level);
      
        // Set the modulo value based on the difficulty level
        switch (currentGame.level) {
          case 1:
            modulo = 30;
            break;
          case 2:
            modulo = 25;
            break;
          case 3:
            modulo = 20;
            break;
          case 4:
            modulo = 17;
            break;
          case 5:
            modulo = 15;
            break;
          case 6:
            modulo = 13;
            break;
          case 7:
            modulo = 11;
            break;
          case 8:
            modulo = 9;
            break;
          case 9:
            modulo = 7;
            break;
          case 10:
            modulo = 5;
            break;
          case 11:
            modulo = 2;
            break;
        }
      }

      function endGame(){
        closing.play();
        isGameOver = true;
        currentCar.x = myCanvas.width/2
        currentCar.y = myCanvas.height/1.5
        toggleOpening.style.display = 'none'
        toggleInfo.style.display = 'none'
        myCanvas.style.display = 'none'
        endScreen.style.display = '';
        mobile.style.display = 'none';
        scoreTwo.innerText = currentGame.score;
        levelTwo.innerText = currentGame.level;
      }

      if (!isGameOver) {
        requestAnimationFrame(updateCanvas);
      }

  }


  function detectCollision(obstacle) {
    return ((currentCar.x < obstacle.x + obstacle.width) &&         // check left side of element 
    (currentCar.x + obstacle.width > obstacle.x) &&           // check right side
    (currentCar.y < obstacle.y + obstacle.height) &&         // check top side
    (currentCar.y + currentCar.height > obstacle.y));           // check bottom side
  }