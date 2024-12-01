import { JuegoDeCartas } from "./JuegoDeCartas";

export class Bacara extends JuegoDeCartas {
  private tipoApuesta: number[];

  constructor(nombre: string, apuestaMin: number, apuestaMax: number) {
    super(nombre, apuestaMin, apuestaMax);
    this.tipoApuesta = [];
  }

  public calcularPremio(resultado: "jugador" | "banca" | "empate"): void {
    let premio: number = 0;
    if (resultado === "jugador") {
      console.log(`\nGana el jugador.`);
      if (this.tipoApuesta.includes(1)) {
        premio = this.getApuestaActual() * 2;
        console.log(`\nEl jugador gana $${premio} por haber apostado al ${resultado}.`);
        this.ingresarSaldo(premio);
      }
    } else if (resultado === "banca") {
      console.log(`\nGana la banca.`);
      if (this.tipoApuesta.includes(2)) {
        premio = this.getApuestaActual() * 2;
        console.log(`\nEl jugador gana $${premio} por haber apostado a la ${resultado}.`);
        this.ingresarSaldo(premio);
      }
    } else if (resultado === "empate") {
      console.log(`\nEmpate.`);
      if (this.tipoApuesta.includes(3)) {
        premio = this.getApuestaActual() * 2;
        console.log(`\nEl jugador gana $${premio} por haber apostado al ${resultado}.`);
        this.ingresarSaldo(premio);
      }
    }
    if (premio === 0) {
      console.log(`\nNo hubo apuestas ganadoras.`);
    }
  }

  public juego(): void {
    //logica
    // se puede apostar al jugador, a la banca, empate y tambien se puede apostar un poco al jugador y a la banca a la vez
    // while seleccionandoApuesta
    //this.tipoApuesta = rls.questionInt('\nSeleccion la apuesta: 1-Jugador, 2-Banca, 3-Empate');\
    // switch (tipoApuesta) {
    //seleccionandoApuesta = false
    // se reparten 2 cartas intercaladas al jugador y a la banca, dependiendo de la suma de las cartas pueden pedir una tercera carta
    // si la suma de las cartas es 8 o 9 no pueden perdir una tercera carta
    // gana el que mas cerca del 9 este
    // si la suma de las cartas es 10 el total es 0 -> if suma > 9 => suma - 10
    // si la suma de las cartas es 11 el total es 1
    // si la suma de las cartas es 12 el total es 2
    // si la suma de las cartas es 13 el total es 3
    // si la suma de las cartas es 14 el total es 4
    // si la suma de las cartas es 15 el total es 5
    // si la suma de las cartas es 16 el total es 6
    // si la suma de las cartas es 17 el total es 7
    // si la suma de las cartas es 18 el total es 8
    // si la suma de las cartas es 19 el total es 9

    let resultado: "jugador" | "banca" | "empate" = "empate";
    this.calcularPremio(resultado);
  }

}
