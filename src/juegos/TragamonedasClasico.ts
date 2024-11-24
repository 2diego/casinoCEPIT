import { Tragamonedas } from "./Tragamonedas";
import { Jugador } from "../models/Jugador";
import * as readline from 'readline-sync';
import fs from 'fs';



export class TragamonedasClasico extends Tragamonedas {

//solucionado el poder apostar y calcularPremio
  public apostar(): void {
    console.log(this.getSaldoDisponible());
    let apuesta = readline.questionInt(`\nIngrese el monto de su apuesta: `);
    if (apuesta !== this.getApuestaMin() && apuesta !== this.getApuestaMax()) {//mejorar validacion
      console.log(`\nLa apuesta debe ser $${this.getApuestaMin()} o $${this.getApuestaMax()}.`);
    }
    else if (this.validarApuesta(apuesta)) {
      console.log(`\nApostaste $${apuesta}.`);
      this.setSaldoDisponible(this.getSaldoDisponible() - apuesta);
      this.setApuestaActual(apuesta);
      const resultado = this.girar(1); 
      this.mostrarResultado(resultado);
      // this.girar(1);
      this.calcularPremio();
    }
  }

// ver por que gano siempre ahora xd 
  public calcularPremio(): void {
    
    let premio: number = 0;
    let simbolos= this.getSimbolosGenerados();
    if (simbolos[0] === simbolos[1] && simbolos[1] === simbolos[2]) {
      console.log('\nLos 3 simbolos son iguales.');
      
      if (this.getApuestaActual() === this.getApuestaMin()) {
        premio += this.getApuestaMin() * 3;
        console.log(`\nHas ganado: $${premio}`);

      }
      else if (this.getApuestaActual() === this.getApuestaMax()) {
        premio += this.getApuestaMax() * 5;
        console.log(`\nHas ganado: $${premio}`);

      }
    } else {//ver por que nunca gano
      console.log(`\nPerdiste`);

    }
    this.ingresarSaldo(premio);
  }


  public verInstrucciones(): void {
    console.log(`\n---------- Instrucciones de Tragamonedas Clasico ----------`);
    const datos = fs.readFileSync('../src/instrucciones/tragamonedas-clasico.txt', 'utf-8');
    console.log(datos);
  }

  public jugar(jugador: Jugador[]): void {

    //logica de elegir jugador en utils

    console.log(`\n---------- Bienvenido a ${this.getNombre()} ----------`);

    this.setSaldoInicial(jugador[0]);//esto esta mal
    if (this.getSaldoDisponible() === 0) {// Si no se pudo establecer el saldo inicial, retornamos y no se juega
      return;
    }

    let jugando: boolean = true;
    while (jugando) {
      let nuevaAccion = readline.question(`\nseleccione que desea hacer: 
        1. Apostar
        2. Retirar saldo
        3. Ver instrucciones
        4. Salir
      \nSu eleccion `);

      switch (nuevaAccion) {
        case "1":
          this.apostar();
          break;
          case "2":
          this.retirarSaldo(jugador[0]);
          break;
          case "3":
          this.verInstrucciones();
          break;
        case "4":
          jugando = false;
          break;
        default:
          console.log("\nOpcion no valida.");
          break;
      }
      // console.log(`\nJugando`);

      // let salir: string = readline.question("\nDesea salir? (s/n) ");

      // while (salir.toLocaleLowerCase() === "n") {
      //   console.log(`\nJugando`);
      //   salir = readline.question("\nDesea salir? (s/n) ");
      // }
      // jugando = false;

      //logica del juego si desea salir return jugando = false

    }

    return;
  }

}
