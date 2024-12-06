import { Carta, Palo } from "./Carta";

export class Mazo  {
    private mazo: Carta[];
    constructor() { 
        this.mazo = [];
        this.crearMazo();
        this.mezclarMazo();
    }

    getMazo(): Carta[] {
        return this.mazo;
    }

    crearMazo() {
        const palo: Palo[] = ["♥️","♦️","♣️","♠️"];
        let i: number = 0;
        for (i; i < 4; i++) {
            for (let j = 0; j < 13; j++) {
                this.mazo.push(new Carta(palo[i], j + 1));
            }
        }
    }
    lenght(): number {
        return this.mazo.length
    }
    mezclarMazo() {
        for (let i = this.mazo.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.mazo[i], this.mazo[j]] = [this.mazo[j], this.mazo[i]];
        }
        return this.mazo;
    }

    repartirCarta() : Carta {
        return this.mazo.pop() as Carta;
    }
}