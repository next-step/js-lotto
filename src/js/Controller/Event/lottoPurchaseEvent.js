import { selector, UNIT_PRICE } from '../../utils/consts.js';

import Lotto from '../../Model/Lotto.js';
import LottoPurchaseView from '../../View/lottoPurchaseView.js';
import LottoTicketView from '../../View/lottoTicketView.js';
import Event from '../Event.js';
import ticket from './lottoTicketEvent.js';
import priceError from '../error/priceError.js';

const purchase = (function () {
  return {
    handleSubmitEvent(event) {
      event.preventDefault();
      const input = selector('.lotto-purchase-input');
      const { value } = input;

      if (Lotto.price.isNotCorrectPriceRange(value)) {
        LottoPurchaseView.removeInputValue();
        LottoPurchaseView.attachInputStyleOutLine(input);
        alert(priceError.lottoPriceRangeError().message);
        return;
      }

      if (Lotto.price.isNotCorrectPriceUnit(value)) {
        LottoPurchaseView.removeInputValue();
        LottoPurchaseView.attachInputStyleOutLine(input);
        alert(priceError.lottoPriceUnitError().message);
        return;
      }

      LottoPurchaseView.detachInputStyleOutLine(input);

      const amount = value / UNIT_PRICE;

      LottoTicketView.showLottoInfoUI(amount);
      LottoTicketView.setRandomNumber =
        Lotto.automaticNumber.getRandomNumber(amount);
      ticket.setAmount = amount;
      Event.ticketToggle();
      Event.winningNumber();
      Event.statistics();
    },
  };
})();

export default purchase;
