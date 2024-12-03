import { Bonus } from "../bonus/Bonus";
import { Tragamonedas } from "./Tragamonedas";
import { Jugador } from "../models/Jugador";
import {
  elegirJugador,
  solicitarRecarga,
  menuJuegos,
  solicitarApuesta,
  solicitarLineas,
  confirmarApuesta,
  verInstrucciones,
} from "../utils/utils";
import { lineasPosibles } from "../utils/lineas";

export class TragamonedasBonus extends Tragamonedas {
  private bonus: Bonus[] = [];

  public agregarBonus(bonus: Bonus): void {
    this.bonus.push(bonus);
  }

  public checkBonus(iconoGanador: string): Bonus | undefined {
    return this.bonus.find((bonus) => bonus.getIconoGanador() === iconoGanador);
  }

  public apostar(inBonus: boolean = false): void {
    this.setApuestaActual(
      solicitarApuesta(this, this.getApuestaMin(), this.getApuestaMax())
    );
    let lineasApostadas: number = solicitarLineas();
    let totalApostado: number = this.getApuestaActual() * lineasApostadas;
    if (this.validarApuesta(totalApostado)) {
      if (confirmarApuesta(this.getApuestaActual(), lineasApostadas)) {
        this.setSaldoDisponible(this.getSaldoDisponible() - totalApostado);
      }
    }
    this.girar();
    this.mostrarResultado();
    this.calcularPremio(lineasApostadas, inBonus);
  }

  public calcularPremio(
    lineasApostadas: number,
    inBonus: boolean = false
  ): void {
    let premio: number = 0;
    let lineas: number[][][] = lineasPosibles[lineasApostadas];
    let bonusPorActivar: Bonus[] = [];

    for (let i = 0; i < lineasApostadas; i++) {
      //for (let linea of lineas) {
      let simbolos: string[] = lineas[i].map(
        ([fila, columna]) => this.getResultadoActual()[fila][columna]
      );

      if (simbolos.every((simbolo) => simbolo === simbolos[0])) {
        let multiplicador: number = this.getSimbolos().indexOf(simbolos[0]) + 2;
        let premioPorLinea: number = this.getApuestaActual() * multiplicador;

        console.log(`\nGanaste con tres ${simbolos[0]}!
Premio por linea: $${premioPorLinea}`);
        this.ingresarSaldo(premioPorLinea);
        premio += premioPorLinea;

        if (!inBonus) {
          const bonus: Bonus | undefined = this.checkBonus(simbolos[0]);
          if (bonus) {
            bonusPorActivar.push(bonus);
          }
        }
      }
    }
    if (premio === 0) {
      console.log(`\nNo tuviste suerte esta vez!`);
    }

    if (bonusPorActivar.length > 0) {
      console.log(`\nGanaste ${bonusPorActivar.length} bonus!`);
      for (let i = 0; i < bonusPorActivar.length; i++) {
        console.log(`\nBonus N° ${i + 1}`);
        bonusPorActivar[i].activar(this, lineasApostadas);
      }
    }
  }

  jugar(jugadores: Jugador[]): void {
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
      let accion: number = menuJuegos(this);

      switch (accion) {
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
          console.log(`\nGracias por jugar ${this.getNombre()}.`);
          this.retirarSaldo(jugador);
          jugando = false;
          return;
        default:
          console.error("Opcion no valida.");
          break;
      }
      if (this.getSaldoDisponible() <= this.getApuestaMin()) {
        if (!solicitarRecarga(this, jugador)) {
          this.retirarSaldo(jugador);
          jugando = false;
        }
      }
    }
    return;
  }
}
