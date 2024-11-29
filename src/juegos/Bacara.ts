import { Juego } from "../models/Juego";
import { Jugador } from "../models/Jugador";
import { Mazo } from "../utils/Mazo";
import { Carta } from "../utils/Carta";
import { solicitarApuesta, solicitarRecarga, solicitarSaldo, validarSaldoInicial, verInstrucciones } from "../utils/utils";
import fs from 'fs';
import * as readline from 'readline-sync';

export class Bacara implements Juego {
    private nombre: string;
    private saldoDisponible: number;
    private cartas: Mazo;
    private apuestaMin: number;
    private apuestaMax: number;
    private apuestaActual: number = 0;

    constructor(nombre: string, apuestaMin: number = 0, apuestaMax: number = 0) {
        this.nombre = nombre;
        this.saldoDisponible = 0;
        this.cartas = new Mazo;
        if (apuestaMin < 0 || apuestaMax < 0) {
            console.error("Las apuestas minima y maxima no pueden ser negativas.");
        }
        if (apuestaMax > 0 && apuestaMin > apuestaMax) {
            console.error("La apuesta minima no puede ser mayor que la apuesta maxima.");
        }
        this.apuestaMin = apuestaMin;//probar validaciones en constructor
        this.apuestaMax = apuestaMax;
    }

    getNombre(): string {
        return this.nombre;
    }

    getSaldoDisponible(): number {
        return this.saldoDisponible;
    }

    getApuestaMin(): number {
        return this.apuestaMin;
    }

    getApuestaMax(): number {
        return this.apuestaMax;
    }

    getCartas(): Mazo {
        return this.cartas;
    }

    getApuestaActual(): number {
        return this.apuestaActual;
    }

    setApuestaActual(apuesta: number): void {
        this.apuestaActual = apuesta;
    }

    setSaldoDisponible(saldo: number): void {
        this.saldoDisponible = saldo;
    }

    public ingresarSaldo(saldo: number): void {
        if (saldo < 0) {
            console.error("\nEl saldo ingresado no puede ser negativo.");
        }
        this.saldoDisponible += saldo;
    }

    public agregarSaldo(jugador: Jugador): number { //Si el manejo de saldo es igual para todos los juegos
        const saldo: number = solicitarSaldo();     //hacer una clase SaldoDisponible como si fuera un repository
        if (jugador.cargarJuego(saldo)) {           //para manejar la logica de saldo
            this.ingresarSaldo(saldo);
            console.log(`\nSe ingreso $${saldo} al juego.`);
        }
        return saldo;
    }

    public retirarSaldo(jugador: Jugador): number {
        const saldoRetirar = this.saldoDisponible;
        this.saldoDisponible = 0;
        jugador.sumarGanancia(saldoRetirar);
        console.log(`\nHas retirado: $${saldoRetirar}`);
        return saldoRetirar;
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

    public validarApuesta(monto: number): boolean { //validarApuesta iria en utils?
        if (monto <= 0) {
            console.error("\nLa apuesta debe ser mayor a 0.");
            return false;
        }
        if (this.getSaldoDisponible() < monto) {
            console.error("\nNo cuenta con saldo suficiente para apostar.");
            return false;
        }
        if (this.getApuestaMin() > 0 && monto < this.getApuestaMin()) {
            console.error("\nLa apuesta debe ser mayor a la apuesta minima.");
            return false;
        }
        if (this.getApuestaMax() > 0 && monto > this.getApuestaMax()) {
            console.error("\nLa apuesta debe ser menor a la apuesta maxima.");
            return false;
        }
        return true
    }


    apostar(): void {
        let apuesta = solicitarApuesta(this, this.getApuestaMin(), this.getApuestaMax());
        if (apuesta !== this.getApuestaMin() && apuesta !== this.getApuestaMax()) {
            console.error(`\nLa apuesta debe ser $${this.getApuestaMin()} o $${this.getApuestaMax()}.`);
        } else if (this.validarApuesta(apuesta)) {
            console.log(`\nApostaste $${apuesta}.`);
            this.setSaldoDisponible(this.getSaldoDisponible() - apuesta);
            this.setApuestaActual(apuesta);
            // calcularPremio();
        }
    }
    getValorNumerico(): void {
      
    }
    juego(): void {
        //logica
        // se puede apostar al jugador, a la banca, empate y tambien se puede apostar un poco al jugador y a la banca a la vez
        // let jugador = rls.questionInt('\nIngrese la apuesta del jugador: ');
        // let banca = rls.questionInt('\nIngrese la apuesta de la banca: ');
        // let empate = rls.questionInt('\nIngrese la apuesta del empate: ');

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


    }
    calcularPremio(): void {

    }


    public jugar(jugador: Jugador[]): void {

        //logica de elegir jugador en utils
        console.log(`\n---------- Bienvenido a ${this.getNombre()} ----------`);
        this.setSaldoInicial(jugador[0]);
        if (this.getSaldoDisponible() === 0) {
            return;
        }

        let jugando: boolean = true; //menu utils no sirve para iniciar?
        while (jugando) { // Desp un loop de mano/turno con otro menu con pedir carta, plantarse..
            let nuevaAccion = readline.question(`\nseleccione que desea hacer: 
            1 - Apostar
            2 - Ingresar saldo
            3 - Ver instrucciones
            4 - Retirar saldo y salir
          \nSu eleccion `);
            switch (nuevaAccion) {
                case "1":
                    //   this.apostar();
                    break;
                case "2":
                    this.agregarSaldo(jugador[0]);
                    break;
                case "3":
                    verInstrucciones(this);
                    break;
                case "4":
                    this.retirarSaldo(jugador[0]);
                    console.log("\nGracias por jugar.");
                    jugando = false;
                    return;
                default:
                    console.error("\nOpcion no valida.");
                    break;
            }

            if (this.getSaldoDisponible() < this.getApuestaMin()) {
                if (!solicitarRecarga(this, jugador[0])) {
                    this.retirarSaldo(jugador[0]);
                    jugando = false;
                };

            }
        }
        return;
    }

}
