import { Jugador } from "../models/Jugador";
import { Juego } from "../models/Juego";
import { solicitarSaldo, validarSaldoInicial } from "../utils/utils";

export abstract class Tragamonedas implements Juego {
  private nombre: string;
  private simbolos: string[];
  private apuestaMin: number;
  private apuestaMax: number;
  private saldoDisponible: number;
  protected filas: number;
  protected columnas: number;
  private apuestaActual: number = 0;
  private resultadoActual: string[][] = [];


  constructor(nombre: string, simbolos: string[] = [], apuestaMinima: number = 0, apuestaMaxima: number = 0) {
    this.nombre = nombre;
    this.simbolos = simbolos;
    this.saldoDisponible = 0;
    if (apuestaMinima < 0 || apuestaMaxima < 0) {
      throw new Error("\nLas apuestas minima y maxima no pueden ser negativas.");
    }
    if (apuestaMaxima > 0 && apuestaMinima > apuestaMaxima) {
      throw new Error("\nLa apuesta minima no puede ser mayor que la apuesta maxima.");
    }
    this.apuestaMin = apuestaMinima;
    this.apuestaMax = apuestaMaxima;
    this.filas = 3;
    this.columnas = 3;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getSaldoDisponible(): number {
    return this.saldoDisponible;
  }

  public getApuestaMin(): number {
    return this.apuestaMin;
  }

  public getApuestaMax(): number {
    return this.apuestaMax;
  }

  public getSimbolos(): string[] {
    return this.simbolos;
  }

  getResultadoActual(): string[][] {
    return this.resultadoActual;
  }

  public getFilas(): number {
    return this.filas;
  }

  public getColumnas(): number {
    return this.columnas;
  }

  getApuestaActual(): number {
    return this.apuestaActual;
  }

  public ingresarSaldo(saldo: number): void {
    if (saldo < 0) {
      console.error("\nEl saldo ingresado no puede ser negativo.");
    }
    this.saldoDisponible += saldo;
  }

  public agregarSaldo(jugador: Jugador): number {
    console.log(`\nEl monto del jugador ${jugador.getNombre()} es: $${jugador.getMonto()} `);
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

  public setSaldoDisponible(saldo: number): void { //esto no va?
    this.saldoDisponible = saldo;
  }

  setApuestaActual(apuesta: number): void {
    this.apuestaActual = apuesta;
  }

  protected setSaldoInicial(jugador: Jugador): void {
    console.log(`\nEl monto del jugador ${jugador.getNombre()} es: $${jugador.getMonto()} `);
    let saldoInicial: number = validarSaldoInicial(this.getApuestaMin());
    if (saldoInicial === 0) {
      return;
    }

    let cargar: boolean = jugador.cargarJuego(saldoInicial);
    if (cargar) {
      this.ingresarSaldo(saldoInicial);
    } else {
      this.setSaldoInicial(jugador);
    }
  }

  protected setResultadoActual(): void {
    this.girar();
  }

  obtenerSimbolosAleatorios(): string {
    const index = Math.floor(Math.random() * this.simbolos.length);
    return this.getSimbolos()[index];
  }

  public girar(): void {
    let resultado: string[][] = [];

    for (let i = 0; i < this.getFilas(); i++) {
      let filaSimbolos: string[] = [];
      for (let j = 0; j < this.getColumnas(); j++) {
        const simbolo = this.obtenerSimbolosAleatorios();
        filaSimbolos.push(simbolo);
      }
      resultado.push(filaSimbolos);
    }
    this.resultadoActual = resultado;
  }


  public mostrarResultado(): void {
    console.log(`\n`)
    for (let i = 0; i < this.getFilas(); i++) {
      console.log(`${this.getResultadoActual()[i][0]} | ${this.getResultadoActual()[i][1]} | ${this.getResultadoActual()[i][2]}`);
    }
  }

  public validarApuesta(monto: number): boolean {
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

  abstract jugar(jugadores: Jugador[]): void;

  public abstract apostar(): void;

  abstract calcularPremio(lineasApostadas: number, inBonus: boolean): void;
}