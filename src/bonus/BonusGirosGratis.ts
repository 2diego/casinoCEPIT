import { Bonus } from "./Bonus";
import { Tragamonedas } from "../juegos/Tragamonedas";

export class BonusGirosGratis implements Bonus {
  private iconoGanador: string;
  private cantidadGirosGratis: number;
  constructor(iconoGanador: string, cantidadGirosGratis: number) {
    this.iconoGanador = iconoGanador;
    this.cantidadGirosGratis = cantidadGirosGratis;
  }
  getIconoGanador(): string {
    return this.iconoGanador;
  }
  activar(juego: Tragamonedas, lineasApostadas: number): void {
    console.log(`\nSe activaron ${this.cantidadGirosGratis} giros gratis.`);
    for (let i = 0; i < this.cantidadGirosGratis; i++) {
      console.log(`\nGiro gratis N° ${i + 1}`);
      juego.apostar(true);
    }
  }
}