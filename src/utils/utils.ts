import { Jugador } from '../models/Jugador';
import * as readline from 'readline-sync';

//Utils juegos
export function validarSaldoInicial(apuestaMin: number): number {
  let saldoInicial: number = readline.questionInt('Para jugar ingrese su saldo inicial o 0 para elegir otro juego: ');
    if (saldoInicial === 0) {
      return 0;
    }
    while (saldoInicial < apuestaMin) {
      console.log(`Debe ingresar un saldo igual o mayor a la apuesta minima ($${apuestaMin}) para jugar.`);
      saldoInicial = readline.questionInt(`Ingrese saldo mayor a $${apuestaMin} o 0 para elegir otro juego: `);
      if (saldoInicial === 0) {
        return 0;
      }
    }
    return saldoInicial;
}

//Utils main
export function crearJugador(): Jugador {
  const nombreJugador: string = readline.question('Ingrese su nombre: ');
  let montoJugador: number = readline.questionInt('Ingrese monto inicial: ');
  while (montoJugador <= 0) {
    console.log('El monto inicial debe ser mayor a 0.');
    montoJugador = readline.questionInt('Ingrese monto inicial: ');
  }
  
  return new Jugador(nombreJugador, montoJugador);
}