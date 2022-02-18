const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Songs info
const songs = [
  {
    title: 'Sanam Teri Kasam',
    artist: 'Ankit Tiwari',
    coverPath: 'assets/images/cover1.jpg',
    discPath: 'assets/music/music1.mp3',
    duration: '05:14',
  },
  {
    title: 'Shayad Kabhi Na',
    artist: 'Arijit Singh',
    coverPath: 'assets/images/cover2.jpg',
    discPath: 'assets/music/music2.mp3',
    duration: '04:08',
  },
  {
    title: 'Soch Na Sake',
    artist: 'Arijit Singh',
    coverPath: 'assets/images/cover3.jpg',
    discPath: 'assets/music/music3.mp3',
    duration: '04:38',
  },
  {
    title: 'Meri Samne Wali khidki',
    artist: 'kishore kumar',
    coverPath: 'assets/images/cover4.jpg',
    discPath: 'assets/music/music4.mp3',
    duration: '2:52',
  },
  {
    title: 'Aapki aankho me',
    artist: 'kishore kumar',
    coverPath: 'assets/images/cover5.jpg',
    discPath: 'assets/music/music5.mp3',
    duration: '04:09',
  },
  {
    title: 'Zara si Dosti',
    artist: 'Arijit Singh',
    coverPath: 'assets/images/arijit.jpg',
    discPath: 'assets/music/music6.mp3',
    duration: '05:27',
  },
  {
    title: 'Abhi Mujhme kahi',
    artist: 'Sonu Nigam',
    coverPath: 'assets/images/agneepath.jpg',
    discPath: 'assets/music/music7.mp3',
    duration: '05:38',
  },
  {
    title: 'Man mera',
    artist: 'Gajendra Verma',
    coverPath: 'assets/images/gajendra.jpg',
    discPath: 'assets/music/music8.mp3',
    duration: '03:18',
  },
  {
    title: 'Daayere',
    artist: 'Arijit Singh',
    coverPath: 'assets/images/arijit.jpg',
    discPath: 'assets/music/music9.mp3',
    duration: '04:50',
  },
  {
    title: 'Girl I need You',
    artist: 'Arijit singh',
    coverPath: 'assets/images/arijit.jpg',
    discPath: 'assets/music/music10.mp3',
    duration: '04:57',
  },
  {
    title: 'Love me thoda Aur',
    artist: 'Arijit singh',
    coverPath: 'assets/images/arijit.jpg',
    discPath: 'assets/music/music11.mp3',
    duration: '04:25',
  },
  {
    title: 'Ghar more pardesiya',
    artist: 'Shreya Ghoshal',
    coverPath: 'assets/images/shreya.jpg',
    discPath: 'assets/music/music12.mp3',
    duration: '05:19',
  }
];

// Load song initially
loadSong(songs[songIndex]);

// Load the given song
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Toggle play and pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}


// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);

// Update icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}


disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Update progress bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}


// Go to previous song when previous button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}


// Go to next song when next button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));


// Go to next song
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);


// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}






