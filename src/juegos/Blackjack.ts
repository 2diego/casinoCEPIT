import { Mazo } from "../utils/Mazo";
import { Carta } from "../utils/Carta";
import { pideCarta, juegaDeNuevo } from "../utils/utils";
import { JuegoDeCartas } from "./JuegoDeCartas";

export class Blackjack extends JuegoDeCartas {
  calcularPremio(tipoPremio: string): number {
    let premio: number = 0;
    if (tipoPremio === "x2") {
      premio = this.getApuestaActual() * 2;
    } else if (tipoPremio === "x5") {
      premio = this.getApuestaActual() * 5;
    } else if (tipoPremio === "empate") {
      premio = this.getApuestaActual();
    } else if (tipoPremio === "perder") {
      premio = 0;
    }
    return premio;
  }

  juego(): void {
    let enBlackjack: boolean = true;

    while (enBlackjack) {
      let jugadorMano: Carta[] = [];
      let crupierMano: Carta[] = [];

      for (let i = 0; i < 2; i++) {
        jugadorMano.push(this.getMazo().repartirCarta());
        crupierMano.push(this.getMazo().repartirCarta());
      }

      jugadorMano.forEach((carta) =>
        console.log("Su carta es: " + carta.getCartaMostrada())
      );
      console.log(
        "La primera carta del Crupier es: " + crupierMano[0].getCartaMostrada()
      );
      console.log(`\nCarta oculta del Crupier`);

      let puntajeJugador: number = 0;
      let puntajeCrupier: number = 0;

      puntajeJugador =
        jugadorMano[0].calcularValor() + jugadorMano[1].calcularValor();
      puntajeCrupier =
        crupierMano[0].calcularValor() + crupierMano[1].calcularValor();

      let jugadorSePlanta: boolean = false;
      let JugadorBlackjack: boolean = false;
      let CrupierBlackjack: boolean = false;
      
      // Verificar ganador por blackjack
      if (puntajeJugador === 21) {
        console.log("\nBLACKJACK!");
        jugadorSePlanta = true;
        JugadorBlackjack = true;
        break;
      }

      while (!jugadorSePlanta && !JugadorBlackjack) {

        if (puntajeJugador === 22) {
          jugadorMano[0].setValor(1);
          puntajeJugador -= 10;
        }
        if (puntajeCrupier === 22) {
          crupierMano[0].setValor(1);
          puntajeCrupier -= 10;
        }

        // Jugador no tiene blackjack y puede pedir carta
        while (puntajeJugador <= 21 && !jugadorSePlanta) {
          // Turno del jugador
          while (!jugadorSePlanta) {
            console.log(`\nSu puntaje es: ${puntajeJugador}`);
            let respuesta: string = pideCarta();
            // Jugador planta
            if (respuesta.toLowerCase() === "n") {
              jugadorSePlanta = true;
              break;
            }
            // Jugador pide carta y bucle hasta que pierda o se plante
            let carta: Carta = this.getMazo().repartirCarta();
            jugadorMano.push(carta);
            puntajeJugador +=
              jugadorMano[jugadorMano.length - 1].calcularValor();
            console.log(carta.getCartaMostrada());

            while (puntajeJugador > 21 && !jugadorSePlanta) {
              for (let i = 0; i < jugadorMano.length; i++) {
                if (jugadorMano[i].getValor() === 11) {
                  jugadorMano[i].setValor(1);
                  puntajeJugador -= 10;
                }
              }
              if (puntajeJugador > 21) {
                console.log(`\nSu puntaje es: ${puntajeJugador}`);
                console.log(`\nPerdiste, su puntaje es mayor a 21`); // Jugador pierde
                jugadorSePlanta = true;
                break;
              }
            }
          }
        }
      }

      // Jugador planta y prosigue el turno del Crupier
      console.log(`\nLa carta del Crupier es: ${crupierMano[1].getCartaMostrada()}`); // Mostrar segunda carta del Crupier
      console.log(`\nEl Crupier tiene un puntaje de: ${puntajeCrupier}`);
      if (puntajeCrupier === 21) {
        // Crupier tiene blackjack
        console.log(`\nEl Crupier tiene un blackjack`);
        CrupierBlackjack = true;
      }

      if (jugadorSePlanta && !CrupierBlackjack) {
        while (puntajeCrupier < 17) {
          // Crupier pide carta
          let carta: Carta = this.getMazo().repartirCarta();
          crupierMano.push(carta);
          puntajeCrupier += crupierMano[crupierMano.length - 1].calcularValor();
          console.log(`\nLa carta del Crupier es: ${crupierMano[crupierMano.length - 1].getCartaMostrada()}`); // Mostrar ultima carta del Crupier
          while (puntajeCrupier	 > 21) {
            for (let i = 0; i < crupierMano.length; i++) {
              if (crupierMano[i].getValor() === 11) {
                crupierMano[i].setValor(1);
                puntajeCrupier -= 10;
              }
            }
          }
          console.log(`\nEl Crupier tiene un puntaje de: ${puntajeCrupier}`);
          if (puntajeCrupier > 21) {
          console.log("\nEl Crupier se paso de 21"); // Crupier pasa de 21
          break;
          }
        }
      }

      //Hasta aca anda

      if (JugadorBlackjack && CrupierBlackjack) {
        //calcularPremio(JugadorBlackjacl)
        // Ambos jugadores tienen blackjack
        console.log("\nEs un empate.");
        console.log(`\nSe devuelve $${this.getApuestaActual()} al jugador.`);
        this.ingresarSaldo(this.calcularPremio("empate"));
      } else if (JugadorBlackjack && !CrupierBlackjack) {
        // El jugador tiene blackjack
        console.log("\n¡Felicidades! Ganaste esta ronda.");
        console.log(`\nHas ganado $${this.calcularPremio("x5")}.`);
        this.ingresarSaldo(this.calcularPremio("x5"));
      } else if (!JugadorBlackjack && CrupierBlackjack) {
        // El crupier tiene blackjack
        console.log("\nEl Crupier ganó esta ronda.");
        console.log(`\nHas perdido $${this.getApuestaActual()}.`);
        this.ingresarSaldo(this.calcularPremio("perder"));
      }

      if (puntajeJugador <= 21 && puntajeCrupier <= 21) {
        //calcularPremio
        // Validaciones cuando ambos jugadores tienen menos de 21
        if (puntajeJugador > puntajeCrupier) {
          console.log("\n¡Felicidades! Ganaste esta ronda.");
          console.log(`\nHas ganado $${this.calcularPremio("x2")}.`);
          this.ingresarSaldo(this.calcularPremio("x2"));
        } else if (puntajeJugador < puntajeCrupier) {
          console.log("\nEl Crupier ganó esta ronda.");
          console.log(`\nHas perdido $${this.getApuestaActual()}.`);
          this.ingresarSaldo(this.calcularPremio("perder"));
        } else {
          console.log("\nEs un empate.");
          console.log(`\nSe devuelve $${this.getApuestaActual()} al jugador.`);
          this.ingresarSaldo(this.calcularPremio("empate"));
        }
      }
      this.setMazo(new Mazo());
      enBlackjack = false;
    }
  }
}
