// Lance la musique si clique sur logo musique

var audio = new Audio('menu.mp3');
let music = document.getElementById('music')
music.addEventListener('click', () => {
    audio.play();
})

// Met la musique en pause
let no_music = document.getElementById('music_off')
no_music.addEventListener('click', () => {
    audio.pause();
})