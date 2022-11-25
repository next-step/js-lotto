import { $ } from './utils/DOM.js';
import { getLottoNumbers } from './purchasedLottoNumbers.js';
import { validatePriceInput } from './validatePrice.js';

import {
  showPurchasedLotto,
  showWinningNumbersForm,
  renderLottoCount,
  renderLottoItems,
  showPurchasedLottoNumbers,
} from './view.js';

export const handleSubmit = (e) => {
  e.preventDefault();
  try {
    const priceInput = $('.purchasing-lotto-input').valueAsNumber;

    validatePriceInput(priceInput);

    const lottoNumbersList = getLottoNumbers(priceInput);
    const purchasedLottoCount = lottoNumbersList.length;

    showPurchasedLotto();
    showWinningNumbersForm();

    renderLottoCount(purchasedLottoCount);
    renderLottoItems(lottoNumbersList);
  } catch (error) {
    window.alert(error.message);
    console.error(error);
  }
};

export const handleToggleBtn = (e) => showPurchasedLottoNumbers(e);
