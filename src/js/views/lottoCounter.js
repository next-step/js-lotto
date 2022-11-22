import { LOTTO } from '../utils/constants.js';
const getLottoCount = (amount) => {
  return amount / LOTTO.PRICE_UNIT;
};

export default (targetElement, state) => {
  const { purchaseAmount } = state;
  const newCounter = targetElement.cloneNode(true);
  const ticketCount = getLottoCount(purchaseAmount);
  newCounter.textContent = ticketCount;

  state.ticketCount = ticketCount;
  return newCounter;
};
