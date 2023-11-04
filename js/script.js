let visor__main = document.getElementById("visor__main");
let botonInicio = visor__main.children[1];

let nivel;
let MAXniveles;
let MAXfrascos;
let MAXbolas;
let character_1;
let posAnterior;
let tiempo;
let tiempoBase=40;

let arrayFrascos = [];
let bolasFrascos = [];
let click = true;

let intervalo;

let FIN = false;

const audioFondo = () => {
    let audioFondo = new Audio('./assets/audio/musicaBackground.wav');
    audioFondo.volume = 0.1;
    audioFondo.loop = true;
    return audioFondo;
}

let audioBg=audioFondo();

const audioSacaBola = () => {
  let audio = new Audio('./assets/audio/sacarBola.wav');
  audio.volume = 0.6;
  audio.play();
}

const audioMeterBola = () => {
  let audio = new Audio('./assets/audio/meterBola.wav');
  audio.volume = 0.6;
  audio.play();
}

const audioMovimientoAtras = () => {
  let audio = new Audio('./assets/audio/movimientoFallido.wav');
  audio.volume = 0.4;
  audio.play();
}

const audioLevelUp = () => {
  let audio = new Audio('./assets/audio/lvlUp.wav');
  audio.volume = 0.5;
  audio.play();
}

const audioPerder = () => {
  let audio = new Audio('./assets/audio/juegoPerdido.mp3');
  audio.volume = 0.4;
  audio.play();
}

const audioGanar = () => {
  let audio = new Audio('./assets/audio/juegoGanado.wav');
  audio.volume = 0.4;
  audio.play();
}

function actualizarEntorno(posAnt = null, posPost = null) {
  /*let main__frascos = document.createElement("DIV");
  main__frascos.style.display="flex";*/

  //ESTAS FUNCIONES SERÁN EDITADAS SI CAMBIO EL ENTORNO GRÁFICO Y USO IMÁGENES
  //PODRIA MAEJORARLO, QUE EN VEZ DE ACTUALIZAR DOS FRASCOS ACTUALIZO SOLO LA BOLA, Y BORRO LA BOLA
  function editarEntorno(posAnt, posPost) {
    const main__frascos = document.getElementById("main__frascos");
    //frasco.style.height=(40*MAXbolas+nivel).toString()+"px";
    //frasco.style.height=(40*MAXbolas+10).toString()+"px";

    while (main__frascos.children[posAnt].children.length > 0) {
      main__frascos.children[posAnt].removeChild(
        main__frascos.children[posAnt].firstChild
      );
    }

    for (let index = 0; index < arrayFrascos[posAnt].length; index++) {
      let bola = document.createElement("DIV");
      bola.classList.add("pixel-ball");
      bola.classList.add("color" + arrayFrascos[posAnt][index]);
      main__frascos.children[posAnt].append(bola);
    }

    if (posAnt != posPost) {
      while (main__frascos.children[posPost].children.length > 0) {
        main__frascos.children[posPost].removeChild(
          main__frascos.children[posPost].firstChild
        );
      }

      for (let index = 0; index < arrayFrascos[posPost].length; index++) {
        let bola = document.createElement("DIV");
        bola.classList.add("pixel-ball");
        bola.classList.add("color" + arrayFrascos[posPost][index]);
        main__frascos.children[posPost].append(bola);
      }
    }
  }

  function generarEntorno() {
    let main__frascos = document.createElement("DIV");
    main__frascos.style.display = "flex";
    main__frascos.style.justifyContent = "center";
    main__frascos.style.position="relative";
    main__frascos.style.top = "20px";
    main__frascos.id = "main__frascos";

    let frascos = document.createDocumentFragment();
    for (let index = 0; index < arrayFrascos.length; index++) {
      let frasco = document.createElement("DIV");
      frasco.classList.add("visor__frasco");
      frasco.style.height=(40*MAXbolas+15).toString()+"px";
      frasco.id = "frasco" + index;
      let bolas = document.createDocumentFragment();

      //Añado un listener a cada frasco
      frasco.addEventListener("click", accionFrasco);

      for (let index2 = 0; index2 < arrayFrascos[index].length; index2++) {
        let bola = document.createElement("DIV");
        bola.classList.add("pixel-ball");
        bola.classList.add("color" + arrayFrascos[index][index2]);
        bolas.append(bola);
      }
      frasco.append(bolas);
      frascos.append(frasco);
      main__frascos.append(frascos);
      visor__main.append(main__frascos);
      //visor__main.append(frascos);
    }
  }

  if (posAnt === null && posPost === null) {
    generarEntorno();
  } else {
    editarEntorno(posAnt, posPost);
  }
}

const iniciaEntorno = () => {

  if (!audioBg.paused) {
    audioBg.pause();
    audioBg.currentTime = 0;
  }

  audioBg.play();

  if (arrayFrascos.length!=0) {
    arrayFrascos=[];
  }
  if (bolasFrascos.length!=0) {
    bolasFrascos=[];
  }

  //inicioTempo();
  character_1 = visor__main.querySelector("#character_1");
  character_1.remove();

  let main__section=document.getElementById("main__section");
  main__section.remove();

  textoTitulo = visor__main.querySelector("#visor__div__texto");
  if (textoTitulo!=null) {
    textoTitulo.remove();
  }

  tiempo = 40;
  nivel = 0;
  MAXniveles = 2;
  MAXfrascos = 4;
  MAXbolas = 4;

  tableroRand();
  actualizarEntorno();
  inicioTempo();
  cieloColor(nivel);


};

function tableroRand() {
  //Siempre dejo dos frascos vacíos para poder jugar
  for (let index = 0; index < MAXfrascos; index++) {
    bolasFrascos = [];
    arrayFrascos.push(bolasFrascos);
    if (index < MAXfrascos - 2) {
      for (let index2 = 0; index2 < MAXbolas; index2++) {
        bolasFrascos.push(index);
      }
    }
  }

  do {
    //Barajo las bolas tantas veces como bolas por frascos haya
    for (let index = 0; index < MAXfrascos * (MAXfrascos-2); index++) {
      const randomFrasco1 = Math.floor(Math.random() * (MAXfrascos - 2));
      const randomBola1 = Math.floor(Math.random() * MAXbolas);
      const randomFrasco2 = Math.floor(Math.random() * (MAXfrascos - 2));
      const randomBola2 = Math.floor(Math.random() * MAXbolas);
  
      let aux = arrayFrascos[randomFrasco1][randomBola1];
      arrayFrascos[randomFrasco1][randomBola1] =
        arrayFrascos[randomFrasco2][randomBola2];
      arrayFrascos[randomFrasco2][randomBola2] = aux;
    }
  }  // si invierto la comprobación, el tablero comienza ordenado 
   while (recorridoGanado()); // Comprueblo que el tablero generado no se genera comienza ordenado


}

const inicioTempo = () => {


  const visorHeader__div__temporizador=document.getElementById("visorHeader__div__temporizador")
  visorHeader__div__temporizador.classList.add("temporizadorOn")

  let minutos = Math.floor(tiempo / 60).toString();
  let segundos = Math.floor(tiempo % 60).toString();
  visorHeader__div__temporizador.children[1].textContent =
    minutos.padStart(2, "0") + ":" + segundos.padStart(2, "0");

  intervalo = setInterval(() => {
    tiempo--;

    let minutos = Math.floor(tiempo / 60).toString();
    let segundos = Math.floor(tiempo % 60).toString();

    visorHeader__div__temporizador.children[1].textContent =
      minutos.padStart(2, "0") + ":" + segundos.padStart(2, "0");

    if (tiempo == 0) {
      debugger;
      ganado=false;
      audioPerder();
      borraEntorno();
      inicioFin(ganado);
    }

  }, 1000);
  
};

function cargaPersonaje() {
  let character_1 = document.createElement("IMG");
  character_1.style.position = "absolute";
  character_1.style.zIndex = "30";
  character_1.style.height = "400px";
  character_1.style.width = "400px";
  character_1.style.left = "650px";
  character_1.style.top = "90px";
  character_1.id = "character_1";
  character_1.src = "../assets/png/character_2.png";
  return character_1;
}

const inicioIntro = () => {



  const hablaPersonaje = () => {
    for (let index = 0; index < 10; index++) {
      character_1.src = "../assets/png/character_1.png";
      setTimeout(100);
      character_1.src = "../assets/png/character_2.png";
    }
  };

  function secuenciaIntro() {
    createTextoTitulo("LAS AVENTURAS DE THEO","BallSortPuzzle");

    //primer timeOu
    setTimeout(() => {
      visor__div__texto.remove();
      createTextoTitulo(null,"Ayuda a Theo a encontrar los colores");
      tituloPequeño.style.top="160px";


      setTimeout(() => {
        visor__div__texto.remove();
        character_1=cargaPersonaje();
        visor__main.append(character_1);
        creaBotonStart();
        section__a.addEventListener("click", iniciaEntorno);
      }, 4000);
    }, 4000);
  }

  //hablaPersonaje();
  secuenciaIntro();

};

function createTextoTitulo(textoGrande=null,textoPequeño=null) {
  visor__div__texto = document.createElement("DIV");
  visor__div__texto.id="visor__div__texto";

  tituloGrande = document.createElement("H1");
  tituloGrande.textContent = textoGrande;
  tituloGrande.classList.add("letraTituloGrande");

  if (textoPequeño) {
    tituloPequeño = document.createElement("H2");
    tituloPequeño.textContent = textoPequeño;
    tituloPequeño.classList.add("letraTituloPeq");
  }

  visor__div__texto.append(tituloGrande);
  if (textoPequeño) {
    visor__div__texto.append(tituloPequeño);
  }
  visor__main.append(visor__div__texto);
}

const ganar = () => {

  let ganado = recorridoGanado();
  console.log("ganar" + ganado);

  //Ahora deberia reiniciarse el TAD y el entorno y subir el nivel
  //Solo hay tres niveles
  if (ganado) {
    nivel++;
    arrayFrascos = [];
    bolasFrascos = [];
    if (nivel==MAXniveles) {


      audioGanar();
      borraEntorno();
      tiempo = 0;
      cieloColor(2);
      inicioFin(ganado);
    } else{


      audioLevelUp();
      MAXbolas++;
      MAXfrascos++;
      borraEntorno();
      tableroRand();
      actualizarEntorno();
      nivel++;
      cieloColor(nivel);
      tiempo = tiempoBase + 10 * nivel; //cada nivel aumenta 10 segundos
    }
    




  }
};

const cieloColor = (nivel) => {

  if (nivel>2) {
    nivel=2;
  }

  const cielo=visor__main.parentNode;
  const bg = cielo.firstChild.nextSibling;
  switch (nivel) {
    case 0:
      cielo.classList.remove("cieloInicial")
      cielo.classList.add("cieloGris");

      bg.classList.add("fondoGris1");
    break;
    case 1:
      cielo.classList.remove("cieloGris");
      cielo.classList.add("cieloNaranja");

      bg.classList.remove("fondoGris1");
      bg.classList.add("fondoGris2");
    break;
    case 2:
      cielo.classList.remove("cieloNaranja");
      cielo.classList.add("cieloAzul");

      bg.classList.remove("fondoGris2");
      bg.classList.add("fondoGris3");
    break;
  default:
    break;
  }

}

const borraEntorno = () => {
  const main__frascos = document.getElementById("main__frascos");

  if (main__frascos!=null) {
    main__frascos.remove();
  }
};

const accionFrasco = (e) => {
  if (e.target.nodeName === "DIV") {
    console.log(e.target.id);

    if (e.target.classList[0].startsWith("pixel")) {
      if (click) {
        audioSacaBola();
        posAnterior = parseInt(e.target.parentNode.id.slice(6));
        e.target.parentNode.firstChild.style.top = "-75px";
        click = false;
      } else {
        posicionMeter = parseInt(e.target.parentNode.id.slice(6));
        console.log("posicionMeter: " + posicionMeter);

        let valorTop1 = arrayFrascos[posAnterior][0];
        let valorTop2 = arrayFrascos[posicionMeter][0];
        console.log("valores" + valorTop1 + valorTop2);

        if (arrayFrascos[posicionMeter].length > 0) {
          if (posAnterior == posicionMeter || valorTop1 != valorTop2) {
            audioMovimientoAtras();
            actualizarEntorno(posAnterior, posicionMeter);
            click = true;
          }
        }
        if (
          !click &&
          posAnterior != posicionMeter &&
          posicionMeter >= 0 &&
          posicionMeter < arrayFrascos.length
        ) {
          if (arrayFrascos[posicionMeter].length < MAXbolas) {
            arrayFrascos[posicionMeter].unshift(
              arrayFrascos[posAnterior].shift()
            );
            audioMeterBola();
            actualizarEntorno(posAnterior, posicionMeter);
            click = true;
          }
        }
        /*else{
        posicionMeter=parseInt(e.target.parentNode.id.slice(6));
        const main__frascos=document.getElementById("main__frascos");
        console.log(main__frascos)
        main__frascos.children[posicionMeter].firstChild.style.top="0px";
        click=true;
      }*/
        ganar();
      }
    }


    if (e.target.id.startsWith("frasco")) {
      console.log(click);
      let posicionMeter;
      console.log(e.target.id.slice(6));
      if (click) {
        console.log("sacar");
        audioSacaBola();
        //bolaCambio = e.target.parentNode.firstChild.classList[1].slice(5);
        posAnterior = parseInt(e.target.id.slice(6));
        e.target.firstChild.style.top = "-75px";
        click = false;
      } else {
        posicionMeter = parseInt(e.target.id.slice(6));
        console.log("posicionMeter: " + posicionMeter);

        let valorTop1 = arrayFrascos[posAnterior][0];
        let valorTop2 = arrayFrascos[posicionMeter][0];
        console.log("valores" + valorTop1 + valorTop2);

        if (arrayFrascos[posicionMeter].length > 0) {
          if (posAnterior == posicionMeter || valorTop1 != valorTop2) {
            audioMovimientoAtras();
            actualizarEntorno(posAnterior, posicionMeter);
            click = true;
          }
        }

        if (
          !click &&
          posAnterior != posicionMeter &&
          posicionMeter >= 0 &&
          posicionMeter < arrayFrascos.length
        ) {
          if (arrayFrascos[posicionMeter].length < MAXbolas) {
            arrayFrascos[posicionMeter].unshift(
              arrayFrascos[posAnterior].shift()
            );
            audioMeterBola();
            actualizarEntorno(posAnterior, posicionMeter);
            click = true;
          }
        } else {
          const main__frascos = document.getElementById("main__frascos");
          console.log(main__frascos);

          click = true;
        }
        ganar();
      }
    }
  }
};

function recorridoGanado() {
  let ganado = true;
  let contadorLlenas = 0;

  for (let index = 0; index < arrayFrascos.length; index++) {
    if (arrayFrascos[index].length == MAXbolas) {
      contadorLlenas++;
      let index2 = 1;
      let bolaComprobar = arrayFrascos[index][0];
      while (ganado && index2 < arrayFrascos[index].length) {
        if (bolaComprobar != arrayFrascos[index][index2]) {
          ganado = false;
        }
        index2++;
      }
    }
  }
  if (contadorLlenas != MAXfrascos - 2) {
    ganado = false;
  }
  return ganado;
}

function inicioFin(ganado) {
  debugger

  apagarTemporizador();

  if (ganado) {
    console.log("Ganado");
    createTextoTitulo("HAS GANADO","AYUDASTE A THEO A ENCONTRAR TODOS LOS COLORES");
  }else{
    console.log("No ganado");
    createTextoTitulo("FIN","HAS PERDIDO");
  }

  setTimeout(() => {
    debugger;

    visor__div__texto.remove();

    if (ganado) {
      createTextoTitulo("INTENTALO DE NUEVO","BATE TU RECORD!");
    }else{
      createTextoTitulo("INTENTALO DE NUEVO","PUEDES CONSEGUIRLO!");
    }

  
      character_1=cargaPersonaje();
      visor__main.append(character_1);
      creaBotonStart();
      section__a.addEventListener("click", iniciaEntorno);
  


  }, 4000);


}

function apagarTemporizador() {
  const tablero = visor__main.previousElementSibling.querySelector('#visorHeader__div__temporizador');
  tablero.children[1].textContent = "00:00";
  clearInterval(intervalo);
}

function creaBotonStart() {

  main__section = document.createElement("SECTION");
  section__a = document.createElement("A");
  a__img = document.createElement("IMG");

  main__section.classList.add("main__boton");
  main__section.id="main__section";
  a__img.classList.add("a__boton");
  a__img.src = "assets/png/—Pngtree—start button in pixel art_7949383 (1).png";
  section__a.href = "#";
  a__img.alt = "Imagen_start";

  main__section.append(section__a);
  section__a.append(a__img);
  visor__main.appendChild(main__section);
}

document.addEventListener("DOMContentLoaded", inicioIntro);
