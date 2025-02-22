class LottoNumber { 

    static LOTTO_NUM_RANGE_MESSAGE = "로또 숫자는 1 ~ 45 사이의 숫자이여야 합니다.";

    static MINIMUM_LOTTO_NUM = 1;
    static MAXIMUM_LOTTO_NUM = 45;

    #lottoNumber;

    constructor(lottoNumber) {
        this.#confirmLottoNumRange(lottoNumber);
        this.#lottoNumber = lottoNumber;
    }

    get value() {
        return this.#lottoNumber;
    }

    #confirmLottoNumRange(number) {
        if (LottoNumber.MINIMUM_LOTTO_NUM > number || LottoNumber.MAXIMUM_LOTTO_NUM < number) {
            throw new Error(LottoNumber.LOTTO_NUM_RANGE_MESSAGE);
        }
    }

}

export default LottoNumber;