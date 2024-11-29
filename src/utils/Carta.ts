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

  calcularValor(juego: Juego): number {
      let valorSinSimbolo: string = this.cartaMostrada.substring(0, this.cartaMostrada.length - 1);
      if (valorSinSimbolo === "A") {
        switch (juego.getNombre()) {
          case "Blackjack":
            return 11;
          case "Bacara":
            return 1;
          }
        } else if (valorSinSimbolo === "J" || valorSinSimbolo === "Q" || valorSinSimbolo === "K") {
            switch (juego.getNombre()) {
              case "Blackjack":
                return 10;
              case "Bacara":
                return 0;
              }
          }
      return parseInt(valorSinSimbolo);
    }
  }



export type Palo = "♥️" | "♦️" | "♣️" | "♠️";