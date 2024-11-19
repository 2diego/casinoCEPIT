import { Bonus } from "./Bonus";

export class BonusGirosGratis implements Bonus {
  private cantidadGirosGratis: number;
  constructor(cantidadGirosGratis: number) {
    this.cantidadGirosGratis = cantidadGirosGratis;
  }
  getNombre(): string {
    return "Giros gratis";
  }
  activar(): number {
    console.log(`Se activaron ${this.cantidadGirosGratis} giros gratis.`);//Logica
    let resultado: number = 0;
    return resultado;
  }
}