/// <reference path="./def.ts" />

module rummy {
    export interface IShuffle{
        randomShuffle(card: card[]): card[];
        cutNInterMix(cards: card[]): card[];
    }
}