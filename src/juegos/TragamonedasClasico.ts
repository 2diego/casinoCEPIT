import { Tragamonedas } from "./Tragamonedas";
import { validarSaldoInicial } from "../utils/utils";
import { Jugador } from "../models/Jugador";

export class TragamonedasClasico extends Tragamonedas {


  protected apostar(monto: number): void {
    throw new Error("Method not implemented.");
  }
  protected calcularPremio(): void {
    throw new Error("Method not implemented.");
  }

  public jugar(jugador: Jugador): void {
    
    console.log(`\n---------- Bienvenido a ${this.getNombre()} ----------`);
    
    this.setSaldoInicial(jugador);
    if (this.getSaldoDisponible() === 0) {// Si no se pudo establecer el saldo inicial, retornamos y no se juega
      return;
    }

    let jugando = true;
    while (jugando) {
        //logica del juego si desea salir return jugando = false
    }

    return;
  }

}