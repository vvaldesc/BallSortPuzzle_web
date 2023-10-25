let visor__main = document.getElementById("visor__main");
let botonInicio = visor__main.children[1];

let MAXniveles = 3;
let MAXfrascos = 5;
let MAXbolas = 7;
let segundosIniciales = 60;
let character_1;
let pagina = 0;
let posAnterior;

let arrayFrascos = [];
let bolasFrascos = [];
//let bolaCambio;
let click = true;

let FIN = false;

/*const audioFondo = () => {
    //debugger
    let audio = new Audio('./assets/audio/backgroundAudio.mp3');
    audio.volume = 0.2;
    audio.play();
}*/

function actualizarEntorno(posAnt = null, posPost = null) {
  /*let main__frascos = document.createElement("DIV");
  main__frascos.style.display="flex";*/

  //PODRIA MAEJORARLO, QUE EN VEZ DE ACTUALIZAR DOS FRASCOS ACTUALIZO SOLO LA BOLA, Y BORRO LA BOLA
  function editarEntorno(posAnt, posPost) {
    const main__frascos = document.getElementById("main__frascos");

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
    //debugger

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
    main__frascos.id = "main__frascos";

    let frascos = document.createDocumentFragment();
    for (let index = 0; index < arrayFrascos.length; index++) {
      let frasco = document.createElement("DIV");
      frasco.classList.add("visor__frasco");
      //debugger
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

const iniciaEntorno = (e) => {
  //inicioTempo();
  character_1 = visor__main.children[2];
  character_1.style.display = "none";

  tableroRand();
  actualizarEntorno();
  inicioTempo();

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

    for (let index = 0; index < 200; index++) {
      const randomFrasco1 = Math.floor(Math.random() * (MAXfrascos - 2));
      const randomBola1 = Math.floor(Math.random() * MAXbolas);
      const randomFrasco2 = Math.floor(Math.random() * (MAXfrascos - 2));
      const randomBola2 = Math.floor(Math.random() * MAXbolas);

      let aux = arrayFrascos[randomFrasco1][randomBola1];
      arrayFrascos[randomFrasco1][randomBola1] =
        arrayFrascos[randomFrasco2][randomBola2];
      arrayFrascos[randomFrasco2][randomBola2] = aux;
    }
  }
};

const inicioTempo = () => {
  let tiempo = 60;

  let minutos = Math.floor(tiempo / 60).toString();
  let segundos = Math.floor(tiempo % 60).toString();
  visor__main.previousElementSibling.children[1].textContent =
    minutos.padStart(2, "0") + ":" + segundos.padStart(2, "0");

  const intervalo = setInterval(() => {
    tiempo--;

    let minutos = Math.floor(tiempo / 60).toString();
    let segundos = Math.floor(tiempo % 60).toString();
    visor__main.previousElementSibling.children[1].textContent =
      minutos.padStart(2, "0") + ":" + segundos.padStart(2, "0");

    if (tiempo == 0) {
      clearInterval(intervalo);
      FIN = true;
    }
  }, 1000);
};

const inicioIntro = () => {
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

  const hablaPersonaje = () => {
    for (let index = 0; index < 10; index++) {
      character_1.src = "../assets/png/character_1.png";
      setTimeout(100);
      character_1.src = "../assets/png/character_2.png";
    }
  };

  if (pagina == 0) {
    character_1 = cargaPersonaje();
    //bocadillo = cargaBocadillo();
    visor__main.append(character_1);
  }

  hablaPersonaje();

  pagina++;
};

const ganar = () => {
  debugger;
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

    index++;
  }
  if (contadorLlenas != MAXfrascos - 2) {
    ganado = false;
  }
  console.log("ganar" + ganado);
};

const accionFrasco = (e) => {
  //debugger;
  if (e.target.nodeName === "DIV") {
    console.log(e.target.id);
    if (e.target.classList[0].startsWith("pixel")) {
      if (click) {
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
          if (posAnterior == posicionMeter || valorTop1 == valorTop2) {
            actualizarEntorno(posAnterior, posicionMeter);
            click = true;
          }
        }
        if (
          posAnterior != posicionMeter &&
          posicionMeter >= 0 &&
          posicionMeter < arrayFrascos.length
        ) {
          if (arrayFrascos[posicionMeter].length < MAXbolas) {
            arrayFrascos[posicionMeter].unshift(
              arrayFrascos[posAnterior].shift()
            );
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
          if (posAnterior == posicionMeter || valorTop1 == valorTop2) {
            actualizarEntorno(posAnterior, posicionMeter);
            click = true;
          }
        }

        if (
          posAnterior != posicionMeter &&
          posicionMeter >= 0 &&
          posicionMeter < arrayFrascos.length
        ) {
          if (arrayFrascos[posicionMeter].length < MAXbolas) {
            arrayFrascos[posicionMeter].unshift(
              arrayFrascos[posAnterior].shift()
            );

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
document.addEventListener("DOMContentLoaded", inicioIntro);
botonInicio.addEventListener("click", iniciaEntorno);
