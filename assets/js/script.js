let rondas = 0;
let contadorRondas = 0;
let puntosJugador = 0;
let puntosCPU = 0;
let empates = 0;

//pregunta por numero de rondas a jugar y valida
function iniciarJuego() {
  rondas = parseInt(prompt("¿Cuantas rondas quiere jugar?"));
  while (isNaN(rondas) || rondas <= 0) {
    rondas = parseInt(prompt("no es un numero valido"));
  }
  contadorRondas = 0;
  puntosJugador = 0;
  puntosCPU = 0;
  empates = 0;

  //limpia html
  document.getElementById("elegido").textContent = "";
  document.getElementById("eleCPU").textContent = "";
  document.getElementById("resultado").textContent = "";
  document.getElementById("juegoTerminado").textContent = "";

  //habilita los botones
  document.getElementById("piedra").disabled = false;
  document.getElementById("papel").disabled = false;
  document.getElementById("tijeras").disabled = false;
//indica que debe escoger piedra, papel o tijeras
document.getElementById("juegoTerminado").textContent = "Elija piedra, papel o tijeras";
}

function elegir(valor) {
  
  if (contadorRondas < rondas) {
    let eleccion = valor;
    let h4 = document.getElementById("elegido");
    switch (eleccion) {
      case 0:
        h4.textContent = "Tu elegiste: Piedra";
        break;
      case 1:
        h4.textContent = "Tu elegiste: Papel";
        break;
      case 2:
        h4.textContent = "Tu elegiste: Tijeras";
        break;
    }

    //genera eleccion de la CPU aleatoriamente
    let eleccionCPU = Math.floor(Math.random() * 3);
    let h4CPU = document.getElementById("eleCPU");

    switch (eleccionCPU) {
      case 0:
        h4CPU.textContent = "CPU eligio: Piedra";
        break;
      case 1:
        h4CPU.textContent = "CPU eligio: Papel";
        break;
      case 2:
        h4CPU.textContent = "CPU eligio: Tijeras";
        break;
    }

    // Compara las elecciones y muestra el resultado
    let result = comparar(eleccion, eleccionCPU);
    document.getElementById("resultado").textContent = result;

    marcador(result);

    //contador de rondas
    contadorRondas++;
    if (contadorRondas >= rondas) {
      ganador();
      deshabilitarBotones();
      // alert("el juego a terminado");
    }
  }
}
//evalua quien gana cada ronda
function comparar(eleccion, eleccionCPU) {
  if (eleccion === eleccionCPU) {
    return "Es un empate";
  } else if (
    (eleccion === 0 && eleccionCPU === 2) ||
    (eleccion === 1 && eleccionCPU === 0) ||
    (eleccion === 2 && eleccionCPU === 1)
  ) {
    return "¡Felicidades! ¡Ganaste!";
  } else {
    return "¡Oouw! Has perdido";
  }
}

function marcador(result) {
  switch (result) {
    case "¡Felicidades! ¡Ganaste!":
      puntosJugador++;
      break;
    case "¡Oouw! Has perdido":
      puntosCPU++;
      break;
    case "Es un empate":
      empates++;
      break;
  }
  document.getElementById("puntajeJugador").textContent = puntosJugador;
  document.getElementById("puntajeCPU").textContent = puntosCPU;
  document.getElementById("puntajeEmpates").textContent = empates;
}

//ganador de las rondas
function ganador() {
  if (puntosJugador > puntosCPU) {
    document.getElementById("juegoTerminado").textContent = "Juego terminado";
    document.getElementById("resultado").textContent =
      "¡Felicidades! ¡Has ganado!";
  } else if (puntosJugador < puntosCPU) {
    document.getElementById("juegoTerminado").textContent = "Juego terminado";
    document.getElementById("resultado").textContent = "¡Ouww, has perdido!";
  } else {
    document.getElementById("juegoTerminado").textContent = "Juego terminado";
    document.getElementById("resultado").textContent = "Es un empate";
  }
  //borra las elecciones de la ronda
  document.getElementById("elegido").textContent = "";
  document.getElementById("eleCPU").textContent = "";
}

//deshabilitar botones
function deshabilitarBotones() {
  document.getElementById("piedra").disabled = true;
  document.getElementById("papel").disabled = true;
  document.getElementById("tijeras").disabled = true;
}

// Evento de clic para el botón "Iniciar Juego"
document.getElementById("btnIniciar").addEventListener("click", iniciarJuego);
