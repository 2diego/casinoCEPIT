import { Tragamonedas } from "./Tragamonedas";

export class TragamonedasClasico extends Tragamonedas {


  apostar(monto: number): void {
    throw new Error("Method not implemented.");
  }
  calcularPremio(): void {
    throw new Error("Method not implemented.");
  }
  public jugar(): void {
      //logica del juego
  }

}