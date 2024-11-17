import { Casino } from "./models/Casino";
import { Jugador } from "./models/Jugador";
//import { GameFactory } from "./factories/GameFactory";
import * as readline from "readline-sync";

function main(){
  const casino = new Casino();
  const nombreJugador: string = readline.question("Ingrese su nombre: ");
  let montoJugador: number = readline.questionInt("Ingrese monto inicial: ");
  
  while (montoJugador <= 0) {
    console.log("El monto inicial debe ser mayor a 0.");
    montoJugador = readline.questionInt("Ingrese monto inicial: ");
  }
  const jugador = new Jugador(nombreJugador, montoJugador);
  
  // casino.ingresarJuego(new Tragamonedas());
  // casino.ingresarJuego(new Blackjack());
  // casino.ingresarJuego(new Bingo());

  let enCasino = true;

  console.log(`Bienvenido ${jugador.getNombre()} al Casino CEPIT`);
  while(enCasino){//acomode el loop de main
    const eleccion: string = readline.question(`\nElija una opcion:
    1 - Ver juegos
    2 - Ver saldo
    3 - Salir`)

    switch (eleccion) {
      case '1':
        casino.verJuegos();
        const juegoSeleccionado = readline.questionInt("\nIngrese el numero del juego elegido (0 para salir): ");
        if (juegoSeleccionado === 0) {
          console.log("Gracias por jugar. ¡Hasta luego!");
          enCasino = false;
          continue;
        }
        casino.elegirJuego(jugador, juegoSeleccionado);
        break;
      case '2':
        console.log(`Tu saldo es de $${jugador.getMonto()}`);
        break;
      case '3':
        console.log(`Hasta luego ${jugador.getNombre()}`);
        enCasino = false;
        break;
      default:
        console.log("Opcion invalida");
        break;
    }

    if (jugador.getMonto() <= 0) {
      console.log("Te quedaste sin saldo. Gracias por jugar.");
      enCasino = false;
    }
  }
}
main();