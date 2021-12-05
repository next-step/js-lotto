import SELECTOR from '../constant/selector.js';
import { $ } from '../util/querySelector.js';

const lottoTemplate = (lottoNumbers = []) => `
  <div class="js-lotto-ticket">
    <span class="mx-1 text-4xl">🎟️ </span>
    <span class="js-lotto-numbers">${lottoNumbers.join(', ')}</span>
  </div>
`;

export const updateLottoCount = (amount = 0) => {
  $(SELECTOR.LOTTO_COUNT).textContent = amount;
};

export const updateLottoTicketView = (lottos = []) => {
  $(SELECTOR.LOTTO_CONTAINER).innerHTML = lottos.map(lottoTemplate).join('');
};

export const resetMainView = () => {
  updateLottoCount();
  updateLottoTicketView();
  $(SELECTOR.PAYMENT_FORM).reset();
  $(SELECTOR.ANSWER_FORM).reset();
};

export const focusPaymentInput = () => {
  $(SELECTOR.PAYMENT_INPUT).focus();
};

const lottoNumberHidden = 'lotto-number-hidden';

export const setBriefMode = () => {
  $(SELECTOR.LOTTO_CONTAINER).classList.add(lottoNumberHidden);
};

export const setDetailMode = () => {
  $(SELECTOR.LOTTO_CONTAINER).classList.remove(lottoNumberHidden);
};

export const showManualNumberingForm = () => {
  $(SELECTOR.MANUAL_NUMBERING_FORM).hidden = false;
};

export const hideManualNumberingForm = () => {
  $(SELECTOR.MANUAL_NUMBERING_FORM).hidden = true;
};

export const resetManualNumberingForm = () => {
  $(SELECTOR.MANUAL_NUMBERING_FORM).reset();
};
