import {LOTTO_NUMBER_COUNT_PER_UNIT, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER} from '../consts/lottoConsts.js';

export const pickLottoNumbers = (count) => {
    const lottoNumbers = [];
    for (let i = 0; i < count; i += 1) {
        lottoNumbers.push(getLottoNumber());
    }
    return lottoNumbers;
};

const getLottoNumber = () => {
    const lottoNumber = new Set();
    while (lottoNumber.size < LOTTO_NUMBER_COUNT_PER_UNIT) {
        lottoNumber.add(getRandomNumber());
    }
    return Array.from(lottoNumber);
};

const getRandomNumber = () => {
    return Math.floor((Math.random() * (MAX_LOTTO_NUMBER - MIN_LOTTO_NUMBER + 1)) + MIN_LOTTO_NUMBER);
};
