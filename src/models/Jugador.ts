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
    this.monto += saldo;
  }

  public cargarJuego(saldo: number): void {
    if (saldo > this.monto) {
      console.log("No tienes suficiente dinero para apostar");
      return;
    } else {
      this.monto -= saldo;
  }
}

}