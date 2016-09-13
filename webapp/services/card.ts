module webapp.services {
    export class CardService {
        static $inject = [
            '$http'
        ]
        
        constructor(
            private $http,
            private deck
        ) {
            this.deck = [];
        }

        /**
         * fetchCards
         */
        public fetchCards(options) {
            return this.$http.get("/cards",{params:options})
            .then(function (response: any) {
                return response.data;
            })
        }

        public getShuffleTypes(){
            return this.$http.get("shuffleTypes")
            .then(function (response: any) {
                return response.data;
            })
        }

        public shuffle(options){
            return this.$http.get("/shuffledCards",{params:options})
            .then(function(response: any){
                return response.data;
            })
        }

        public setDeck(deck){
            this.deck = deck;
        }

        public getDeck(){
            return this.deck;
        }
    }
}