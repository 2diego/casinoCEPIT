import { Juego } from "../models/Juego";
import { Jugador } from "../models/Jugador";
import { validarSaldoInicial } from "../utils/utils";

class Blackjack implements Juego {
    private nombre: string;
    private saldoDisponible: number;
    private cartas: string[];
    private apuestaMin: number;
    private apuestaMax: number;

    constructor(cartas: string[],apuestaMin: number = 0, apuestaMax: number = 0) {
        this.nombre = "Blackjack";
        this.saldoDisponible = 0;
        this.cartas = cartas;
        if (apuestaMin < 0 || apuestaMax < 0) {
            throw new Error("Las apuestas minima y maxima no pueden ser negativas.");
          }
          if (apuestaMax > 0 && apuestaMin > apuestaMax) {
            throw new Error("La apuesta minima no puede ser mayor que la apuesta maxima.");
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

    getCartas(): string[] {
        return this.cartas;
    }

    ingresarSaldo(saldo: number): void {
        if (saldo < 0) {
            throw new Error("El saldo ingresado no puede ser negativo.");
        }
        this.saldoDisponible += saldo;
    }

    ingresarSaldoInicial(saldoInicial: number): void {
        if (saldoInicial < this.getApuestaMin()) {
          throw new Error("El saldo ingresado no puede ser menor que la apuesta minima.");
        }
        this.ingresarSaldo(saldoInicial);
      }

    setSaldoInicial(jugador: Jugador): void {
        let saldoInicial: number = validarSaldoInicial(this.getApuestaMin()); 
        if (saldoInicial === 0) {
          return;
        }
        
        let cargar: boolean = jugador.cargarJuego(saldoInicial); 
        if (!cargar) {
          console.log(`\nNo cuenta con saldo suficiente para jugar ${this.getNombre()}.`);
          return;
        }
    
        this.ingresarSaldoInicial(saldoInicial);
      }
    

    retirarSaldo(saldo: number): boolean {
        if (saldo < 0) {
            throw new Error("El saldo a retirar no puede ser negativo.");
        }
        if (saldo > this.saldoDisponible) {
            throw new Error("Saldo insuficiente.");
        }
        this.saldoDisponible -= saldo;
        return true;
        }
        
    jugar(jugador: Jugador[]): void {
        console.log(`\n---------- Bienvenido a ${this.getNombre()} ----------`);
        
        this.setSaldoInicial(jugador[0]);//ver que jugador va a jugar
        if (this.getSaldoDisponible() === 0) { // Si no se pudo establecer el saldo inicial, retornamos y no se juega
            return;
        }
        let jugando = true;
        while (jugando) {
            
        }
        
        return;
    }
}
