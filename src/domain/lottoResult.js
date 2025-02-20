class LottoResult {

    #resultMap;

    constructor() {
        this.#resultMap = new Map(); 
    }
    
    get resultMap() {
        return this.#resultMap;
    }

    addResult(matchedCount, hasBonus) {
        if (matchedCount === 6 || hasBonus) { 
            matchedCount += 1;
        }
        this.#resultMap.set(matchedCount, (this.#resultMap.get(matchedCount) || 0) + 1);
    }

}

export default LottoResult;