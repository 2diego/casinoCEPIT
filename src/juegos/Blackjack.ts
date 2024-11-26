import { Juego } from "../models/Juego";
import { Jugador } from "../models/Jugador";
import { validarSaldoInicial } from "../utils/utils";
import { Mazo } from "../utils/Mazo";
import { Carta } from "../utils/Carta";
import * as readline from 'readline-sync';


export class Blackjack implements Juego {
    private nombre: string;
    private saldoDisponible: number;
    private mazo: Mazo;
    private jugadores: Jugador[];
    private apuestaMin: number;
    private apuestaMax: number;


    constructor(apuestaMin: number = 0, apuestaMax: number = 0) {
        this.nombre = "Blackjack";
        this.saldoDisponible = 0;
        this.mazo = new Mazo();
        this.jugadores = [];
        if (apuestaMin < 0 || apuestaMax < 0) {
            throw new Error("Las apuestas minima y maxima no pueden ser negativas.");
        }
        if (apuestaMax > 0 && apuestaMin > apuestaMax) {
            throw new Error("La apuesta minima no puede ser mayor que la apuesta maxima.");
        }
        this.apuestaMin = apuestaMin;
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


    getJugadores(): Jugador[] {
        return this.jugadores;
    }


     ingresarSaldo(saldo: number): void {
        if (saldo < 0) {
             throw new Error("El saldo ingresado no puede ser negativo.");
         }
        this.saldoDisponible += saldo;
     }


    ingresarSaldoInicial(saldoInicial: number): void {
        if (saldoInicial < this.getApuestaMin()) {
            throw new Error("El saldo ingresado no puede ser menor que la apuesta minima.");
        }
        this.ingresarSaldo(saldoInicial);
    }


    setSaldoInicial(jugador: Jugador): void {
        let saldoInicial: number = validarSaldoInicial(this.getApuestaMin());
        if (saldoInicial === 0) {
            return;
        }


        let cargar: boolean = jugador.cargarJuego(saldoInicial);
        if (!cargar) {
            console.log(`\nNo cuenta con saldo suficiente para jugar ${this.getNombre()}.`);
            return;
        }


        this.ingresarSaldoInicial(saldoInicial);
    }


    public retirarSaldo(jugador: Jugador): number {
        const saldoRetirar = this.saldoDisponible;
        this.saldoDisponible = 0;
        jugador.sumarGanancia(saldoRetirar);
        console.log(`\nHas retirado: $${saldoRetirar}`);
        return saldoRetirar;
      }

    jugar(jugador: Jugador[]): void {
        console.log(`\n---------- Bienvenido a ${this.getNombre()} ----------`);


        this.setSaldoInicial(jugador[0]);
        if (this.getSaldoDisponible() === 0) { // Si no se pudo establecer el saldo inicial, retornamos y no se juega
            return;
        }
        let jugando = true;
        while (jugando) {
            let jugadorMano: Carta[] = [];
            let crupierMano: Carta[] = [];


            for (let i = 0; i < 2; i++) {
                jugadorMano.push(this.mazo.repartirCarta());
                crupierMano.push(this.mazo.repartirCarta());
            }


            jugadorMano.forEach(carta => console.log("Su carta es:" + carta.getCartaMostrada()));
            console.log("La primera carta del Crupier es:" + crupierMano[0].getCartaMostrada());
            console.log(`\nCarta oculta del Crupier`);




            let puntajeJugador: number = 0;
            let puntajeCrupier: number = 0;


            puntajeJugador = jugadorMano[0].calcularValor() + jugadorMano[1].calcularValor();
            puntajeCrupier = crupierMano[0].calcularValor();


            let jugadorSePlanta: boolean = false;


            if (puntajeJugador < 21 || jugadorSePlanta) {
                console.log(`\nSu puntaje es: ${puntajeJugador}`);
                console.log(`\n¿Desea pedir una carta? (s/n)`);
                let respuesta: string = readline.question("");
                if (respuesta.toLocaleLowerCase() === "n") {
                    jugadorSePlanta = true;
                    break;
                } else {
                    while (respuesta.toLocaleLowerCase() === "s") {
                        let carta: Carta = this.mazo.repartirCarta();
                        jugadorMano.push(carta);
                        puntajeJugador += carta.calcularValor();
                        console.log(carta.getCartaMostrada());
                        if (puntajeJugador > 21) {
                            if (jugadorMano[0].getCartaMostrada() === "A") {
                                puntajeJugador -= 10;
                            } else if (jugadorMano[1].getCartaMostrada() === "A") {
                                puntajeJugador -= 10;
                            } else {
                                console.log(`\nSu puntaje es: ${puntajeJugador}`);
                                console.log(`\nPerdiste, su puntaje es mayor a 21`);
                                break;
                            }
                        }
                        console.log(`\nSu puntaje es: ${puntajeJugador}`);
                        console.log(`\n¿Desea pedir una carta? (s/n)`);
                        respuesta = readline.question("");
                        if (respuesta.toLocaleLowerCase() === "n") {
                            jugadorSePlanta = true;
                            break;
                        }
                    }
                }
            }


            if (!jugadorSePlanta) {
                console.log(`\nLa carta del Crupier es: ${crupierMano[1].getCartaMostrada()}`);
                puntajeCrupier += crupierMano[1].calcularValor();


            }
            return  
        }           
    }
}