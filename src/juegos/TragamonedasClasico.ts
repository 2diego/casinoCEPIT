import { Tragamonedas } from "./Tragamonedas";
import { Jugador } from "../models/Jugador";
import {
  solicitarApuesta,
  solicitarRecarga,
  menuTragamonedas,
} from "../utils/utils";

export class TragamonedasClasico extends Tragamonedas {
  constructor(
    nombre: string,
    simbolos: string[] = [],
    apuestaMinima: number = 0,
    apuestaMaxima: number = 0
  ) {
    super(nombre, simbolos, apuestaMinima, apuestaMaxima);
    this.filas = 1;
  }

  //solucionado el poder apostar y calcularPremio
  public apostar(): void {
    console.log(`Su saldo disponible es de $${this.getSaldoDisponible()}`);
    let apuesta = solicitarApuesta();
    if (apuesta !== this.getApuestaMin() && apuesta !== this.getApuestaMax()) {
      //mejorar validacion
      console.log(
        `\nLa apuesta debe ser $${this.getApuestaMin()} o $${this.getApuestaMax()}.`
      );
    } else if (this.validarApuesta(apuesta)) {
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
    if (
      resultado[0][0] === resultado[0][1] &&
      resultado[0][1] === resultado[0][2]
    ) {
      if (resultado[0][0] === "7️⃣") {
        //agregue jackpot, me paga el jackpot y la apuesatmin o max hay que ver si esta bien
        premio += this.getApuestaActual() * 10;
        console.log(
          `\n!!Jackpot!! Los 3 simbolos son 7️⃣, has ganado $${premio}`
        );
      } else {
        console.log(`\nLos 3 simbolos son iguales`);
      }
      if (this.getApuestaActual() === this.getApuestaMin()) {
        premio += this.getApuestaMin() * 3;
        console.log(`\nHas ganado: $${premio}`);
      } else if (this.getApuestaActual() === this.getApuestaMax()) {
        premio += this.getApuestaMax() * 5;
        console.log(`\nHas ganado: $${premio}`);
      }
    } else {
      //ver por que nunca gano
      console.log(`\nPerdiste`);
    }
    this.ingresarSaldo(premio);
  }

  public jugar(jugador: Jugador[]): void {
    //logica de elegir jugador en utils

    console.log(`\n---------- Bienvenido a ${this.getNombre()} ----------`);

    this.setSaldoInicial(jugador[0]); //esto esta mal
    if (this.getSaldoDisponible() === 0) {
      // Si no se pudo establecer el saldo inicial, retornamos y no se juega
      return;
    }

    let jugando: boolean = true;
    while (jugando) {
      let nuevaAccion: number = menuTragamonedas();

      switch (nuevaAccion) {
        case 1:
          this.apostar();
          break;
        case 2:
          this.agregarSaldo(jugador[0]);
          break;
        case 3:
          this.verInstrucciones();
          break;
        case 4:
          this.retirarSaldo(jugador[0]);
          console.log("\nGracias por jugar.");
          jugando = false;
          return;
        default:
          console.log("\nOpcion no valida.");
          break;
      }

      if (this.getSaldoDisponible() < this.getApuestaMin()) {
        if(!solicitarRecarga(this, jugador[0])){
          this.retirarSaldo(jugador[0]);
          jugando = false;
        };

      } //arreglar esto
    }

    return;
  }
}
