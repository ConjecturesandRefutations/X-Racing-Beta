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
let difficultyLevel = 1;
let lastDifficultyUpdate = 0;

let modulo = 30;

//Opening Area and Start Button

const toggleButton = document.querySelector('#start-button');
const toggleOpening = document.querySelector('.opening-section');
const toggleInfo = document.querySelector('.info');
const endScreen = document.querySelector('.full-time')

toggleOpening.style.display = '';
endScreen.style.display = 'none';


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

  //Main Menu Button
let mainMenuButton = document.getElementsByClassName('main-menu-button')
for (let i = 0 ; i < mainMenuButton.length; i++) {
  mainMenuButton[i].addEventListener('click',  ()=>{
    location.reload() 
  })  
}

  function startGame() {

    drive.play();

    currentGame = new Game();
    ctx.drawImage(background, 0, 0,myCanvas.width,myCanvas.height); // draw background image
  
    //Instantiate a new Car
    currentCar = new Car();
    currentCar.drawCar();
    animationFrameId = requestAnimationFrame(updateCanvas);
  
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
        obstacleSpeed += 0.045;
        difficultyLevel++;
        lastDifficultyUpdate = currentGame.score;
        level.innerText = difficultyLevel;
        console.log(difficultyLevel);

        if (currentGame.score % 50 === 0 && currentGame.score !== 0 && obstacleSpeed) {
            if (currentGame.score % 1100 === 0) {
                modulo = 2;
            } else if (currentGame.score % 1000 === 0) {
                modulo = 3;
            } else if (currentGame.score % 900 === 0) {
                modulo = 4;
            } else if (currentGame.score % 800 === 0) {
                modulo = 5;
            } else if (currentGame.score % 700 === 0) {
                modulo = 6;
            } else if (currentGame.score % 600 === 0) {
                modulo = 8;
            } else if (currentGame.score % 500 === 0) {
                modulo = 10;
            } else if (currentGame.score % 400 === 0) {
                modulo = 13;
            } else if (currentGame.score % 300 === 0) {
                modulo = 15;
            } else if (currentGame.score % 200 === 0) {
                modulo = 17;
            } else if (currentGame.score % 100 === 0) {
                modulo = 20;
            } else if (currentGame.score % 50 === 0) {
                modulo = 25;
            }
        }
    }
        //To reset the score
      function resetScore(){
        currentGame.score = 0;
        scoreDisplay.innerText = 0;
        difficultyLevel = 1;
        level.innerText = difficultyLevel;
      }

      //Restart Button
      let restartButton = document.getElementsByClassName('try-again-button')
      for (let i = 0 ; i < restartButton.length; i++) {
      restartButton[i].addEventListener('click',  ()=>{
      cancelAnimationFrame(animationFrameId);
      endScreen.style.display = 'none';
      toggleOpening.style.display = 'none';
      myCanvas.style.display = 'block';
      toggleInfo.style.display = '' ;
      isGameOver = false;
      obstacleSpeed = 3;
      resetScore();
      startGame();
      }) 
} 



      function endGame(){
        isGameOver = true;
        currentCar.x = myCanvas.width/2
        currentCar.y = myCanvas.height/1.5
        toggleOpening.style.display = 'none'
        toggleInfo.style.display = 'none'
        myCanvas.style.display = 'none'
        endScreen.style.display = ''
        scoreTwo.innerText = currentGame.score;
        levelTwo.innerText = difficultyLevel;
        modulo = 30;
      }

      requestAnimationFrame(updateCanvas);

  }


  function detectCollision(obstacle) {
    return ((currentCar.x < obstacle.x + obstacle.width) &&         // check left side of element 
    (currentCar.x + obstacle.width > obstacle.x) &&           // check right side
    (currentCar.y < obstacle.y + obstacle.height) &&         // check top side
    (currentCar.y + currentCar.height > obstacle.y));           // check bottom side
  }