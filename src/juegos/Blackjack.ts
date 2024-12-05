import { Mazo } from "../utils/Mazo";
import { Carta } from "../utils/Carta";
import { pideCarta, juegaDeNuevo, apuestaSegura } from "../utils/utils";
import { JuegoDeCartas } from "./JuegoDeCartas";

export class Blackjack extends JuegoDeCartas {
  calcularPremio(tipoPremio: string): number {
    let premio: number = 0;
    if (tipoPremio === "x2") {
      premio = this.getApuestaActual() * 2;
    } else if (tipoPremio === "x3") {
      premio = this.getApuestaActual() * 3;
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
      let jugadorBlackjack: boolean = false;
      let crupierBlackjack: boolean = false;

      // Verificar ganador por blackjack
      if (puntajeJugador === 21) {
        console.log("\nBLACKJACK!");
        jugadorSePlanta = true;
        jugadorBlackjack = true;
      }

      if (crupierMano[0].getValor() === 11) {
        let posbileBlackjack = crupierMano[1].getValor();
        let maximoSeguro = this.getApuestaActual() / 2;
        console.log(`\nEl Crupier tiene un As, realice una apuesta segura entre 0 y ${maximoSeguro}.`);
        let seguro = apuestaSegura();
        this.saldoDisponible -= seguro;
        while (seguro < 0 || seguro > maximoSeguro) {
          console.log(`\nEl valor ingresado no es valido, ingrese un valor entre 0 y ${maximoSeguro}.`);
          seguro = apuestaSegura();
        }
        if (seguro === 0) {
          console.log(`\nNo se realizo ninguna apuesta segura, el juego continua.`);
        } else if (seguro > 0 && posbileBlackjack === 10 || posbileBlackjack === 11 || posbileBlackjack === 12 || posbileBlackjack === 13) {
          console.log(`\nLa carta oculta del Crupier es: ${crupierMano[1].getCartaMostrada()}`);
          console.log(`\nEl Crupier tiene blackjack.`);
          this.apuestaActual = seguro;
          this.ingresarSaldo(this.calcularPremio("x2"));
          enBlackjack = false;
          continue;
        } else {
          console.log(`\nEl Crupier no tiene blackjack has perdido $${seguro}.`);
          console.log(`\nEl juego continua.`);
        }
      }

      while (!jugadorSePlanta && !jugadorBlackjack) {

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
            console.log(`\nSu carta es: ` + carta.getCartaMostrada());

            while (puntajeJugador > 21 && !jugadorSePlanta) {
              for (let i = 0; i < jugadorMano.length; i++) {
                if (jugadorMano[i].getValor() === 11) {
                  jugadorMano[i].setValor(1);
                  puntajeJugador -= 10;
                  console.log(`\nEl As ahora vale 1`);
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

      if (puntajeJugador > 21) {
        console.log(`\nHas perdido $${this.getApuestaActual()}.`);
        this.ingresarSaldo(this.calcularPremio("perder"));
        enBlackjack = false;
        continue;
      }

      // Jugador planta y prosigue el turno del Crupier
      console.log(`\nLa carta oculta del Crupier es: ${crupierMano[1].getCartaMostrada()}`); // Mostrar segunda carta del Crupier
      console.log(`\nEl Crupier tiene un puntaje de: ${puntajeCrupier}`);
      if (puntajeCrupier === 21) {
        // Crupier tiene blackjack
        console.log(`\nEl Crupier tiene un blackjack`);
        crupierBlackjack = true;
      }

      if (jugadorSePlanta && !crupierBlackjack) {
        while (puntajeCrupier < 17) {
          // Crupier pide carta
          let carta: Carta = this.getMazo().repartirCarta();
          crupierMano.push(carta);
          puntajeCrupier += crupierMano[crupierMano.length - 1].calcularValor();
          console.log(`\nEl Crupier pide una carta`);
          console.log(`\nLa carta del Crupier es: ${crupierMano[crupierMano.length - 1].getCartaMostrada()}`); // Mostrar ultima carta del Crupier
          console.log(`\nEl Crupier tiene un puntaje de: ${puntajeCrupier}`);
          while (puntajeCrupier > 21) {
            for (let i = 0; i < crupierMano.length; i++) {
              if (crupierMano[i].getValor() === 11) {
                crupierMano[i].setValor(1);
                puntajeCrupier -= 10;
                console.log(`\nEl As ahora vale 1`);
                console.log(`\nEl Crupier tiene un puntaje de: ${puntajeCrupier}`);
              }
            }
            if (puntajeCrupier > 21) {
              console.log("\nEl Crupier se paso de 21"); // Crupier pasa de 21
              break;
            }
          }
        }
      }

      //Hasta aca anda

      if (jugadorBlackjack && crupierBlackjack) {
        //calcularPremio(JugadorBlackjacl)
        // Ambos jugadores tienen blackjack
        console.log("\nEs un empate.");
        console.log(`\nSe devuelve $${this.getApuestaActual()} al jugador.`);
        this.ingresarSaldo(this.calcularPremio("empate"));
      } else if (jugadorBlackjack && !crupierBlackjack) {
        // El jugador tiene blackjack
        console.log("\n¡Felicidades! Ganaste esta ronda.");
        console.log(`\nHas ganado $${this.calcularPremio("x3")}.`);
        this.ingresarSaldo(this.calcularPremio("x3"));
      } else if (!jugadorBlackjack && crupierBlackjack) {
        // El crupier tiene blackjack
        console.log("\nEl Crupier ganó esta ronda.");
        console.log(`\nHas perdido $${this.getApuestaActual()}.`);
        this.ingresarSaldo(this.calcularPremio("perder"));
      }
      if (jugadorSePlanta && !jugadorBlackjack && puntajeCrupier > 21) {
        console.log("\n¡Felicidades! Ganaste esta ronda.");
        console.log(`\nHas ganado $${this.calcularPremio("x2")}.`);
        this.ingresarSaldo(this.calcularPremio("x2"));
      }
      if (puntajeJugador <= 21 && puntajeCrupier <= 21 && !jugadorBlackjack && !crupierBlackjack) {
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
