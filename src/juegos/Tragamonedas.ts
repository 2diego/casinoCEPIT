import { Jugador } from "../models/Jugador";
import { Juego } from "../models/Juego";

export abstract class Tragamonedas implements Juego {
  private nombre: string;
  private simbolos: string[];
  private saldoDisponible: number;

  constructor(nombre: string) {
    this.nombre = nombre;
    this.simbolos = [];
    this.saldoDisponible = 0;
  }

  getNombre(): string {
    return this.nombre;
  }
  //la plata que juega el jugador
  abstract apostar(monto:number): void;
    
  abstract ingresarSaldo(saldo: number): void;

  abstract retirarSaldo(saldo:number):void;

  abstract verSaldoDisponible(): number;
//logica del juego
  abstract jugar(jugador: Jugador): void;

  abstract calcularPremio(): void;
}