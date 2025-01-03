//Falta ingresar saldo / ingresar jugador
import { GameFactory } from "./factories/GameFactory";
import { Casino } from "./models/Casino";
import { Jugador } from "./models/Jugador";
import { crearJugador } from "./utils/utils";
import { BonusGirosGratis } from "./bonus/BonusGirosGratis";
import { TragamonedasBonus } from "./juegos/TragamonedasBonus";
import * as readline from "readline-sync";

function main(){
  const casino = Casino.getInstance();
  
  try {
    const tragamonedas = GameFactory.crearJuego({
      tipo: "tragamonedas-clasico",
      nombre: "Tragamonedas clasico",
      simbolos: ["🍒", "🍋", "7️⃣", "💎", "🍇"],
      apuestaMin: 10,
      apuestaMax: 100,
    });
    if (tragamonedas) {
      casino.ingresarJuego(tragamonedas);
    }
  } catch (error) {
    console.error("Error al crear el juego Tragamonedas clasico:", (error as Error).message);
  }
  
  try {
    const tragamonedasBonus = GameFactory.crearJuego({
      tipo: "tragamonedas-bonus",
      nombre: "Tragamonedas bonus",
      simbolos: ["🍒", "💎", "🔥"],
      apuestaMin: 0,
      apuestaMax: 0,
    });
    if (tragamonedasBonus instanceof TragamonedasBonus) {
      tragamonedasBonus.agregarBonus(new BonusGirosGratis("🔥", 3));
      tragamonedasBonus.agregarBonus(new BonusGirosGratis("💎", 2));
      casino.ingresarJuego(tragamonedasBonus);
    }
  } catch (error) {
    console.error("Error al crear el juego Tragamonedas bonus:", (error as Error).message);
  }
  
  try {
    const bacara = GameFactory.crearJuego({
      tipo: "bacara",
      nombre: "Bacara",
      apuestaMin: 100,
      apuestaMax: 10000,
    });
    if (bacara) {
      casino.ingresarJuego(bacara);
    }
  } catch (error) {
    console.error("Error al crear el juego Bacara:", (error as Error).message);
  }
  
  try {
    const blackjack = GameFactory.crearJuego({
      tipo: "blackjack",
      nombre: "Blackjack",
      apuestaMin: 50,
      apuestaMax: 1000,
    });
    if (blackjack) {
      casino.ingresarJuego(blackjack);
    }
  } catch (error) {
    console.error("Error al crear el juego Blackjack:", (error as Error).message);
  }
  
  console.log(`\n---------- Bienvenido al Casino CEPIT ----------`);

  let eligiendoJugadores: boolean = true;
  while (eligiendoJugadores) {
    const cantidadJugadores: number = readline.questionInt(
      "\nIngrese la cantidad de jugadores que van a jugar o 0 para salir: "
  );

  if (cantidadJugadores == 0) {
    console.log("\nGracias por jugar. ¡Hasta luego!");
    return eligiendoJugadores = false;
  } else if (cantidadJugadores < 0) {
    console.log("\nLa cantidad de jugadores debe ser mayor a 0.");
    continue;
  } else {
    for (let i = 0; i < cantidadJugadores; i++) {
      const jugador: Jugador = crearJugador();
      casino.ingresarJugador(jugador);
    }
    eligiendoJugadores = false;
  }

}

  let enCasino = true;
  
  while(enCasino){
    const eleccion: string = readline.question(`\nElija una opcion:
    1 - Ver juegos
    2 - Ver montos de los jugadores
    3 - Salir
    \nSu eleccion: `);

    switch (eleccion) {
      case '1':
        casino.verJuegos();
        const juegoSeleccionado = readline.questionInt("\nIngrese el numero del juego elegido (0 para salir): ");
        if (juegoSeleccionado === 0) {
          console.log("\nGracias por jugar. ¡Hasta luego!");
          enCasino = false;
          continue;
        }
        casino.elegirJuego(casino.getJugadores(), juegoSeleccionado);
        break;
      case '2':
        console.log(`\nSaldo de los jugadores: `);
        console.table(casino.getJugadores())
        ;
        break;
      case '3':
        console.log(`\nHasta luego!`);
        enCasino = false;
        break;
      default:
        console.error("\nOpcion invalida");
        break;
    }
  }
}
main();