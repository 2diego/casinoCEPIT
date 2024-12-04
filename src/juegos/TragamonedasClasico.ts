import { Tragamonedas } from "./Tragamonedas";
import { Jugador } from "../models/Jugador";
import {solicitarApuesta, solicitarRecarga, menuJuegos, verInstrucciones, elegirJugador} from "../utils/utils";

export class TragamonedasClasico extends Tragamonedas {
  constructor(nombre: string, simbolos: string[] = [], apuestaMinima: number = 0, apuestaMaxima: number = 0) {
    super(nombre, simbolos, apuestaMinima, apuestaMaxima);
    this.filas = 1;
  }
 
  public apostar(): void {
    let apuesta = solicitarApuesta(this, this.getApuestaMin(), this.getApuestaMax());
    if (apuesta !== this.getApuestaMin() && apuesta !== this.getApuestaMax()) {
      console.error(`\nLa apuesta debe ser $${this.getApuestaMin()} o $${this.getApuestaMax()}.`);
    } else if (this.validarApuesta(apuesta)) {
      console.log(`\nApostaste $${apuesta}.`);
      this.setSaldoDisponible(this.getSaldoDisponible() - apuesta);
      this.setApuestaActual(apuesta);
      this.girar();
      this.mostrarResultado();
      this.calcularPremio();
    }
  }


  public calcularPremio(): void {
    let premio: number = 0;
    let resultado = this.getResultadoActual();
    if (resultado[0][0] === resultado[0][1] && resultado[0][1] === resultado[0][2]) {
      if (resultado[0][0] === "7️⃣") {
        premio += this.getApuestaActual() * 10;
        console.log(`\n!!Jackpot!! Los 3 simbolos son 7️⃣, has ganado $${premio}`);
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
      console.log(`\nPerdiste`);
    }
    this.ingresarSaldo(premio);
  }

  public jugar(jugadores: Jugador[]): void {

    console.log(`\n---------- Bienvenido a ${this.getNombre()} ----------`);

    let jugador: Jugador = jugadores[0];
    if (jugadores.length > 1) {
      jugador = elegirJugador(jugadores);
    }

    this.setSaldoInicial(jugador);
    if (this.getSaldoDisponible() === 0) {
      return;
    }

    let jugando: boolean = true;
    while (jugando) {
      let nuevaAccion: number = menuJuegos(this);

      switch (nuevaAccion) {
        case 1:
          this.apostar();
          break;
        case 2:
          this.agregarSaldo(jugador);
          break;
        case 3:
          verInstrucciones(this);
          break;
        case 4:
          this.retirarSaldo(jugador);
          console.log("\nGracias por jugar.");
          jugando = false;
          return;
        default:
          console.error("\nOpcion no valida.");
          break;
      }

      if (this.getSaldoDisponible() < this.getApuestaMin()) {
        if (!solicitarRecarga(this, jugador)) {
          this.retirarSaldo(jugador);
          jugando = false;
        };

      }
    }
    return;
  }
}
