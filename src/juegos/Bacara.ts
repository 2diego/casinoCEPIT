import { JuegoDeCartas } from "./JuegoDeCartas";
import { Carta } from "../utils/Carta";
import { Mazo } from "../utils/Mazo";
import * as readlineSync from "readline-sync";

export class Bacara extends JuegoDeCartas {
  private tipoApuesta: string = "";

  public calcularPremio(resultado: "jugador" | "banca" | "empate"): void {
    let premio: number = 0;
    if (resultado === "jugador") {
      if (this.tipoApuesta.includes("jugador")) {
        premio = this.getApuestaActual() * 2;
        console.log(`\nEl jugador gana $${premio} por haber apostado al ${resultado}.`);
        this.ingresarSaldo(premio);
      }
    } else if (resultado === "banca") {
      if (this.tipoApuesta.includes("banca")) {
        premio = this.getApuestaActual() * 1.5;
        console.log(`\nEl jugador gana $${premio} por haber apostado a la ${resultado}.`);
        this.ingresarSaldo(premio);
      }
    } else if (resultado === "empate") {
      if (this.tipoApuesta.includes("empate")) {
        premio = this.getApuestaActual() * 8;
        console.log(`\nEl jugador gana $${premio} por haber apostado al ${resultado}.`);
        this.ingresarSaldo(premio);
      }
    }
    if (premio === 0) {
      console.log(`\nNo hubo apuestas ganadoras.`);
    }
  }

  public juego(): void {

    let enJuego: boolean = true;

    while (enJuego) {
      let elegirApuesta: number = readlineSync.questionInt(`\nSeleccion una apuesta:
        1-Jugador
        2-Banca
        3-Empate
\nSu eleccion: `);

      while (elegirApuesta < 1 || elegirApuesta > 3) {
        console.log("\nEl numero ingresado debe ser entre 1 y 3, intente nuevamente.");
        elegirApuesta = readlineSync.questionInt(`\nSeleccion una apuesta:
          1-Jugador
          2-Banca
          3-Empate
\nSu eleccion: `);
      }

      switch (elegirApuesta) {
        case 1:
          this.tipoApuesta = "jugador";
          break;
        case 2:
          this.tipoApuesta = "banca";
          break;
        case 3:
          this.tipoApuesta = "empate";
          break;
      }

      let jugadorMano: Carta[] = [];
      let crupierMano: Carta[] = [];

      for (let i = 0; i < 2; i++) {
        jugadorMano.push(this.getMazo().repartirCarta());
        crupierMano.push(this.getMazo().repartirCarta());
      }

      let puntajeJugador: number = 0;
      let puntajeCrupier: number = 0;

      puntajeJugador = jugadorMano[0].calcularValor() + jugadorMano[1].calcularValor();
      puntajeCrupier = crupierMano[0].calcularValor() + crupierMano[1].calcularValor();

      while (puntajeJugador > 9) {
        puntajeJugador -= 10;
      }
      while (puntajeCrupier > 9) {
        puntajeCrupier -= 10;
      }

      this.mostrarMano(jugadorMano, "jugador");

      console.log(`La suma de las cartas del jugador es: ${puntajeJugador}`);

      if ((puntajeJugador) === 8 || puntajeJugador === 9) {//jugador mano natural
        console.log(`\nEl jugador tiene una mano natural! No se reparten mas cartas.`);
        this.mostrarMano(crupierMano, "crupier");
        console.log(`La suma de las cartas de la banca es: ${puntajeCrupier}`);
        if (puntajeJugador === puntajeCrupier) {
          console.log(`\nEmpate! El jugador y la banca tienen ${puntajeJugador} natural.`);
          this.calcularPremio("empate");
          enJuego = false;
          continue;
        } else if (puntajeJugador === 8 && puntajeCrupier === 9) {
            console.log(`\nGana la banca!`);
            this.calcularPremio("banca");
            enJuego = false;
            continue;
          } else {
              console.log(`\nGana el jugador!`);
              this.calcularPremio("jugador");
              enJuego = false;
              continue;
            }
      }

      if (puntajeCrupier === 8 || puntajeCrupier === 9) { //crupier mano natural
        console.log(`\nLa banca tiene una mano natural! No se reparten mas cartas.`);
        this.mostrarMano(crupierMano, "crupier");
        console.log(`\nLa suma de las cartas de la banca es: ${puntajeCrupier}`);
        this.mostrarMano(jugadorMano, "jugador");
        console.log(`\nLa suma de las cartas del jugador es: ${puntajeJugador}`);
        console.log(`\nGana la banca!`);
        this.calcularPremio("banca");
        enJuego = false;
        continue;
      }

      if (puntajeJugador === 6 || puntajeJugador === 7) { //jugador mano 6 o 7 se planta
        console.log(`\nCon 6 o 7 debe plantarse, no puede pedir la tercera carta.`);
      }
      
      if (puntajeJugador < 6) { //jugador menos de 6 tercera carta
        console.log(`\nEl jugador suma menos de 6, debe pedir la tercera carta.`);
        let terceraCarta: Carta = this.getMazo().repartirCarta();
        console.log(`\nLa tercera carta es: ${terceraCarta.getCartaMostrada()}`);
        jugadorMano.push(terceraCarta);
        puntajeJugador += terceraCarta.calcularValor();
        while (puntajeJugador > 9) {
          puntajeJugador -= 10;
        }
        console.log(`\nLa suma de las cartas del jugador es: ${puntajeJugador}`);
      }
      
      if (puntajeCrupier === 7) { //crupier tiene 7 se planta
        this.mostrarMano(crupierMano, "crupier");
        console.log(`\nLa banca tiene 7 y debe plantarse.`);
      }
      
      //reglas tercera carta crupier
      if (jugadorMano.length === 2) { // Si el jugador no tomó una tercera carta
        if (puntajeCrupier <= 5) { //menos de 5 pide siempre
          this.mostrarMano(crupierMano, "crupier");
          console.log(`\nLa banca tiene ${puntajeCrupier} y debe tomar una tercera carta.`);
          const terceraCartaCrupier: Carta = this.getMazo().repartirCarta();
          console.log(`\nLa tercera carta de la banca es: ${terceraCartaCrupier.getCartaMostrada()}`);
          crupierMano.push(terceraCartaCrupier);
          puntajeCrupier += terceraCartaCrupier.calcularValor();
          while (puntajeCrupier > 9) {
            puntajeCrupier -= 10;
          }
        } else if (puntajeCrupier >= 6) {
          this.mostrarMano(crupierMano, "crupier");
          console.log(`\nLa banca tiene ${puntajeCrupier} y debe plantarse.`);
        }
      } else {
        if (puntajeCrupier < 7) { //crupier menos de 7 y jugador tiene 3 cartas
          if (puntajeCrupier <= 2) { //crupier menos de 3 pide tercera
            this.mostrarMano(crupierMano, "crupier");
            console.log(`\nLa banca tiene ${puntajeCrupier} y debe tomar una tercera carta.`);
            const terceraCartaCrupier: Carta = this.getMazo().repartirCarta();
            console.log(`\nLa tercera carta de la banca es: ${terceraCartaCrupier.getCartaMostrada()}`);
            crupierMano.push(terceraCartaCrupier);
            puntajeCrupier += terceraCartaCrupier.calcularValor();
            while (puntajeCrupier > 9) {
              puntajeCrupier -= 10;
            }
          } else if (puntajeCrupier === 3 && jugadorMano.length === 3 && jugadorMano[2].calcularValor() !== 8) { //crupier tiene 3 y jugador con tres cartas y la tercera no es 8
              this.mostrarMano(crupierMano, "crupier");
              console.log(`\nLa banca tiene 3 y debe tomar una tercera carta porque la tercera carta del jugador no es un 8.`);
              const terceraCartaCrupier: Carta = this.getMazo().repartirCarta();
              console.log(`\nLa tercera carta de la banca es: ${terceraCartaCrupier.getCartaMostrada()}`);
              crupierMano.push(terceraCartaCrupier);
              puntajeCrupier += terceraCartaCrupier.calcularValor();
              while (puntajeCrupier > 9) {
                puntajeCrupier -= 10;
              }
            } else if (puntajeCrupier === 4 && jugadorMano.length === 3 && [2, 3, 4, 5, 6, 7].includes(jugadorMano[2].calcularValor())) {//crupier tiene 4 y jugador con tres cartas y la tercera esta entre 2 y 7
                this.mostrarMano(crupierMano, "crupier");
                console.log(`\nLa banca tiene 4 y debe tomar una tercera carta porque la tercera carta del jugador está entre 2 y 7.`);
                const terceraCartaCrupier: Carta = this.getMazo().repartirCarta();
                console.log(`\nLa tercera carta de la banca es: ${terceraCartaCrupier.getCartaMostrada()}`);
                crupierMano.push(terceraCartaCrupier);
                puntajeCrupier += terceraCartaCrupier.calcularValor();
                while (puntajeCrupier > 9) {
                  puntajeCrupier -= 10;
                }
              } else if (puntajeCrupier === 5 && jugadorMano.length === 3 && [4, 5, 6, 7].includes(jugadorMano[2].calcularValor())) {//crupier tiene 5 y jugador con tres cartas y la tercera esta entre 4 y 7
                  this.mostrarMano(crupierMano, "crupier");
                  console.log(`\nLa banca tiene 5 y debe tomar una tercera carta porque la tercera carta del jugador está entre 4 y 7.`);
                  const terceraCartaCrupier: Carta = this.getMazo().repartirCarta();
                  console.log(`\nLa tercera carta de la banca es: ${terceraCartaCrupier.getCartaMostrada()}`);
                  crupierMano.push(terceraCartaCrupier);
                  puntajeCrupier += terceraCartaCrupier.calcularValor();
                  while (puntajeCrupier > 9) {
                    puntajeCrupier -= 10;
                  }
                } else if (puntajeCrupier === 6 && jugadorMano.length === 3 && [6, 7].includes(jugadorMano[2].calcularValor())) {//crupier tiene 6 y jugador con tres cartas y la tercera es 6 o 7
                    this.mostrarMano(crupierMano, "crupier");
                    console.log(`\nLa banca tiene 6 y debe tomar una tercera carta porque la tercera carta del jugador es 6 o 7.`);
                    const terceraCartaCrupier: Carta = this.getMazo().repartirCarta();
                    console.log(`\nLa tercera carta de la banca es: ${terceraCartaCrupier.getCartaMostrada()}`);
                    crupierMano.push(terceraCartaCrupier);
                    puntajeCrupier += terceraCartaCrupier.calcularValor();
                    while (puntajeCrupier > 9) {
                      puntajeCrupier -= 10;
                    }
                  } else {//crupier tiene 7 o menos pero no puede pedir la tercera carta
                      this.mostrarMano(crupierMano, "crupier");
                      console.log(`\nLa banca debe plantarse con un puntaje de ${puntajeCrupier}.`);
                  }
        }
      }

      
      console.log(`\nPuntaje final del jugador: ${puntajeJugador}`);
      console.log(`Puntaje final de la banca: ${puntajeCrupier}`);
      
      if (puntajeJugador > puntajeCrupier) {
        console.log(`\nEl jugador gana con ${puntajeJugador} contra ${puntajeCrupier}.`);
        this.calcularPremio("jugador");
      } else if (puntajeCrupier > puntajeJugador) {
        console.log(`\nLa banca gana con ${puntajeCrupier} contra ${puntajeJugador}.`);
        this.calcularPremio("banca");
      } else {
        console.log(`\nEmpate! Ambos tienen ${puntajeJugador}.`);
        this.calcularPremio("empate");
      }
      this.setMazo(new Mazo());
      enJuego = false;
    }
  }

}
