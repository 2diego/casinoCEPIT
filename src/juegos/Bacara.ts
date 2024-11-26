import { Juego } from "../models/Juego";
import { Jugador } from "../models/Jugador";
import { validarSaldoInicial } from "../utils/utils";

class Bacara implements Juego {
    private nombre: string;
    private saldoDisponible: number;
    private cartas: string[];
    // private apuestaMin: number;
    // private apuestaMax: number;

    constructor(cartas: string[]/*,apuestaMin: number = 0, apuestaMax: number = 0*/) {
        this.nombre = "Bacara";
        this.saldoDisponible = 0;
        this.cartas = cartas;
        // if (apuestaMin < 0 || apuestaMax < 0) {
        //     throw new Error("Las apuestas minima y maxima no pueden ser negativas.");
        //   }
        //   if (apuestaMax > 0 && apuestaMin > apuestaMax) {
        //     throw new Error("La apuesta minima no puede ser mayor que la apuesta maxima.");
        //   }
        //   this.apuestaMin = apuestaMin;
        //   this.apuestaMax = apuestaMax;
    }
    
    getNombre(): string {
        return this.nombre;
    }
    
    getSaldoDisponible(): number {
        return this.saldoDisponible;
    }
    
    // getApuestaMin(): number {
    //     return this.apuestaMin;
    // }
    
    // getApuestaMax(): number {
    //     return this.apuestaMax;
    // }
    
    getCartas(): string[] {
        return this.cartas;
    }
    
    ingresarSaldo(saldo: number): void {
        throw new Error("Method not implemented.");
    }
    retirarSaldo(jugador: Jugador): void {
        throw new Error("Method not implemented.");
    }
    jugar(jugador: Jugador[]): void {
        throw new Error("Method not implemented.");
    }
}