import { Juego } from "./Juego";
import { Jugador } from "./Jugador";
export class Casino{
  private static instance: Casino | null = null;
  private juegos: Juego[];
  private jugadores: Jugador[];

  constructor(){
    this.juegos = [];
    this.jugadores = [];
  }

  public static getInstance(): Casino {
    if (!Casino.instance) {
      Casino.instance = new Casino();
    }
    return Casino.instance;
  }

  public getJugadores(): Jugador[]{
    return this.jugadores;
  }
  
  public ingresarJuego(juego: Juego){
    this.juegos.push(juego);
  }

  public ingresarJugador(jugador: Jugador){
    this.jugadores.push(jugador);
  }
  

  public verJuegos(){
    console.log('Elija un juego: ')
    this.juegos.forEach((juego, index) => {
      console.log(`${index + 1} - ${juego.getNombre()}`);
    });
  }

  public elegirJuego(jugadores: Jugador[], index: number): void{
    if (index < 1 || index > this.juegos.length) {
      console.error("Opción inválida. Intente nuevamente.");
      return;
    }
    const juego: Juego = this.juegos[index - 1];
    juego.jugar(jugadores);
  }

}