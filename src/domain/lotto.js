class Lotto { 

    static LOTTO_SIZE = 6;
    static LOTTO_NUMBER_RANGE = 45; 

    #lottoNumbers;

    constructor(lottoNumbers) {
        this.#lottoNumbers = this.outputAutoLotto();
    }

    get getLottoNumbers() {
        return this.#lottoNumbers;
    }

    outputAutoLotto() {
        const numberRange = [...Array(Lotto.LOTTO_NUMBER_RANGE).keys()].map(i => i + 1);
        
        this.shuffleArray(numberRange);
        
        return numberRange.slice(0, Lotto.LOTTO_SIZE).sort((a, b) => a - b);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    }
}

export default Lotto;