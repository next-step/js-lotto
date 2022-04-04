import { $, $handleDOMError, $open } from '../helper/index.js';
import { LottoManualPurchase } from './modal/index.js';
import LottoService from '../services/Lotto.service.js';

export const handleSubmitAmount = event => {
  event.preventDefault();

  const $amountInput = $('[data-props="amount-input"]');
  try {
    setModalContent($amountInput.value);
    $open();
  } catch (error) {
    $handleDOMError({ $amountInput, isReset: true, error });
  }
};

function getModalContent(amount) {
  return LottoManualPurchase(LottoService.validAmount(amount));
}

function setModalContent(amount) {
  $('.modal').replaceChildren(getModalContent(amount));
}
