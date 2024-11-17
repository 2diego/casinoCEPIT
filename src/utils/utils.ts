import * as readline from 'readline-sync';

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