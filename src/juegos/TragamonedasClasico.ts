import { Tragamonedas } from "./Tragamonedas";
import { Jugador } from "../models/Jugador";
import * as readline from 'readline-sync';

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
    let premio:number = 0;//falta verificar apuesta minimina y max
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

  public jugar(jugador: Jugador[]): void {

    //logica de elegir jugador en utils
    
    console.log(`\n---------- Bienvenido a ${this.getNombre()} ----------`);
    
    this.setSaldoInicial(jugador[1]);//esto esta mal
    if (this.getSaldoDisponible() === 0) {// Si no se pudo establecer el saldo inicial, retornamos y no se juega
      return;
    }

    let jugando: boolean = true;
    while (jugando) {
      
      console.log(`\nJugando`);
      let salir: string = readline.question("\nDesea salir? (s/n) ");
      
      while (salir.toLocaleLowerCase() === "n"){ 
        console.log(`\nJugando`);
        salir = readline.question("\nDesea salir? (s/n) ");
      }
      jugando = false;

        //logica del juego si desea salir return jugando = false
        
    }

    return;
  }

}