import { Tragamonedas } from "../juegos/Tragamonedas";

export interface Bonus {
  getIconoGanador(): string;
  activar(juego: Tragamonedas, lineasApostadas: number): void;
}