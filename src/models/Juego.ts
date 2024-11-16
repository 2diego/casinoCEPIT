import { Jugador } from "./Jugador";

export interface Juego {
  
  getNombre(): string;
  ingresarSaldo(saldo: number): void;
  retirarSaldo(saldo: number): void;
  verSaldoDisponible(): number;
  apostar(monto: number): void;
  jugar(jugador: Jugador): void;
}