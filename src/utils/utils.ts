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

export function elegirJugador(jugadores: Jugador[]): Jugador {
  console.log(`\nElija un jugador para sentarse: `);
      for (let i = 0; i < jugadores.length; i++) {
        console.log(`${i + 1} - ${jugadores[i].getNombre()}`);
      }
      const indexJugador: number = readline.questionInt("Ingrese el numero del jugador: ") - 1;
      if (indexJugador < 0 || indexJugador >= jugadores.length) {
        console.log("Opcion invalida. Intente nuevamente.");
        return elegirJugador(jugadores);
      }
      return jugadores[indexJugador];
}