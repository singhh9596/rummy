/// <reference path="./def.ts" />
/// <reference path="./constants.ts" />

module rummy {
    export function prepareDeck(options: IDeckOptions):  card[]{
        var cards: card[] = [];

        function getOneSet(): card[]{
            var cards: card[] = [];
            var groups = rummy.constants.getGroups();
            groups.forEach((group)=>{
                if(group === 'EXTRA'){
                    var extraCardValues = rummy.constants.getExtraCardValues();
                    extraCardValues.forEach((value)=>{
                        cards.push(new card(group,value));
                    });
                }else{
                    var getCardValues = rummy.constants.getCardValues();
                    getCardValues.forEach((value)=>{
                        cards.push(new card(group,value));
                    });
                }
            });
            return cards;
        }
        
        var numberOfSets = options.numberOfSets || 1;
        for(var num = numberOfSets ; num > 0;num--){
            Array.prototype.push.apply(cards,getOneSet());
        }
        return cards;
    }
}