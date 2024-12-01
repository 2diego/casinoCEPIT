import { Juego } from "../models/Juego";

export class Carta {
  private simbolo: Palo;
  private valor: number;
  private cartaMostrada: string;

  constructor(simbolo: Palo, valor: number) {
      this.simbolo = simbolo;        
      this.valor = valor;
      this.cartaMostrada = this.mostrarCarta();
  }

  getValor() {
      return this.valor;
  }

  getSimbolo() {        
      return this.simbolo;
  }

  getCartaMostrada() {
      return this.cartaMostrada;
  }

  mostrarCarta() {
      if (this.valor === 1) {
          return "A" + this.simbolo;
      } else if (this.valor === 11) {
          return "J" + this.simbolo;
      } else if (this.valor === 12) {
          return "Q" + this.simbolo;
      } else if (this.valor === 13) {
          return "K" + this.simbolo;
      } else {
          return this.cartaMostrada = this.valor.toString() + this.simbolo;
      } 
  }

  calcularValor(): number {
      let valorSinSimbolo: string = this.cartaMostrada.replace(/[^\dA-Z]/g, ""); 
      if (valorSinSimbolo === "A") {
        return 11;
        } else if (valorSinSimbolo === "J" || valorSinSimbolo === "Q" || valorSinSimbolo === "K") {
            return 10;
          }
      return parseInt(valorSinSimbolo);
    }
  }



export type Palo = "♥️" | "♦️" | "♣️" | "♠️";