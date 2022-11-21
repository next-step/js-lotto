import { LOTTO } from './utils/constants.js';

const getTicketCount = (amount) => {
    return amount / LOTTO.PRICE_UNIT;
};

const getLottoNumbers = () => {
    const lottoNumbers = [];
    while (lottoNumbers.length !== LOTTO.LENGTH) {
        const randomNumber = Math.floor(
            Math.random() * (LOTTO.MAX_VALUE - LOTTO.MIN_VALUE) + LOTTO.MIN_VALUE
        );
        if (!lottoNumbers.includes(randomNumber)) {
            lottoNumbers.push(randomNumber);
        }
    }
    return lottoNumbers;
};

export { getTicketCount, getLottoNumbers };
