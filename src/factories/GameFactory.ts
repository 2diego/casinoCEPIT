import { TragamonedasClasico } from "../juegos/TragamonedasClasico";
import { TragamonedasBonus } from "../juegos/TragamonedasBonus";
import { Juego } from "../models/Juego";

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

/*interface DetallesBlackjack {
  tipo: "blackjack",
  name: string,
  apuestaMin: number,
  apuestaMax: number
}
*/
type DetallesJuego = DetallesTragamonedasClasico | DetallesTragamonedasBonus; // | DetallesBlackjack

export class GameFactory {
  public static crearJuego(detalles: DetallesJuego): Juego | null {
    switch (detalles.tipo) {
      case "tragamonedas-clasico":
        return new TragamonedasClasico(detalles.nombre, detalles.simbolos, detalles.apuestaMin, detalles.apuestaMax);
      case "tragamonedas-bonus":
        return new TragamonedasBonus(detalles.nombre, detalles.simbolos, detalles.apuestaMin, detalles.apuestaMax) as TragamonedasBonus;
      default:
        console.log("Juego no encontrado");
        return null;
    }
  }
}