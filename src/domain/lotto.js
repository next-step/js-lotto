import LottoNumber from "./LottoNumber";
class Lotto { 

    static LOTTO_SIZE = 6;
    static LOTTO_NUMBER_RANGE = 45; 

    #lottoNumbers;

    constructor(lottoNumbers) {
        this.#lottoNumbers = this.#createLottoNumbers(lottoNumbers);
    }

    get getLottoNumbers() {
        return this.#lottoNumbers.map(lottoNumber => lottoNumber.getLottoNumber);
    }

    #createLottoNumbers(lottoNumbers) {
        return lottoNumbers.map(number => new LottoNumber(number));
    }
    
}

export default Lotto;