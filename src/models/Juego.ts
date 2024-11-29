import { Jugador } from "./Jugador";

export interface Juego {
  
  getNombre(): string;
  ingresarSaldo(saldo: number): void;
  retirarSaldo(jugador:Jugador): void;
  getSaldoDisponible(): number;
  jugar(jugador: Jugador[]): void;
  getApuestaMin(): number;
  getApuestaMax(): number;
}