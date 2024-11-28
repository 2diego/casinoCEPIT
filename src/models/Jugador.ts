export class Jugador {
  private nombre: string;
  private monto: number;//fondosDisponibles

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
  
  //setFondosDisponibles si queremos agregar una opcion para ingresar fondos a la app

  public sumarGanancia(saldo: number): void {
    this.monto += saldo;
  }

  public cargarJuego(saldo: number): boolean {//comprarFichas
    if (saldo > this.monto) {
      console.error(`\nMonto insuficiente para cargar ${saldo} de saldo.\n\nMonto disponible: ${this.monto}`);
      return false;
    } else {
      this.monto -= saldo;
      return true;
  }
}

}