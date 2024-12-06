import { Juego } from "../models/Juego";
import { Jugador } from "../models/Jugador";
import { Mazo } from "../utils/Mazo";
import { Carta } from "../utils/Carta";
import {  menuJuegos, solicitarApuesta, solicitarRecarga, solicitarSaldo, validarSaldoInicial, verInstrucciones, elegirJugador,} from "../utils/utils";

export abstract class JuegoDeCartas implements Juego {
  private nombre: string;
  protected saldoDisponible: number;
  private mazo: Mazo;
  private apuestaMin: number;
  private apuestaMax: number;
  protected apuestaActual: number = 0;
  private jugadores: Jugador[] = [];

  constructor(nombre: string, apuestaMin: number = 0, apuestaMax: number = 0) {
    this.nombre = nombre;
    this.saldoDisponible = 0;
    this.mazo = new Mazo();
    if (apuestaMin < 0 || apuestaMax < 0) {
      console.error("Las apuestas minima y maxima no pueden ser negativas.");
    }
    if (apuestaMax > 0 && apuestaMin > apuestaMax) {
      console.error("La apuesta minima no puede ser mayor que la apuesta maxima.");
    }
    this.apuestaMin = apuestaMin;
    this.apuestaMax = apuestaMax;
  }

  getNombre(): string {
    return this.nombre;
  }

  getSaldoDisponible(): number {
    return this.saldoDisponible;
  }

  getApuestaMin(): number {
    return this.apuestaMin;
  }

  getApuestaMax(): number {
    return this.apuestaMax;
  }

  getMazo(): Mazo {
    return this.mazo;
  }

  getApuestaActual(): number {
    return this.apuestaActual;
  }

  setApuestaActual(apuesta: number): void {
    this.apuestaActual = apuesta;
  }

  setSaldoDisponible(saldo: number): void {
    this.saldoDisponible = saldo;
  }

  setMazo(mazo: Mazo): void {
    this.mazo = mazo;
  }

  public ingresarSaldo(saldo: number): void {
    if (saldo < 0) {
      console.error("\nEl saldo ingresado no puede ser negativo.");
    }
    this.saldoDisponible += saldo;
  }

  public agregarSaldo(jugador: Jugador): number {
    const saldo: number = solicitarSaldo(); 
    if (jugador.cargarJuego(saldo)) {
      this.ingresarSaldo(saldo);
      console.log(`\nSe ingreso $${saldo} al juego.`);
    }
    return saldo;
  }

  public retirarSaldo(jugador: Jugador): number {
    const saldoRetirar = this.saldoDisponible;
    this.saldoDisponible = 0;
    jugador.sumarGanancia(saldoRetirar);
    console.log(`\nHas retirado: $${saldoRetirar}`);
    return saldoRetirar;
  }

  protected setSaldoInicial(jugador: Jugador): void {
    let saldoInicial: number = validarSaldoInicial(this.getApuestaMin());
    if (saldoInicial === 0) {
      return;
    }

    let cargar: boolean = jugador.cargarJuego(saldoInicial);
    if(cargar){
    this.ingresarSaldo(saldoInicial);
    } else {
      this.setSaldoInicial(jugador);
    }
  }

  public validarApuesta(monto: number): boolean {
    //validarApuesta iria en utils?
    if (monto <= 0) {
      console.error("\nLa apuesta debe ser mayor a 0.");
      return false;
    }
    if (this.getSaldoDisponible() < monto) {
      console.error("\nNo cuenta con saldo suficiente para apostar.");
      return false;
    }
    if (this.getApuestaMin() > 0 && monto < this.getApuestaMin()) {
      console.error(`\nLa apuesta debe ser mayor a $${this.getApuestaMin()}.`);
      return false;
    }
    if (this.getApuestaMax() > 0 && monto > this.getApuestaMax()) {
      console.error(`\nLa apuesta debe ser menor a $${this.getApuestaMax()}.`);
      return false;
    }
    return true;
  }

  apostar(): void {
    this.setApuestaActual(solicitarApuesta(this, this.getApuestaMin(), this.getApuestaMax()));
    if (this.validarApuesta(this.getApuestaActual())) {
      this.setSaldoDisponible(this.getSaldoDisponible() - this.getApuestaActual());
      this.juego();
    }
  }

  public mostrarMano(mano: Carta[], turno: "jugador" | "crupier"): void {
    let enMano: string = mano.map((carta) => carta.getCartaMostrada()).join(" | ");

    console.log(`\nMano del ${turno}: | ${enMano} |`);
  }

  abstract calcularPremio(tipoPremio: string): void;

  abstract juego(): void;


  public jugar(jugadores: Jugador[]): void {
    console.log(`\n---------- Bienvenido a ${this.getNombre()} ----------`);

    this.jugadores.push(...jugadores)
    let jugadorActual: Jugador = this.jugadores[0];
    if (jugadores.length > 1) {
      jugadorActual = elegirJugador(jugadores);
    }

    this.setSaldoInicial(jugadorActual);
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
          this.agregarSaldo(jugadorActual);
          break;
        case 3:
          verInstrucciones(this);
          break;
        case 4:
          console.log(`\nGracias por jugar ${this.getNombre()}.`);
          this.retirarSaldo(jugadorActual);
          jugando = false;
          return;
        default:
          console.error("\nOpcion no valida.");
          break;
      }

      if (this.getSaldoDisponible() < this.getApuestaMin()) {
        if (!solicitarRecarga(this, jugadorActual)) {
          this.retirarSaldo(jugadorActual);
          jugando = false;
        }
      }
    }
    return;
  }
}
