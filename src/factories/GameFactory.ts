import { TragamonedasClasico } from "../juegos/TragamonedasClasico";
import { TragamonedasBonus } from "../juegos/TragamonedasBonus";
import { Bacara } from "../juegos/Bacara";
import { Juego } from "../models/Juego";
import { Blackjack } from "../juegos/Blackjack";

interface DetallesTragamonedasClasico  {
  tipo: "tragamonedas-clasico",
  nombre: string,
  simbolos: string[],
  apuestaMin: number,
  apuestaMax: number
}

interface DetallesTragamonedasBonus {
  tipo: "tragamonedas-bonus",
  nombre: string,
  simbolos: string[],
  apuestaMin: number,
  apuestaMax: number
}

interface DetallesBlackjack {
  tipo: "blackjack",
  nombre: string,
  apuestaMin: number,
  apuestaMax: number
}

interface DetallesBacara {
  tipo: "bacara",
  nombre: string,
  apuestaMin: number,
  apuestaMax: number
}
type DetallesJuego = DetallesTragamonedasClasico | DetallesTragamonedasBonus | DetallesBacara | DetallesBlackjack;

export class GameFactory {
  public static crearJuego(detalles: DetallesJuego): Juego | null {
    switch (detalles.tipo) {
      case "tragamonedas-clasico":
        return new TragamonedasClasico(detalles.nombre, detalles.simbolos, detalles.apuestaMin, detalles.apuestaMax);
      case "tragamonedas-bonus":
        return new TragamonedasBonus(detalles.nombre, detalles.simbolos, detalles.apuestaMin, detalles.apuestaMax) as TragamonedasBonus;
      case "blackjack":
       return new Blackjack(detalles.nombre, detalles.apuestaMin, detalles.apuestaMax);
      case "bacara":
        return new Bacara(detalles.nombre, detalles.apuestaMin, detalles.apuestaMax);
      default:
        console.log("\nJuego no encontrado");
        return null;
    }
  }
}