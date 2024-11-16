import { Casino } from "./models/Casino";
import { Jugador } from "./models/Jugador";
//import { GameFactory } from "./factories/GameFactory";
import * as readline from "readline-sync";

function main(){
  const casino = new Casino();
  const nombreJugador: string = readline.question("Ingrese su nombre: ");
  const montoJugador: number = readline.questionInt("Ingrese monto inicial: ");
  const jugador = new Jugador(nombreJugador, montoJugador);

  // casino.ingresarJuego(new Tragamonedas());
  // casino.ingresarJuego(new Blackjack());
  // casino.ingresarJuego(new Bingo());

  let jugando = true;

  while(jugando){
    console.log(`Bienvenido ${jugador.getNombre()} al Casino CEPIT`);
    casino.verJuegos();
    const juegoSeleccionado = readline.questionInt(`\nElija un juego: `);
    casino.elegirJuego(jugador, juegoSeleccionado);
  }
}
main();