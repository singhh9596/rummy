/// <reference path="./def.ts" />
/// <reference path="./shuffleTypes.ts" />
/// <reference path="./shuffleImpl.ts" />

module rummy {
    import ShuffleType = rummy.ShuffleType;

    export function shuffle(cards:  card[],shuffleType?: rummy.ShuffleType):  card[]{
        
        var shuffleTechnique = shuffleType || ShuffleType.CUT_N_INTERMIX;
        var shuffleImpl = new rummy.shuffleImpl()
        switch (shuffleTechnique) {
            case ShuffleType.CUT_N_INTERMIX:
                    return shuffleImpl.cutNInterMix(cards);
            case ShuffleType.RANDOM:
                    return shuffleImpl.randomShuffle(cards);
            default:
                throw new Error("Invalid ShuffleType");
        }
    }
}