import { Bonus } from "../bonus/Bonus";
import { Tragamonedas } from "./Tragamonedas";
import { Jugador } from "../models/Jugador";

export abstract class TragamonedasBonus extends Tragamonedas {
  private bonus: Bonus[] = [];

  public getBonus(name: string): Bonus[] {
    return this.bonus.filter((bonus) => bonus.getNombre() === name);
  }

  public agregarBonus(bonus: Bonus): void {
    this.bonus.push(bonus);
  }

  protected jugarBonus(bonus: Bonus, jugador: Jugador): void {
    let resultado: number = bonus.activar();
    jugador.sumarGanancia(resultado);
  }
}