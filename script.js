// Récupération des différents éléments
const currTrack = document.querySelector("#audio");
const trackArt = document.querySelector(".track-art");
const trackName = document.querySelector(".track-name");
const trackArtist = document.querySelector(".track-artist");

const playpauseBtn = document.querySelector(".playpause-track");
const nextBtn = document.querySelector(".next-track");
const prevBtn = document.querySelector(".prev-track");

const seekSlider = document.querySelector(".seek__slider");
const volumeSlider = document.querySelector(".volume__slider");
const currTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-duration");
const wave = document.querySelector("#wave");

// Création des variables
let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// Création de la playlist
const playlist = [
  {
    img: "img/Dua_Lipa_Physical.jpg",
    name: "Physical",
    artist: "Dua Lipa",
    music: "music/Dua_Lipa_Physical.mp3",
  },
  {
    img: "img/Vitaa_Slimane.jpg",
    name: "Ca va ça vient",
    artist: "Vitaa et Slimane",
    music: "music/vitaa-Slimane Ca va ca vient.mp3",
  },
  {
    img: "img/stay.png",
    name: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    music: "music/stay.mp3",
  },
  {
    img: "img/faded.png",
    name: "Faded",
    artist: "Alan Walker",
    music: "music/Faded.mp3",
  },
];

// Fonction loadTrack ayant pour paramètre trackIndex permettant le chargement de la piste
const loadTrack = (trackIndex) => {
  clearInterval(updateTimer);
  //Appel de la fonction reset
  reset();

  currTrack.src = playlist[trackIndex].music;
  currTrack.load();

  trackArt.style.backgroundImage = "url(" + playlist[trackIndex].img + ")";
  trackName.textContent = playlist[trackIndex].name;
  trackArtist.textContent = playlist[trackIndex].artist;

  updateTimer = setInterval(setUpdate, 1000);
};

// Appel de le fonction loadTrack
loadTrack(trackIndex);

// Fonction playTrack pour jouer une piste
const playTrack = () => {
  currTrack.play();
  isPlaying = true;
  trackArt.classList.add("rotate");
  wave.classList.add("loader");
  playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
};

// Fonction pauseTrack pour mettre en pause une piste
const pauseTrack = () => {
  currTrack.pause();
  isPlaying = false;
  trackArt.classList.remove("rotate");
  wave.classList.remove("loader");
  playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
};

// Fonction playPauseTrack qui va permettre de jouer ou mettre en pause une piste
const playPauseTrack = () => {
  if (isPlaying) {
    // Appel de la fonction pauseTrack
    pauseTrack();
  } else {
    // Appel de la fonction playTrack
    playTrack();
  }
};

// Fonction nextTrack qui va permettre de passer à la piste suivante
function nextTrack() {
  if (trackIndex < playlist.length - 1) {
    trackIndex++;
  } else {
    trackIndex = 0;
  }
  // Appel de la fonction loadTrack
  loadTrack(trackIndex);
  // Appel de la fonction playTrack
  playTrack();
}

// Fonction prevTrack pour revenir à la piste précédente
const prevTrack = () => {
  if (trackIndex > 0) {
    trackIndex--;
  } else {
    trackIndex = playlist.length - 1;
  }
  // Appel de la fonction loadTrack
  loadTrack(trackIndex);
  // Appel de la fonction playTrack
  playTrack();
};

// Fonction qui va permettre de régler le volume
const setVolume = () => {
  currTrack.volume = volumeSlider.value / 100;
};

// Fonction seekTo
const seekTo = () => {
  let seekto = currTrack.duration * (seekSlider.value / 100);
  currTrack.currentTime = seekto;
};

// Fonction setUpdate pour régler la duréé de la piste
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(currTrack.duration)) {
    seekPosition = currTrack.currentTime * (100 / currTrack.duration);
    seekSlider.value = seekPosition;

    let currentMinutes = Math.floor(currTrack.currentTime / 60);
    let currentSeconds = Math.floor(
      currTrack.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(currTrack.duration / 60);
    let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    currTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Fonction reset pour la remise à zéro de la durée
function reset() {
  currTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
}

// Ecoute des événements
playpauseBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
volumeSlider.addEventListener("change", setVolume);
seekSlider.addEventListener("change", seekTo);
currTrack.addEventListener("ended", nextTrack);
