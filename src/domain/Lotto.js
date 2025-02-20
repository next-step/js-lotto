import LottoNumber from "./LottoNumber.js";
class Lotto { 

    static LOTTO_SIZE = 6;
    static LOTTO_NUMBER_RANGE = 45; 

    #lottoNumbers;

    constructor(lottoNumbers) {
        this.#lottoNumbers = this.#createLottoNumbers(lottoNumbers);
    }

    get lottoNumbers() {
        return this.#lottoNumbers.map(lottoNumber => lottoNumber.lottoNumber);
    }

    #createLottoNumbers(lottoNumbers) {
        return lottoNumbers.map(number => new LottoNumber(number));
    }
    
}

export default Lotto;