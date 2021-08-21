const   btnPrevious = document.querySelector(".previous-btn"),
        btnNext = document.querySelector(".next-btn"),
        btnPlay = document.querySelector(".play-btn"),
        songTitle = document.querySelector("#song-title"),
        sontArtist = document.querySelector("#song-artist"),
        songImage = document.querySelector("#song-image"),
        songRange = document.querySelector("#song-range");

let musics = []
let currentMusicIndex = 0;
let audio = new Audio();
audio.volume = 0.5;

// Récupération des musiques
fetch("./assets/musics.json")
    .then(response => response.json())
    .then(json => {
        musics = json.musics;
        changeMusic(0);
    });



// Event: Play Button
btnPlay.addEventListener("click", () => {
    playMusic();
    if ( audio.paused ) {
        btnPlay.children[0].src = "assets/icons/play.svg";
    }
    else{
        btnPlay.children[0].src = "assets/icons/pause.svg";
    }
});

// Event : Next Button
btnNext.addEventListener("click", () => {
    if( currentMusicIndex +1 <= musics.length - 1 ) {
        changeMusic(currentMusicIndex + 1);
    }
    else{
        changeMusic(0);
    }
});

// Event: Previous Button
btnPrevious.addEventListener("click", () => {
    if ( audio.currentTime > 1 && currentMusicIndex - 1 >= 0 ) {
        changeMusic(currentMusicIndex - 1);
    }
    else{
        audio.currentTime = 0;
    }
});

// Event: change range
songRange.addEventListener("change", () => {
    audio.currentTime = ( audio.duration * songRange.value ) / 100;
});

// Fonction to play music
const playMusic = () => {
    if ( audio.paused ) {
        audio.play();
    }
    else{
        audio.pause();
    }
}

// Fonction to change music
const changeMusic = (index) => {
    audio.src = musics[index].url;
    songImage.src = musics[index].img;
    songTitle.innerText = musics[index].name;
    sontArtist.innerText = musics[index].artist;
    playMusic();
    currentMusicIndex = index;

    if ( audio.paused ) {
        btnPlay.children[0].src = "assets/icons/play.svg";
    }
    else{
        btnPlay.children[0].src = "assets/icons/pause.svg";
    }
}

// Updating of song range and check if the song is ended
setInterval(() => {
    songRange.value = (audio.currentTime / audio.duration) * 100;

    // check if song is finished
    if ( audio.currentTime >= audio.duration ) {
        if( currentMusicIndex + 1 <= musics.length - 1 ) {
            changeMusic(currentMusicIndex + 1);
        }
        else{
            changeMusic(0);
        }
    }
}, 500);
