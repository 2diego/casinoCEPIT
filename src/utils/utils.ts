import { Jugador } from '../models/Jugador';
import { Juego } from '../models/Juego';
import * as readline from 'readline-sync';
import fs from 'fs';

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


export function solicitarRecarga(juego: Juego, jugador: Jugador): boolean {
  console.log(`\nEl monto del jugador es: ${jugador.getMonto()} `);
  let nuevoSaldo: number = readline.questionInt(`\nNo tiene saldo suficiente para continuar jugando. Saldo actual: $${juego.getSaldoDisponible()}.
\nIngrese saldo a depositar o 0 para retirar fondos y salir: `);
  
  if (nuevoSaldo === 0) {
    console.log(`\nGracias por jugar ${juego.getNombre()}. Saliendo al menu principal..`);
    return false;
  } else if (nuevoSaldo < 0) {
      console.error('\nEl saldo debe ser mayor a 0.');
      solicitarRecarga(juego, jugador);
    } else {
        if (jugador.cargarJuego(nuevoSaldo)) {
          juego.ingresarSaldo(nuevoSaldo);
          console.log(`\nSe ingreso $${nuevoSaldo} al juego.\n\nSaldo actual: $${juego.getSaldoDisponible()}`);
          return true;
        }
      }
      return false;
}

export function menuJuegos(juego: Juego): number {
  let accion: number = 0
  
  while (accion < 1 || accion > 4) {
    accion = readline.questionInt(`\nElija una opcion:
      1 - Apostar
      2 - Ingresar saldo
      3 - Ver instrucciones
      4 - Retirar saldo y salir

Saldo disponible: $${juego.getSaldoDisponible()}
      
Su eleccion: `);
    
    if (accion < 1 || accion > 4) {
      console.log('\nOpcion invalida. Intente nuevamente.');
    }
  }

  return accion;
}

export function solicitarApuesta(juego: Juego, apuestaMin: number, apuestaMax: number): number {
  function frase(): string {
    if (juego.getNombre() === "Tragamonedas clasico con bonus") {
      return " por linea";
    } else if (juego.getNombre() === "Tragamonedas clasico") {
        return ` ($${apuestaMin} o $${apuestaMax})`;
      } else if (juego.getNombre() === "Blackjack" || juego.getNombre() === "Bacara") {
          return ` entre $${juego.getApuestaMin()} y $${juego.getApuestaMax()}`;
        }
      return "";
    }

  let apuesta: number = readline.questionInt(`\nIngrese el monto que desea apostar${frase()}: `);

  return apuesta;
}

export function solicitarLineas(): number {
  let lineas: number = 0

  while (lineas < 1 || lineas > 5 || lineas === 4 ) {
    lineas = readline.questionInt(`\nIngrese el numero de lineas que desea apostar:
      1 - Linea central
      2 - Lineas externas
      3 - Todas las lineas
      5 - Lineas y diagonales
  
Su eleccion: `);
    
    if (lineas < 1 || lineas > 5 || lineas === 4) {
      console.log('\nOpcion invalida. Intente nuevamente.');
    }
  }

  return lineas;
}

export function confirmarApuesta(apuesta: number, lineasApostadas: number): boolean {
  let confirmar: string = readline.question(`\nEsta apostando ${lineasApostadas} lineas a $${apuesta} por linea.
Total apuesta: $${apuesta * lineasApostadas}.
Confirmar apuesta (s/n): `);
  
    if (confirmar.toLowerCase() === 's') {
      return true;
    } else {
        return false;
    }
}

export function solicitarSaldo(): number {
  const saldo :number = readline.questionInt("\nIngrese el saldo a agregar: ");
  return saldo;
}

export function verInstrucciones(juego: Juego): void {
  console.log(`\n---------- Instrucciones de ${juego.getNombre()} ----------`);
  let name: string = juego.getNombre().toLowerCase().replace(" ", "-");
  const datos = fs.readFileSync(`../src/instrucciones/${name}.txt`, 'utf-8');
  console.log(datos);
}

export function pideCarta(): string {
  let carta: string = readline.question("\nDesea pedir carta (s/n): ");
  return carta.toLowerCase();
}

export function juegaDeNuevo(): string {
  let jugarDeNuevo: string = readline.question("\nDesea jugar de nuevo (s/n): ");
  return jugarDeNuevo.toLowerCase();
}

//Utils main

export function crearJugador(): Jugador {
  const nombreJugador: string = readline.question('\nIngrese su nombre: ');
  let montoJugador: number = readline.questionInt('\nIngrese monto inicial: ');
  while (montoJugador <= 0) {
    console.log('\nEl monto inicial debe ser mayor a 0.');
    montoJugador = readline.questionInt('\nIngrese monto inicial: ');
  }
  
  return new Jugador(nombreJugador, montoJugador);
}