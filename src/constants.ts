module rummy.constants {
    var groups = ["HEARTS","SPADES","CLUBS","DIAMOND","EXTRA"];
    var cardValues = ["A", "K", "Q", "J", 10, 9, 8, 7, 6, 5, 4, 3, 2];
    var extraCardValues = ["JOKER"];

    export function getGroups() {
        return groups;
    }

    export function getCardValues() {
        return cardValues;
    }
    
    export function getExtraCardValues() {
        return extraCardValues;
    }
}