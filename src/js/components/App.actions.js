import { $, $elementToggleClass } from '../helper/index.js';
import { LottoManualPurchase } from './modal/index.js';
import LottoService from '../services/Lotto.service.js';

export const inputAmount = event => {
  event.preventDefault();

  const $amountInput = $('[data-props="amount-input"]');
  const $modal = $('.modal');
  try {
    const count = LottoService.validAmount($amountInput.value);
    const $lottoManualPurchase = LottoManualPurchase(count);
    $modal.replaceChildren($lottoManualPurchase);
    $elementToggleClass($modal, 'open');
  } catch (error) {
    $amountInput.value = '';
    alert(error.message);
  }
};
