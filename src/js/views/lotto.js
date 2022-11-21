import { LOTTO } from '../utils/constants.js';

const getLottoElement = (lottoNumbers) => {
    return `<li><span class='lotto-image mx-1 text-4xl'>🎟️</span><span class='lotto-numbers' style='display:none'>${lottoNumbers.join(', ')}</span></li>`;
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

export default (targetElement, { ticketCount }) => {
    const newLottolist = targetElement.cloneNode(true);

    const lottoImageHTML = Array.from(
        { length: ticketCount },
        () => getLottoElement(getLottoNumbers()),
    ).join('');

    newLottolist.insertAdjacentHTML('beforeend', lottoImageHTML);

    return newLottolist;
}