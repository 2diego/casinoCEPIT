import { Jugador } from "./Jugador";

export interface Juego {
  
  getNombre(): string;
  ingresarSaldo(saldo: number): void;
  retirarSaldo(saldo: number): void;
  getSaldoDisponible(): number;
  jugar(jugador: Jugador): void;
  /* Los saqué porque interface no puede tener metodos privados
  apostar(monto: number): void;
  calcularPremio(): void;*/
}