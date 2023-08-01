//Key Variables

let currentGame;
let currentCar;

let obstaclesFrequency = 0; // support the logic for generating obstacles
let obstacleSpeed = 3;

let isGameOver = false;
let animationFrameId; 

let background = new Image();
background.src = "./images/road.png";

let scoreDisplay = document.querySelector('#yourScore')
let finalScore = document.getElementById('#scoreTwo')
let finalLevel = document.getElementById('#levelTwo')


let level = document.querySelector('#level')



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
  
    currentGame = new Game();
    ctx.drawImage(background, 0, 0,myCanvas.width,myCanvas.height); // draw background image
  
    //Instantiate a new Car
    currentCar = new Car();
    currentCar.drawCar();
    animationFrameId = requestAnimationFrame(updateCanvas);

     // Initialize the level variable when the game starts
  currentGame.level = 1;
  
  }

  function updateCanvas() {

    if (isGameOver) return;
    ctx.clearRect(0, 0, 700, 500); // clear canvas
    
    ctx.drawImage(background, 0, 0,myCanvas.width,myCanvas.height); // redraw the background
  
   currentCar.drawCar(); // redraw the Car at its current position
    obstaclesFrequency++;



    if (obstaclesFrequency % 30 === 1) {
        //Draw an obstacle
        let randomObstacleX = Math.floor(Math.random() * this.canvas.width);
        let randomObstacleY = 0;
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
          currentCar.x = myCanvas.width/2;
          currentCar.y = myCanvas.height/1.5;
          endGame();
        }
  
        // Logic for removing obstacles
        if (currentGame.obstacles.length > 0 && currentGame.obstacles[i].y >= 700) {
          currentGame.obstacles.splice(i, 1); // remove that obstacle from the array
        } 
      }

      //Logic for increasing the difficulty
      if (currentGame.score % 50 === 0 && currentGame.score !== 0 && obstacleSpeed) {
        obstacleSpeed += 0.03; // Increase the obstacle speed by 0.5
        currentGame.level = Math.floor(obstacleSpeed);
        level.innerText=currentGame.level-1
      }

        //To reset the score
      function resetScore(){
        currentGame.score = 0;
        scoreDisplay.innerText = 0;
        currentGame.level = 1;
        level.innerText = 1;
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
        levelTwo.innerText = currentGame.level;
      }

      requestAnimationFrame(updateCanvas);

  }


  function detectCollision(obstacle) {
    return ((currentCar.x < obstacle.x + obstacle.width) &&         // check left side of element 
    (currentCar.x + obstacle.width > obstacle.x) &&           // check right side
    (currentCar.y < obstacle.y + obstacle.height) &&         // check top side
    (currentCar.y + currentCar.height > obstacle.y));           // check bottom side
  }