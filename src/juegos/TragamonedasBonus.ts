import { Bonus } from "../bonus/Bonus";
import { Tragamonedas } from "./Tragamonedas";
import { Jugador } from "../models/Jugador";
import { elegirJugador, solicitarRecarga, menuTragamonedas, solicitarApuesta, solicitarLineas, confirmarApuesta } from "../utils/utils";
import { lineasPosibles } from "../utils/Lineas";

export class TragamonedasBonus extends Tragamonedas {
  private bonus: Bonus[] = [];
  
  public agregarBonus(bonus: Bonus): void {
    this.bonus.push(bonus);
  }

  public checkBonus(iconoGanador: string): Bonus | undefined {
    return this.bonus.find((bonus) => bonus.getIconoGanador() === iconoGanador);
  }

  public apostar(monto: number, lineasApostadas: number, inBonus: boolean = false): void {
    let resultado: string[][] = this.girar();
    this.mostrarResultado(resultado);
    this.calcularPremio(resultado, monto, lineasApostadas, inBonus);
  }

  protected calcularPremio(resultado: string[][], apuesta: number, lineasApostadas: number, inBonus: boolean = false): void {
    let premio: number = 0;
    let lineas: number[][][] = lineasPosibles[lineasApostadas];
    let bonusPorActivar: Bonus[] = []

    for (let i = 0; i < lineasApostadas; i++) { //for (let linea of lineas) {
      let simbolos: string[] = lineas[i].map(([fila, columna]) => resultado[fila][columna]);

      if (simbolos.every((simbolo) => simbolo === simbolos[0])) {
        let multiplicador: number = this.getSimbolos().indexOf(simbolos[0]) + 2;
        let premioPorLinea: number = apuesta * multiplicador;
        
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
      for (let i = 0; i < bonusPorActivar.length; i++) {
        bonusPorActivar[i].activar(this, apuesta, lineasApostadas);
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

    let jugando: boolean = true;
    while (jugando) {
      let accion: number = menuTragamonedas(this);

      switch (accion) {
        case 1:
          let apuesta: number = solicitarApuesta();
          let lineasApostadas: number = solicitarLineas();
          let totalApostado: number = apuesta * lineasApostadas;
          if (this.validarApuesta(totalApostado)) {
            if (confirmarApuesta(apuesta, lineasApostadas)) {
              this.setSaldoDisponible(this.getSaldoDisponible() - (totalApostado));
              this.apostar(apuesta, lineasApostadas);
            }
          }
          break;
        case 2:
          this.agregarSaldo(jugador);
          break;
        case 3:
          this.verInstrucciones();//cargar archivo
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
      if (this.getSaldoDisponible() < this.getApuestaMin()) {
        if(!solicitarRecarga(this, jugador)){
          this.retirarSaldo(jugador);
          jugando = false;
        }
      };
    }
    return;
  }

}