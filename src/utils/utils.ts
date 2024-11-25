import { Jugador } from '../models/Jugador';
import * as readline from 'readline-sync';
import { Juego } from '../models/Juego';

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

export function solicitarSaldo(juego: Juego, jugador: Jugador): void {
  let nuevoSaldo: number = readline.questionInt(`\nNo tiene saldo suficiente para continuar jugando. Saldo actual: $${juego.getSaldoDisponible()}.
  \nIngrese saldo a depositar o 0 para retirar fondos y salir: `);
  if (nuevoSaldo === 0) {
    console.log(`\nGracias por jugar ${juego.getNombre()}. Saliendo al menu principal..`);
    return;
  } else if (nuevoSaldo < 0) {
      console.log('\nEl saldo debe ser mayor a 0.');
      solicitarSaldo(juego, jugador);
    } else {
        if (jugador.cargarJuego(nuevoSaldo)) {
          juego.ingresarSaldo(nuevoSaldo);
          console.log(`\nSe ingreso $${nuevoSaldo} al juego.
          \nSaldo actual: $${juego.getSaldoDisponible()}`);
          return;
        } else {
          console.log(`\nNo cuenta con saldo suficiente para jugar ${juego.getNombre()}. Saliendo al menu principal..`);
          return;
        }
      }
}