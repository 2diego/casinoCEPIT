export class Jugador {
  private nombre: string;
  private monto: number;

  constructor(nombre: string, monto: number) {
    this.nombre = nombre;
    this.monto = monto;
  }

  public getNombre(): string {
    return this.nombre;
  }
  public getMonto(): number {
    return this.monto;
  }

  public sumarGanancia(saldo: number): void {
    //agregue validacion
    if (saldo < 0) {
      throw new Error("El saldo a sumar no puede ser negativo.");
    }
    this.monto += saldo;
  }

  //cargarJuego ahora devuelve boolean para verificar en el juego si se cargo o no
  public cargarJuego(saldo: number): boolean {
    if (saldo > this.monto) {
      console.log("Saldo insuficiente");
      return false;
    } else {
      this.monto -= saldo;
      return true;
  }
}

}