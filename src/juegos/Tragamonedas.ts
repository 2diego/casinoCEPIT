import { Jugador } from "../models/Jugador";
import { Juego } from "../models/Juego";
import { validarSaldoInicial } from "../utils/utils";

export abstract class Tragamonedas implements Juego {
  private nombre: string;
  private simbolos: string[];
  //agregue simbolos otro para que se guarden los simbolos que se crean al girar
  private simbolosGenerados: string[] = [];
  private apuestaMin: number;
  private apuestaMax: number;
  private saldoDisponible: number;
  private filas: number;
   //agregue apuestaActual 
  private apuestaActual: number = 0;
 

  constructor(nombre: string, simbolos: string[] = [], apuestaMinima: number = 0, apuestaMaxima: number = 0, filas: number = 3) {
    this.nombre = nombre;
    this.simbolos = simbolos;
    this.saldoDisponible = 0;
    if (apuestaMinima < 0 || apuestaMaxima < 0) {
      throw new Error("\nLas apuestas minima y maxima no pueden ser negativas.");
    }
    if (apuestaMaxima > 0 && apuestaMinima > apuestaMaxima) {
      throw new Error("\nLa apuesta minima no puede ser mayor que la apuesta maxima.");
    }
    this.apuestaMin = apuestaMinima;
    this.apuestaMax = apuestaMaxima;
    this.filas = filas;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getSaldoDisponible(): number {
    return this.saldoDisponible;
  }

  public getApuestaMin(): number {
    return this.apuestaMin;
  }

  public getApuestaMax(): number {
    return this.apuestaMax;
  }

  public getSimbolos(): string[] {
    return this.simbolos;
  }
  //agregue getsimbolosGenerados
  getSimbolosGenerados(): string[] {
    return this.simbolosGenerados;
  }
  
  public getFilas(): number {
    return this.filas;
  }
  //Agregue getApuestaActual
  getApuestaActual(): number {
    return this.apuestaActual;
  }

  public ingresarSaldo(saldo: number): void {
    if (saldo < 0) {
      throw new Error("\nEl saldo ingresado no puede ser negativo.");
    }
    this.saldoDisponible += saldo;
  }

  // public retirarSaldo(): number {
  //   const saldoRetirar = this.getSaldoDisponible();
  //   if(saldoRetirar > 0){
  //     this.setSaldoDisponible(0);
  //     console.log(`\nHas retirado: $${saldoRetirar}`);

      
  //   }else{
  //     console.log("\n no hay saldo disponible para retirar.");
  //   }
  //   return saldoRetirar;  //revisar el retirarsaldo dice que retirar pero no lo suma al jugador
  // }
  
  //agregue cuanto retira el jugador e hice que se le sume al monto del jugador
  public retirarSaldo(jugador: Jugador): number {
    const saldoRetirar = this.saldoDisponible;
    this.saldoDisponible = 0;
    jugador.sumarGanancia(saldoRetirar);
    console.log(`\nHas retirado: $${saldoRetirar}`);
    return saldoRetirar;
  }

  public setSaldoDisponible(saldo: number): void {
    this.saldoDisponible = saldo;
  }

  //agregue setApuestaActual
  setApuestaActual(apuesta: number): void {
    this.apuestaActual = apuesta;
  }
  protected setSaldoInicial(jugador: Jugador): void {
    let saldoInicial: number = validarSaldoInicial(this.getApuestaMin());
    if (saldoInicial === 0) {
      return;
    }

    let cargar: boolean = jugador.cargarJuego(saldoInicial);
    if (!cargar) {
      console.log(`\nNo cuenta con saldo suficiente para jugar ${this.getNombre()}.`);
      return;
    }

    this.ingresarSaldo(saldoInicial);
  }

  obtenerSimbolosAleatorios(): string {
    const index = Math.floor(Math.random() * this.simbolos.length);
    return this.simbolos[index];
  }

  public girar(filas: number): string[][] {
    let resultado: string[][] = [];

    for (let i = 0; i < filas; i++) {
      let filaSimbolos: string[] = [];
      for (let j = 0; j < 3; j++) {
        const simbolo = this.obtenerSimbolosAleatorios();
        filaSimbolos.push(simbolo);
      }
      resultado.push(filaSimbolos);
    }
    this.simbolosGenerados = resultado[0];
    return resultado;
  }

  public mostrarResultado(resultado: any[][]): void {
    for (let i = 0; i < resultado.length; i++) {
      if (resultado[i] && resultado[i][0] !== undefined && resultado[i][1] !== undefined && resultado[i][2] !== undefined) {
        console.log(`${resultado[i][0]} | ${resultado[i][1]} | ${resultado[i][2]}`);
      } else {
        console.error(`\nError: resultado[${i}] está undefined o no tiene suficientes elementos.`);
      }
    }
  }
  // cambie el mostrarResultado de abajo por el de arriba 
  
  // public mostrarResultado(resultado: string[][]): void {
  //   for (let i = 0; i < this.getFilas() ; i++) {
  //     console.log(`${resultado[i][0]} | ${resultado[i][1]} | ${resultado[i][2]}`);
  //   }
  // }

  public validarApuesta(monto: number): boolean {
    if (monto <= 0) {
      console.log("\nLa apuesta debe ser mayor a 0.");
      return false;
    }
    if (this.getSaldoDisponible() < monto) {
      console.log("\nNo cuenta con saldo suficiente para apostar.");
      return false;
    }
    if (this.getApuestaMin() > 0 && monto < this.getApuestaMin()) {
      console.log("\nLa apuesta debe ser mayor a la apuesta minima.");
      return false;
    }
    if (this.getApuestaMax() > 0 && monto > this.getApuestaMax()) {
      console.log("\nLa apuesta debe ser menor a la apuesta maxima.");
      return false;
    }
    return true
  }

  abstract jugar(jugador: Jugador[]): void;

  //Metodos privados que cambian dependiendo de la logica del juego y se usan en jugar()
  protected abstract apostar(monto: number): void;
  /*validarApuesta publica?
  en apostar se elijen detalles de la apuesta, se calcula monto final, if (validarApuesta(monto)) { 
  setSaldoDisponible, girar, mostrarResultado, calcularPremio, ingresarSaldo }
  */

  protected abstract calcularPremio(): void;
}