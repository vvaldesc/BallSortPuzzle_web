let visor__main=document.getElementById("visor__main")
let botonInicio=visor__main.children[1];

let MAXniveles=3;
let MAXfrascos=6;
let MAXbolas=7;
let segundosIniciales=60;
let character_1;

let FIN=false;


/*const audioFondo = () => {
    //debugger
    let audio = new Audio('./assets/audio/backgroundAudio.mp3');
    audio.volume = 0.2;
    audio.play();
}*/


//tiene que haber maxbolas de cada color
const iniciaEntorno = (e) => {

//inicioTempo();
debugger
character_1=visor__main.getElementById("character_1");
character_1.style.display="none";

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

const inicioTempo = () => {
    //debugger
    let tiempo=61;

    let minutos=Math.floor(tiempo/60).toString();
    let segundos=Math.floor(tiempo%60).toString();
    visor__main.previousElementSibling.children[1].textContent=minutos.padStart(2, "0")+":"+segundos.padStart(2,"0");


    const intervalo=setInterval(()=>{
        tiempo--;

        let minutos=Math.floor(tiempo/60).toString();
        let segundos=Math.floor(tiempo%60).toString();
        visor__main.previousElementSibling.children[1].textContent=minutos.padStart(2,"0")+":"+segundos.padStart(2,"0");

        if (tiempo==0) {
            clearInterval(intervalo);
            FIN=true;
        }
    },1000);
}

const inicioIntro = () => {
    
    function cargaPersonaje() {
        let character_1 = document.createElement("IMG");
        character_1.style.position = "absolute";
        character_1.style.zIndex = "30";
        character_1.style.height = "400px";
        character_1.style.width = "400px";
        character_1.style.left = "650px";
        character_1.style.top = "90px";
        character_1.id="character_1";
        character_1.src = "../assets/png/character_1.png";
        return character_1;
    }

    const hablaPersonaje = () => {
        for (let index = 0; index < 3; index++) {
            const intervalo=setInterval(()=>{
                character_1 = "../assets/png/character_2.png";
            },300);
        }    
    }

    character_1 = cargaPersonaje();
    visor__main.append(character_1);
    
}


    //audioFondo(); audio
    //inicioIntro();  //intro

    //Bucle niveles
    //for (let index = 0; index < MAXniveles; index++) {
        //inicioControles();
        //iniciaEntorno();
        //inicioTempo();
    //}

    //final
    //inicioFIN();


//visor__main.addEventListener("click",iniciaEntorno)
document.addEventListener("DOMContentLoaded",inicioIntro)
botonInicio.addEventListener("click",iniciaEntorno);
