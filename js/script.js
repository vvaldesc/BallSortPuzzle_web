
const audioFondo = () => {
    //debugger
    let audio = new Audio('./assets/audio/backgroundAudio.mp3');
    AudioContext.volume = 0.2;
    audio.play();
}




document.addEventListener("DOMContentLoaded",audioFondo)