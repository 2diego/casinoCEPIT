import { Tragamonedas } from "../juegos/Tragamonedas";

export interface Bonus {
  getIconoGanador(): string;
  activar(juego: Tragamonedas, apuestas: number, lineasApostadas: number): void;
}