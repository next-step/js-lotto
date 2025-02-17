class Lotto { 

    static LOTTO_SIZE = 6;
    static LOTTO_NUMBER_RANGE = 45; 

    constructor() {
        this.lottoNumbers = this.outputAutoLotto();
    }

    outputAutoLotto() {
        const lottoSet = new Set();
    
        while (lottoSet.size < Lotto.LOTTO_SIZE) { 
            lottoSet.add(Math.floor(Math.random() * Lotto.LOTTO_NUMBER_RANGE) + 1); 
        }
    
        return Array.from(lottoSet).map(number => number).sort((a, b) => a - b);
    }
}

export default Lotto;