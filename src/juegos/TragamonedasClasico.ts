import { Tragamonedas } from "./Tragamonedas";
import { validarSaldoInicial } from "../utils/utils";
import { Jugador } from "../models/Jugador";

export class TragamonedasClasico extends Tragamonedas {


  protected apostar(monto: number): void {
    if(monto < this.getApuestaMin() || monto > this.getApuestaMax()){
      console.log(`La apuesta debe ser $${this.getApuestaMin()} o $${this.getApuestaMax()}.`);
    }else{
      this.setSaldoDisponible(monto);}
    // throw new Error("Method not implemented.");
  }
  protected calcularPremio(): void {
    // throw new Error("Method not implemented.");
    let premio:number = 0;
    if(this.getSimbolos()[0] === this.getSimbolos()[1] && this.getSimbolos()[1] === this.getSimbolos()[2]){
      premio = this.getApuestaMin() * 3;
    
    }else if(this.getSimbolos()[0] === this.getSimbolos()[1] && this.getSimbolos()[1] === this.getSimbolos()[2]){
      premio = this.getApuestaMax() * 5;
    }
    else{
      premio = 0;
    }
    this.ingresarSaldo(premio);
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