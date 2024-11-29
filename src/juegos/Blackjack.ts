import { Juego } from "../models/Juego";
import { Jugador } from "../models/Jugador";
import { Mazo } from "../utils/Mazo";
import { Carta } from "../utils/Carta";
import { menuJuegos, pideCarta, solicitarApuesta, solicitarRecarga, solicitarSaldo, validarSaldoInicial, verInstrucciones, juegaDeNuevo } from "../utils/utils";



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


    public agregarSaldo(jugador: Jugador): number {
        const saldo: number = solicitarSaldo();
        if (jugador.cargarJuego(saldo)) {
            this.ingresarSaldo(saldo);
            console.log(`\nSe ingreso $${saldo} al juego.`);
        }
        return saldo;
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


    apostar(): void {
        let apuesta = solicitarApuesta(this, this.getApuestaMin(), this.getApuestaMax());
        if (this.getSaldoDisponible() >= apuesta) {
            if (apuesta <= this.getApuestaMin() || apuesta >= this.getApuestaMax()) {
                this.saldoDisponible -= apuesta;
                console.log(`\nHas apostado: $${apuesta}`);
            } else {
                console.log(`\nLa apuesta debe ser entre $${this.getApuestaMin()} y $${this.getApuestaMax()}.`);
            }
        } else {
            console.log(`\nNo cuenta con saldo suficiente para apostar.`);
        }
    }

    calcularPremio(): void {
        let premio: number = 0;
        
    }

    jugar(jugador: Jugador[]): void {
        console.log(`\n---------- Bienvenido a ${this.getNombre()} ----------`);


        this.setSaldoInicial(jugador[0]);
        if (this.getSaldoDisponible() === 0) { // Si no se pudo establecer el saldo inicial, retornamos y no se juega
            return;
        }
        let jugando = true;
        while (jugando) {
            let nuevaAccion = menuJuegos(this);
            switch (nuevaAccion) {
                case 1:
                    this.apostar();
                    break;
                case 2:
                    this.agregarSaldo(jugador[0]);
                    break;
                case 3:
                    verInstrucciones(this);
                    break;
                case 4:
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

            puntajeJugador = jugadorMano[0].calcularValor(this) + jugadorMano[1].calcularValor(this);
            puntajeCrupier = crupierMano[0].calcularValor(this);

            let jugadorSePlanta: boolean = false;

            // Verificar ganador por blackjack    
            if (puntajeJugador === 21) {
                console.log("\n¡Felicidades! Has ganado.");
                jugadorSePlanta = true;
                break;
            }
            // Jugador no tiene blackjack y puede pedir carta
            if (puntajeJugador < 21 || !jugadorSePlanta) {                      // Turno del jugador
                console.log(`\nSu puntaje es: ${puntajeJugador}`);
                let respuesta: string = pideCarta();
                if (respuesta.toLocaleLowerCase() === "n") {        // Jugador planta
                    jugadorSePlanta = true;
                    break;
                } else {
                    while (respuesta.toLocaleLowerCase() === "s") {            // Jugador pide carta y bucle hasta que pierda o se plante
                        let carta: Carta = this.mazo.repartirCarta();
                        jugadorMano.push(carta);
                        puntajeJugador += jugadorMano[jugadorMano.length - 1].calcularValor(this);
                        console.log(carta.getCartaMostrada());
                        if (puntajeJugador > 21) {
                            if (jugadorMano[0].getCartaMostrada() === "A") {           // Si el jugador tiene un as y su puntaje es mayor a 21
                                puntajeJugador -= 10;
                            } else if (jugadorMano[1].getCartaMostrada() === "A") {
                                puntajeJugador -= 10;
                            } else if (jugadorMano[jugadorMano.length - 1].getCartaMostrada() === "A") {
                                puntajeJugador -= 10;
                            } else {
                                console.log(`\nSu puntaje es: ${puntajeJugador}`);
                                console.log(`\nPerdiste, su puntaje es mayor a 21`);               // Jugador pierde
                                break;
                            }
                        }
                        console.log(`\nSu puntaje es: ${puntajeJugador}`);
                        respuesta = pideCarta();
                        if (respuesta.toLocaleLowerCase() === "n") {
                            jugadorSePlanta = true;
                            break;
                        }
                    }
                }
            }


            if (jugadorSePlanta) {                                  // Jugador planta y prosigue el turno del Crupier
                console.log(`\nLa carta del Crupier es: ${crupierMano[1].getCartaMostrada()}`);            // Mostrar segunda carta del Crupier
                puntajeCrupier += crupierMano[1].calcularValor(this);
                console.log(`\nEl Crupier tiene un puntaje de: ${puntajeCrupier}`);
                if (puntajeCrupier === 21) {                        // Crupier tiene blackjack
                    console.log("\nEl Crupier ha ganado.");
                    break;
                } else {
                    while (puntajeCrupier < 17) {                      // Crupier pide carta
                        let carta: Carta = this.mazo.repartirCarta();
                        crupierMano.push(carta);
                        puntajeCrupier += crupierMano[crupierMano.length - 1].calcularValor(this);
                        if (puntajeCrupier > 21) {                                            // Si el Crupier tiene un as y su puntaje es mayor a 21
                            if (crupierMano[0].getCartaMostrada() === "A") {
                                puntajeCrupier -= 10;
                            } else if (crupierMano[1].getCartaMostrada() === "A") {
                                puntajeCrupier -= 10;
                            } else if (crupierMano[crupierMano.length - 1].getCartaMostrada() === "A") {
                                puntajeCrupier -= 10;
                            } else {
                                console.log(`\nLa carta del Crupier es: ${crupierMano[crupierMano.length - 1].getCartaMostrada()}`);            // Mostrar ultima carta del Crupier
                                console.log(`\nEl Crupier tiene un puntaje de: ${puntajeCrupier}`);
                                console.log("\nEl Crupier se paso de 21");                                         // Crupier pasa de 21
                                break;
                            }
                        }
                    }
                }
            }

            if (puntajeJugador <= 21 && puntajeCrupier <= 21) {                            // Validaciones cuando ambos jugadores tienen menos de 21
                if (puntajeJugador > puntajeCrupier) {
                    console.log("\n¡Felicidades! Ganaste esta ronda.");
                } else if (puntajeJugador < puntajeCrupier) {
                    console.log("\nEl Crupier ganó esta ronda.");
                } else {
                    console.log("\nEs un empate.");
                }
            }

            let respuesta = juegaDeNuevo();
            if (respuesta.toLowerCase() !== "s") {
                jugando = false;
            }
            this.mazo = new Mazo();
        }
    }
}