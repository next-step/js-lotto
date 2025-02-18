class Lotto { 

    static LOTTO_SIZE = 6;
    static LOTTO_NUMBER_RANGE = 45; 

    #lottoNumbers;

    constructor(lottoNumbers) {
        this.#lottoNumbers = lottoNumbers;
    }

    get getLottoNumbers() {
        return this.#lottoNumbers;
    }

    
}

export default Lotto;