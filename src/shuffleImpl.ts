/// <reference path="./def.ts" />
/// <reference path="./iShuffle.ts" />

module rummy {
    
    export class shuffleImpl implements rummy.IShuffle{
        public randomShuffle(array) {
            var length = array.length, temp, idx;
            while (length) {
                idx = Math.floor(Math.random() * length--);

                temp = array[length];
                array[length] = array[idx];
                array[idx] = temp;
            }

            return array;
        }

        public cutNInterMix(cards: card[]){
            function cutNInterMix(cards: card[]){
                var random = Math.floor(Math.random() * cards.length);
                var parts = cards.splice(0,random);
                var bigArray=[],smallArray=[];
                if(parts.length > cards.length){
                    bigArray = parts;
                    smallArray = cards;
                } else {
                    bigArray = cards;
                    smallArray = parts;
                }
                for (var idx = 0, i = 0; idx < bigArray.length; idx = idx + 2, i++) {
                    if(smallArray[i]){
                        bigArray.splice(idx,0,smallArray[i]);
                    }
                }
                return bigArray;
            }
            var shuffledCards = this.randomShuffle(cards);
            return cutNInterMix(shuffledCards);
        }
    }
}