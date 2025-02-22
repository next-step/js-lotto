import LottoNumber from "./LottoNumber.js";
class Lotto { 

    #lottoNumbers;

    constructor(lottoNumbers) {
        this.#lottoNumbers = this.#createLottoNumbers(lottoNumbers);
    }

    get value() {
        return this.#lottoNumbers.map(lottoNumber => lottoNumber.value);
    }

    #createLottoNumbers(lottoNumbers) {
        return lottoNumbers.map(number => new LottoNumber(number));
    }
    
}

export default Lotto;