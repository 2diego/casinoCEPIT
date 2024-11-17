import { Juego } from "./Juego";
import { Jugador } from "./Jugador";
export class Casino{
  private juegos: Juego[];

  constructor(){
    this.juegos = [];
  }
  
  public ingresarJuego(juego: Juego){
    this.juegos.push(juego);
  }

  public eliminarJuego(juego: Juego){
    this.juegos = this.juegos.filter(j => j !== juego);
  }

  public verJuegos(){
    console.log('Elija un juego: ')
    this.juegos.forEach((juego, index) => {
      console.log(`${index + 1} - ${juego.getNombre()}`);
    });
  }

  public elegirJuego(jugador: Jugador, index: number){
    //Agregue validacion
    if (index < 1 || index > this.juegos.length) {
      console.error("Opción inválida. Intente nuevamente.");
      return;
    }
    const juego: Juego = this.juegos[index - 1];
    juego.jugar(jugador);
  }

}