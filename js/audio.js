let crash = new Audio('./audio/crash.mp3')

let drive = new Audio('./audio/drive.mp3')

let turn = new Audio('./audio/turn.mp3')

let congrats = new Audio('./audio/congrats.mp3')

let opening = new Audio('./audio/opening.mp3')

let closing = new Audio('./audio/closing.mp3')

// Function to start playing the opening audio

let openingAudioPlaying = false;

// Function to start playing the opening audio
function playOpeningAudio() {
  opening.play()
    .then(() => {
      openingAudioPlaying = true;
    })
    .catch((error) => {
      console.error('Error playing opening audio:', error);
      openingAudioPlaying = false;
    });
}

// Function to pause the opening audio
function pauseOpeningAudio() {
  opening.pause();
  openingAudioPlaying = false;
}


// Add a simple interaction event to play/pause the opening audio when the user clicks
document.addEventListener('click', () => {
  if (openingAudioPlaying) {
    pauseOpeningAudio();
  } else {
    playOpeningAudio();
  }
});