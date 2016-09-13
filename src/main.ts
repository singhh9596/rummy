/// <reference path="./def.ts" />
/// <reference path="./prepareDeck.ts" />
/// <reference path="./shuffle.ts" />

module rummy {

    export function play(){
        var cards:  card[]= rummy.prepareDeck({numberOfSets:1});
        cards = rummy.shuffle(cards);
        rummy.distribute(cards);
    }
    
    export function distribute(cards:  card[]){
        // cards.forEach(element => {
        //    console.log(element.group);
        //    console.log(element.value); 
        // });
        console.log(cards.length)
    }
}
rummy.play();