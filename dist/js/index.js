var rummy;
(function (rummy) {
    var constants;
    (function (constants) {
        var groups = ["HEARTS", "SPADES", "CLUBS", "DIAMOND", "EXTRA"];
        var cardValues = ["A", "K", "Q", "J", 10, 9, 8, 7, 6, 5, 4, 3, 2];
        var extraCardValues = ["JOKER"];
        function getGroups() {
            return groups;
        }
        constants.getGroups = getGroups;
        function getCardValues() {
            return cardValues;
        }
        constants.getCardValues = getCardValues;
        function getExtraCardValues() {
            return extraCardValues;
        }
        constants.getExtraCardValues = getExtraCardValues;
    })(constants = rummy.constants || (rummy.constants = {}));
})(rummy || (rummy = {}));
var card = (function () {
    function card(group, value) {
        this.group = group;
        this.value = value;
    }
    return card;
})();
/// <reference path="./def.ts" />
/// <reference path="./def.ts" />
/// <reference path="./constants.ts" />
var rummy;
(function (rummy) {
    function prepareDeck(options) {
        var cards = [];
        function getOneSet() {
            var cards = [];
            var groups = rummy.constants.getGroups();
            groups.forEach(function (group) {
                if (group === 'EXTRA') {
                    var extraCardValues = rummy.constants.getExtraCardValues();
                    extraCardValues.forEach(function (value) {
                        cards.push(new card(group, value));
                    });
                }
                else {
                    var getCardValues = rummy.constants.getCardValues();
                    getCardValues.forEach(function (value) {
                        cards.push(new card(group, value));
                    });
                }
            });
            return cards;
        }
        var numberOfSets = options.numberOfSets || 1;
        for (var num = numberOfSets; num > 0; num--) {
            Array.prototype.push.apply(cards, getOneSet());
        }
        return cards;
    }
    rummy.prepareDeck = prepareDeck;
})(rummy || (rummy = {}));
var rummy;
(function (rummy) {
    (function (ShuffleType) {
        ShuffleType[ShuffleType["CUT_N_INTERMIX"] = 0] = "CUT_N_INTERMIX";
        ShuffleType[ShuffleType["RANDOM"] = 1] = "RANDOM";
    })(rummy.ShuffleType || (rummy.ShuffleType = {}));
    var ShuffleType = rummy.ShuffleType;
})(rummy || (rummy = {}));
/// <reference path="./def.ts" />
/// <reference path="./iShuffle.ts" />
var rummy;
(function (rummy) {
    var shuffleImpl = (function () {
        function shuffleImpl() {
        }
        shuffleImpl.prototype.randomShuffle = function (array) {
            var length = array.length, temp, idx;
            while (length) {
                idx = Math.floor(Math.random() * length--);
                temp = array[length];
                array[length] = array[idx];
                array[idx] = temp;
            }
            return array;
        };
        shuffleImpl.prototype.cutNInterMix = function (cards) {
            function cutNInterMix(cards) {
                var random = Math.floor(Math.random() * cards.length);
                var parts = cards.splice(0, random);
                var bigArray = [], smallArray = [];
                if (parts.length > cards.length) {
                    bigArray = parts;
                    smallArray = cards;
                }
                else {
                    bigArray = cards;
                    smallArray = parts;
                }
                for (var idx = 0, i = 0; idx < bigArray.length; idx = idx + 2, i++) {
                    if (smallArray[i]) {
                        bigArray.splice(idx, 0, smallArray[i]);
                    }
                }
                return bigArray;
            }
            var shuffledCards = this.randomShuffle(cards);
            return cutNInterMix(shuffledCards);
        };
        return shuffleImpl;
    })();
    rummy.shuffleImpl = shuffleImpl;
})(rummy || (rummy = {}));
/// <reference path="./def.ts" />
/// <reference path="./shuffleTypes.ts" />
/// <reference path="./shuffleImpl.ts" />
var rummy;
(function (rummy) {
    var ShuffleType = rummy.ShuffleType;
    function shuffle(cards, shuffleType) {
        var shuffleTechnique = shuffleType || ShuffleType.CUT_N_INTERMIX;
        var shuffleImpl = new rummy.shuffleImpl();
        switch (shuffleTechnique) {
            case ShuffleType.CUT_N_INTERMIX:
                return shuffleImpl.cutNInterMix(cards);
            case ShuffleType.RANDOM:
                return shuffleImpl.randomShuffle(cards);
            default:
                throw new Error("Invalid ShuffleType");
        }
    }
    rummy.shuffle = shuffle;
})(rummy || (rummy = {}));
/// <reference path="./def.ts" />
/// <reference path="./prepareDeck.ts" />
/// <reference path="./shuffle.ts" />
var rummy;
(function (rummy) {
    function play() {
        var cards = rummy.prepareDeck({ numberOfSets: 1 });
        cards = rummy.shuffle(cards);
        rummy.distribute(cards);
    }
    rummy.play = play;
    function distribute(cards) {
        // cards.forEach(element => {
        //    console.log(element.group);
        //    console.log(element.value); 
        // });
        console.log(cards.length);
    }
    rummy.distribute = distribute;
})(rummy || (rummy = {}));
rummy.play();
