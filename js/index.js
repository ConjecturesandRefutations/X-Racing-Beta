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