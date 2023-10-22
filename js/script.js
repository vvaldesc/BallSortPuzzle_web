let visor__main=document.getElementById("visor__main")
let MAXfrascos=6;
let MAXbolas=7;
let segundosIniciales=60;




/*const audioFondo = () => {
    //debugger
    let audio = new Audio('./assets/audio/backgroundAudio.mp3');
    audio.volume = 0.2;
    audio.play();
}*/


//tiene que haber maxbolas de cada color
const iniciaEntorno = (e) => {


let frascos=document.createDocumentFragment();

    for (let index = 0; index < MAXfrascos; index++) {
        let frasco=document.createElement("DIV")
        frasco.classList.add("visor__frasco")
        let bolas=document.createDocumentFragment();

        for (let index = 0; index < MAXbolas; index++) {
            let bola=document.createElement("DIV")
            bola.classList.add("pixel-ball")
            bola.classList.add("color"+Math.floor(Math.random()*MAXfrascos))
            bolas.append(bola)

        }
        frasco.append(bolas)
        frascos.append(frasco)

    }
    visor__main.append(frascos)

}


visor__main.addEventListener("click",iniciaEntorno)
//document.addEventListener("DOMContentLoaded",audioFondo)