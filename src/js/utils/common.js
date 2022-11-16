import { LOTTO_NUM_COUNT } from './constants.js';

const purchaseLotto = (amount) => {
    return amount / 1000;
};

const getLottoNumbers = () => {
    const lottoNumbers = [];
    while (lottoNumbers.length !== LOTTO_NUM_COUNT) {
        const randomNumber = Math.floor(Math.random() * (45 - 1) + 1);
        if (!lottoNumbers.includes(randomNumber)) {
            lottoNumbers.push(randomNumber);
        }
    }
    return lottoNumbers;
};

export { purchaseLotto, getLottoNumbers };
