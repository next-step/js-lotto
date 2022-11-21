import { SELECTOR, LOTTO } from '../utils/constants.js';
import { $ } from '../utils/dom.js';

import counterView from './lottoCounter.js';
import lottoView from './lotto.js';
import lottoNumsView from './lottoNumbers.js';

const getLottoCount = (amount) => {
    return amount / LOTTO.PRICE_UNIT;
};

export default (targetElement, state) => {
    const { purchaseAmount } = state;
    const newState = { ...state, ticketCount: getLottoCount([purchaseAmount]) }

    const element = targetElement.cloneNode(true);

    //@Todo : class로 css변경할수있게 refactoring 필요
    $(SELECTOR.PURCHASED_LOTTO, element).style.display = 'block';
    $(SELECTOR.INPUT_LOTTO_NUMS, element).style.display = 'block';

    const counter = $(SELECTOR.TOTAL_PURCHASED, element);
    counter.replaceWith(counterView(counter, newState));

    const list = $(SELECTOR.LOTTO_IMAGES, element);
    list.replaceWith(lottoView(list, newState));

    const lottoNumbers = $(SELECTOR.LOTTO_IMAGES, element);
    lottoNumbers.replaceWith(lottoNumsView(lottoNumbers, newState));


    return element;
}