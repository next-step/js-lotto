class LottoResult {

    // 1등 -> 7
    // 2등 -> 6;
    // 3등 -> 5;
    // 4등 -> 4;
    // 5등 -> 3;

    constructor() {
        this.resultMap = new Map();
    }

    addResult(matchedCount, hasBonus) {
        if (matchedCount == 6 || hasBonus) { 
            matchedCount += 1;
        }
        this.resultMap.set(matchedCount, (this.resultMap.get(matchedCount) || 0) + 1);
    }

}

export default LottoResult;