let crash = new Audio('./audio/crash.mp3');

let drive = new Audio('./audio/drive.mp3');

let turn = new Audio('./audio/turn.mp3');

let congrats = new Audio('./audio/congrats.mp3');

let opening = new Audio('./audio/opening.mp3');

let closing = new Audio('./audio/closing.mp3');

let yummy = new Audio('./audio/yummy.mp3');

let skull = new Audio('./audio/skull.mp3');

document.addEventListener("DOMContentLoaded", function () {
  let opening = new Audio('./audio/opening.mp3');
  let openingAudioPlaying = false;

  // Function to start playing the opening audio
  function playOpeningAudio() {
    opening.play()
      .then(() => {
        openingAudioPlaying = true;
        // Update the class of the volume icon
        const volumeIcon = document.getElementById('volume-icon');
        volumeIcon.classList.remove('fa', 'fa-volume-mute');
        volumeIcon.classList.add('fa', 'fa-volume-up');
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
    // Update the class of the volume icon
    const volumeIcon = document.getElementById('volume-icon');
    volumeIcon.classList.remove('fa', 'fa-volume-up');
    volumeIcon.classList.add('fa', 'fa-volume-mute');
  }

  const openingAudio = document.querySelector('.play-music');

  // Add a click event listener to the opening audio element
  openingAudio.addEventListener('click', () => {
    if (openingAudioPlaying) {
      pauseOpeningAudio();
    } else {
      playOpeningAudio();
    }
  });
});
