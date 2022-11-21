import { $, $all } from "./utils/dom.js";
import { SELECTOR, LOTTO } from "./utils/constants.js";


const getLottoElement = (lottoNumbers) => {
    return `<li><span class='lotto-image mx-1 text-4xl'>🎟️</span><span class='lotto-numbers' style='display:none'>${lottoNumbers.join(', ')}</span></li>`;
};

const getLottoCount = (amount) => {
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

const showLottoNumbers = () => {

}

export default (targetElement, state) => {
    const { purchaseAmount, toggleOn } = state;
    const element = targetElement.cloneNode(true);

    const ticketCount = getLottoCount(purchaseAmount);
    $(SELECTOR.PURCHASED_LOTTO, element).style.display = 'block';
    $(SELECTOR.INPUT_LOTTO_NUMS, element).style.display = 'block';
    $(SELECTOR.TOTAL_PURCHASED, element).textContent = ticketCount;

    const lottoImageHTML = Array.from(
        { length: ticketCount },
        () => getLottoElement(getLottoNumbers()),
    ).join('');
    $(SELECTOR.LOTTO_IMAGES, element).insertAdjacentHTML('beforeend', lottoImageHTML);

    if (toggleOn) {
        $(SELECTOR.LOTTO_IMAGES, element).classList.add('d-block');
        $(SELECTOR.LOTTO_IMAGES, element).classList.remove('d-flex');
        $all(SELECTOR.LOTTO_NUMS, element).forEach((lotto) => {
            lotto.style.display = 'inline-block';
        });
    }

    return element;
}