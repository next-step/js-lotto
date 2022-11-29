import { $, $$ } from './utils/DOM.js';

import {
  renderPurchasedLotto,
  renderWinningNumbersForm,
  renderLottoCount,
  renderLottoItems,
  renderPurchasedLottoNumbers,
} from './view/purchasedLotto.js';
import { getLottoNumbers } from './getLottoNumbers.js';
import { validatePriceInput } from './validatePrice.js';
import {
  validateWithinLottoNumberRange,
  hasDuplicatedNumber,
} from './validateWinningNumbersAndBonus.js';
import { openModal } from './modal.js';

export const handleSubmit = (e) => {
  e.preventDefault();
  try {
    const priceInput = $('.purchasing-lotto-input').valueAsNumber;

    validatePriceInput(priceInput);

    const lottoNumbersList = getLottoNumbers(priceInput);
    const purchasedLottoCount = lottoNumbersList.length;

    renderPurchasedLotto();
    renderWinningNumbersForm();

    renderLottoCount(purchasedLottoCount);
    renderLottoItems(lottoNumbersList);
  } catch (error) {
    window.alert(error.message);
    console.error(error);
  }
};

export const handleToggleBtn = (e) => renderPurchasedLottoNumbers(e);

export const handleOpenModal = (e) => {
  e.preventDefault();
  try {
    const $winningNumbers = $$('.winning-number');
    const $bonusNumber = $('.bonus-number');

    const winningNumbersAndBonus = [...$winningNumbers, $bonusNumber].map(
      (ele) => ele.valueAsNumber,
    );

    validateWithinLottoNumberRange(winningNumbersAndBonus);
    hasDuplicatedNumber(winningNumbersAndBonus);

    openModal(winningNumbersAndBonus);
  } catch (error) {
    window.alert(error.message);
    console.error(error);
  }
};

export const handleRestart = () => {
  try {
    window.location.reload();
  } catch (error) {
    window.alert(error.message);
    console.error(error);
  }
};
