import { Jugador } from "../models/Jugador";
import { Juego } from "../models/Juego";

export abstract class Tragamonedas implements Juego {
  private nombre: string;
  private simbolos: string[];
  //Agregue apuesta min y max
  private apuestaMin: number;
  private apuestaMax: number;
  private saldoDisponible: number;

  constructor(nombre: string, simbolos: string[] = [], apuestaMinima: number = 0, apuestaMaxima: number = 0) {
    this.nombre = nombre;
    //Agregue para pasar simbolos en el constructor
    this.simbolos = simbolos;
    this.saldoDisponible = 0;
    //Agregue validacion para apuesta min y max
    if (apuestaMinima < 0 || apuestaMaxima < 0) {
      throw new Error("Las apuestas minima y maxima no pueden ser negativas.");
    }
    if (apuestaMaxima > 0 && apuestaMinima > apuestaMaxima) {
      throw new Error("La apuesta minima no puede ser mayor que la apuesta maxima.");
    }
    this.apuestaMin = apuestaMinima;
    this.apuestaMax = apuestaMaxima;
  }

  public getNombre(): string {
    return this.nombre;
  }

  //Saque de abstract verSaldoDisponible y lo hice public
  public getSaldoDisponible(): number {
    return this.saldoDisponible;
  }

  //Hice ingresarSaldo public, se puede ingresar cualq saldo y se valida la apuesta
  public ingresarSaldo(saldo: number): void {
    if (saldo < 0) {
      throw new Error("El saldo ingresado no puede ser negativo.");
    }
    this.saldoDisponible += saldo;
  }

  //Hice retirarSaldo public
  public retirarSaldo(): number {
    const saldoRetirar = this.saldoDisponible;
    this.saldoDisponible = 0;
    return saldoRetirar;
  }

  //logica del juego
  abstract jugar(jugador: Jugador): void;
  
  //Metodos privados que cambian dependiendo de la logica del juego y se usan en jugar()
  protected abstract apostar(monto:number): void;
  
  protected abstract calcularPremio(): void;
}