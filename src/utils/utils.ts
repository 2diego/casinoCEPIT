import { Jugador } from '../models/Jugador';
import * as readline from 'readline-sync';

//Utils juegos
export function validarSaldoInicial(apuestaMin: number): number {
  let saldoInicial: number = readline.questionInt('\nPara jugar ingrese su saldo inicial o 0 para elegir otro juego: ');
    if (saldoInicial === 0) {
      return 0;
    }
    while (saldoInicial < apuestaMin) {
      console.log(`\nDebe ingresar un saldo igual o mayor a la apuesta minima ($${apuestaMin}) para jugar.`);
      saldoInicial = readline.questionInt(`\nIngrese saldo mayor a $${apuestaMin} o 0 para elegir otro juego: `);
      if (saldoInicial === 0) {
        return 0;
      }
    }
    return saldoInicial;
}
//Utils main
export function elegirJugador(jugadores: Jugador[]): Jugador {
  console.log(`\nElija un jugador para sentarse: `);
      for (let i = 0; i < jugadores.length; i++) {
        console.log(`${i + 1} - ${jugadores[i].getNombre()}`);
      }
      const indexJugador: number = readline.questionInt("Ingrese el numero del jugador: ") - 1;
      if (indexJugador < 0 || indexJugador >= jugadores.length) {
        console.log("\nOpcion invalida. Intente nuevamente.");
        return elegirJugador(jugadores);
      }
      return jugadores[indexJugador];
}


export function crearJugador(): Jugador {
  const nombreJugador: string = readline.question('\nIngrese su nombre: ');
  let montoJugador: number = readline.questionInt('\nIngrese monto inicial: ');
  while (montoJugador <= 0) {
    console.log('\nEl monto inicial debe ser mayor a 0.');
    montoJugador = readline.questionInt('\nIngrese monto inicial: ');
  }
  
  return new Jugador(nombreJugador, montoJugador);
}