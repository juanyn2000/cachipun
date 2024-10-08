let rondas = 0;
let contadorRondas = 0;
let puntosJugador = 0;
let puntosCPU = 0;
let empates = 0;

//pregunta por numero de rondas a jugar y valida

function iniciarJuego() {
  console.log("inicia el juego");
  let rondasInput = document.getElementById("typeNumber");
  console.log(typeNumber);
  rondas = parseInt(rondasInput.value);

  if (isNaN(rondas) || rondas <= 0 || rondas > 10) {
    console.log("alerta");
    alert(
      "No es un número válido. Por favor, ingrese un número válido de rondas."
    );
    return;
  }
  // Cierr el modal al iniciar el juego
  let modal = bootstrap.Modal.getInstance(
    document.getElementById("modalRondas")
  );
  modal.hide();

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
  document.getElementById("juegoTerminado").textContent =
    "Elija piedra, papel o tijeras";
}


function elegir(valor) {
  if (contadorRondas < rondas) {
    let eleccion = valor;
    let h4 = document.getElementById("elegido");
    let iconoJugador;
    switch (eleccion) {
      case 0:
        iconoJugador = '<i class="fa-solid fa-hand-fist iconPi"></i>'; // Piedra
        break;
      case 1:
        iconoJugador = '<i class="fa-solid fa-hand iconPa"></i>'; // Papel
        break;
      case 2:
        iconoJugador = '<i class="fa-solid fa-hand-peace iconTi"></i>'; // Tijeras
        break;
    }
    h4.innerHTML = "Tu elegiste: " + iconoJugador;

    // Genera la elección de la CPU aleatoriamente
    let eleccionCPU = Math.floor(Math.random() * 3);
    let h4CPU = document.getElementById("eleCPU");
    let iconoCPU;
    switch (eleccionCPU) {
      case 0:
        iconoCPU = '<i class="fa-solid fa-hand-fist iconPi"></i>'; // Piedra
        break;
      case 1:
        iconoCPU = '<i class="fa-solid fa-hand iconPa"></i>'; // Papel
        break;
      case 2:
        iconoCPU = '<i class="fa-solid fa-hand-peace iconTi"></i>'; // Tijeras
        break;
    }
    h4CPU.innerHTML = "CPU eligió: " + iconoCPU;

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
  document.getElementById("puntajeJugadorG").textContent = puntosJugador;
  document.getElementById("puntajeCPUG").textContent = puntosCPU;
  document.getElementById("puntajeEmpatesG").textContent = empates;
  document.getElementById("puntajeJugadorP").textContent = puntosJugador;
  document.getElementById("puntajeCPUP").textContent = puntosCPU;
  document.getElementById("puntajeEmpatesP").textContent = empates;
  document.getElementById("puntajeJugadorE").textContent = puntosJugador;
  document.getElementById("puntajeCPUE").textContent = puntosCPU;
  document.getElementById("puntajeEmpatesE").textContent = empates;
}

//ganador de las rondas
function ganador() {
  if (puntosJugador > puntosCPU) {
    document.getElementById("juegoTerminado").textContent = "Juego terminado";
    document.getElementById("resultado").textContent =
      "¡Felicidades! ¡Has ganado!";
      modal = new bootstrap.Modal(document.getElementById("modalGanaste"));
  } else if (puntosJugador < puntosCPU) {
    document.getElementById("juegoTerminado").textContent = "Juego terminado";
    document.getElementById("resultado").textContent = "¡Ouww, has perdido!";
    modal = new bootstrap.Modal(document.getElementById("modalPerdiste"));
  } else {
    document.getElementById("juegoTerminado").textContent = "Juego terminado";
    document.getElementById("resultado").textContent = "Es un empate";
    modal = new bootstrap.Modal(document.getElementById("modalEmpate"));
  }

  //borra las elecciones de la ronda
  document.getElementById("elegido").textContent = "";
  document.getElementById("eleCPU").textContent = "";

 modal.show();
}

//deshabilitar botones
function deshabilitarBotones() {
  document.getElementById("piedra").disabled = true;
  document.getElementById("papel").disabled = true;
  document.getElementById("tijeras").disabled = true;
}

// Evento de clic para el botón "Iniciar Juego"
document.getElementById("btnIniciar").addEventListener("click", iniciarJuego);
