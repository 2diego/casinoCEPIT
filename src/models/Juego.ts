import { Jugador } from "./Jugador";

export interface Juego {
  
  getNombre(): string;
  ingresarSaldo(saldo: number): void;
  retirarSaldo(saldo: number): void;
  getSaldoDisponible(): number;
  jugar(jugador: Jugador[]): void;
}