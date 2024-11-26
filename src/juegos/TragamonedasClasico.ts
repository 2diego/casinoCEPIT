import { Tragamonedas } from "./Tragamonedas";
import { Jugador } from "../models/Jugador";
import * as readline from 'readline-sync';
import fs from 'fs';
import { solicitarSaldo } from "../utils/utils";



export class TragamonedasClasico extends Tragamonedas {
  constructor(nombre: string, simbolos: string[] = [], apuestaMinima: number = 0, apuestaMaxima: number = 0) {
    super(nombre, simbolos, apuestaMinima, apuestaMaxima);
    this.filas = 1;
  }

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
      const resultado: string[][] = this.girar();
      this.mostrarResultado(resultado);
      this.calcularPremio(resultado);
    }
  }

  // ver por que gano siempre ahora xd 
  public calcularPremio(resultado: string[][]): void {

    let premio: number = 0;
    // let simbolos= this.getSimbolosGenerados();
    if (resultado[0][0] === resultado[0][1] && resultado[0][1] === resultado[0][2]) {
      if (resultado[0][0] === "7️⃣") {
        //agregue jackpot, me paga el jackpot y la apuesatmin o max hay que ver si esta bien
        premio += this.getApuestaActual() * 10;
        console.log(`\n!!Jackpot!! Los 3 simbolos son 7️⃣, has ganado $${premio}`);
      } else {
        console.log(`\nLos 3 simbolos son iguales`);
      }
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


    while (this.getSaldoDisponible() > this.getApuestaMin()) {
      let nuevaAccion = readline.question(`\nseleccione que desea hacer: 
        1. Ver instrucciones
        2. Apostar
        3. Ingresar saldo
        4. Retirar saldo y salir
      \nSu eleccion `);

      switch (nuevaAccion) {
        case "1":
          this.verInstrucciones();
          break;
        case "2":
          this.apostar();
          break;
        case "3":
          this.agregarSaldo(jugador[0]);//ver si queda bien
          break;
        case "4":
          this.retirarSaldo(jugador[0]);
          console.log("\nGracias por jugar.");
          break;
        default:
          console.log("\nOpcion no valida.");
          break;
        }
        // solicitarSaldo(this, jugador[0]);
      }

    return;
  }

}
