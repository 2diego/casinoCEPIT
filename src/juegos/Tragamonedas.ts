import { Jugador } from "../models/Jugador";
import { Juego } from "../models/Juego";
import { validarSaldoInicial } from "../utils/utils";

export abstract class Tragamonedas implements Juego {
  private nombre: string;
  private simbolos: string[];
  //agregue simbolos otro para que se guarden los simbolos que se crean al girar
  // private simbolosGenerados: string[] = [];
  private apuestaMin: number;
  private apuestaMax: number;
  private saldoDisponible: number;
  protected filas: number;
   //agregue apuestaActual 
  private apuestaActual: number = 0;
 

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
  //agregue getsimbolosGenerados
  // getSimbolosGenerados(): string[] {
  //   return this.simbolosGenerados;
  // }
  
  public getFilas(): number {
    return this.filas;
  }
  //Agregue getApuestaActual
  getApuestaActual(): number {
    return this.apuestaActual;
  }

  public ingresarSaldo(saldo: number): void {//mejorar validacion
    if (saldo < 0) {
      throw new Error("\nEl saldo ingresado no puede ser negativo.");
    }
    this.saldoDisponible += saldo;
  }


  
  //agregue cuanto retira el jugador e hice que se le sume al monto del jugador
  public retirarSaldo(jugador: Jugador): number {
    const saldoRetirar = this.saldoDisponible;
    this.saldoDisponible = 0;
    jugador.sumarGanancia(saldoRetirar);
    console.log(`\nHas retirado: $${saldoRetirar}`);
    return saldoRetirar;
  }

  public setSaldoDisponible(saldo: number): void {
    this.saldoDisponible = saldo;
  }

  //agregue setApuestaActual
  setApuestaActual(apuesta: number): void {
    this.apuestaActual = apuesta;
  }
  protected setSaldoInicial(jugador: Jugador): void {
    let saldoInicial: number = validarSaldoInicial(this.getApuestaMin());
    if (saldoInicial === 0) {
      return;
    }

    let cargar: boolean = jugador.cargarJuego(saldoInicial);
    if (!cargar) {
      console.log(`\nNo cuenta con saldo suficiente para jugar ${this.getNombre()}.`);
      return;
    }

    this.ingresarSaldo(saldoInicial);
  }

  obtenerSimbolosAleatorios(): string {
    const index = Math.floor(Math.random() * this.simbolos.length);
    return this.simbolos[index];
  }

  public girar(): string[][] {
    let resultado: string[][] = [];

    for (let i = 0; i < this.getFilas(); i++) {
      let filaSimbolos: string[] = [];
      for (let j = 0; j < 3; j++) {
        const simbolo = this.obtenerSimbolosAleatorios();
        filaSimbolos.push(simbolo);
      }
      resultado.push(filaSimbolos);
    }
    return resultado;
  }

  
  public mostrarResultado(resultado: string[][]): void {
    for (let i = 0; i < this.getFilas() ; i++) {
      console.log(`${resultado[i][0]} | ${resultado[i][1]} | ${resultado[i][2]}`);
    }
  }

  public validarApuesta(monto: number): boolean {
    if (monto <= 0) {
      console.log("\nLa apuesta debe ser mayor a 0.");
      return false;
    }
    if (this.getSaldoDisponible() < monto) {
      console.log("\nNo cuenta con saldo suficiente para apostar.");
      return false;
    }
    if (this.getApuestaMin() > 0 && monto < this.getApuestaMin()) {
      console.log("\nLa apuesta debe ser mayor a la apuesta minima.");
      return false;
    }
    if (this.getApuestaMax() > 0 && monto > this.getApuestaMax()) {
      console.log("\nLa apuesta debe ser menor a la apuesta maxima.");
      return false;
    }
    return true
  }

  abstract jugar(jugador: Jugador[]): void;

  //Metodos privados que cambian dependiendo de la logica del juego y se usan en jugar()
  protected abstract apostar(monto: number): void;
  /*validarApuesta publica?
  en apostar se elijen detalles de la apuesta, se calcula monto final, if (validarApuesta(monto)) { 
  setSaldoDisponible, girar, mostrarResultado, calcularPremio, ingresarSaldo }
  */

  protected abstract calcularPremio(resultado: string[][],apuesta: number): void;
}