import LottoService from '../../../services/Lotto.service.js';
import { $, $elementRemoveClass } from '../../../helper/index.js';

export const toggleLottoResultModal = event => {
  event.preventDefault();
  event.stopPropagation();
  if (!event.target.matches('.modal-close')) return;
  $elementRemoveClass($('.modal'), 'open');
};

export const lottoRestart = ({ target }) => {
  if (!target.matches('[data-props="restart-button"]')) return;

  const $modal = $('.modal');
  const $amountInput = $('[data-props="amount-input"]');
  const $lottoSection = $('.lotto-section');

  LottoService.initLottos();
  $lottoSection.replaceChildren();
  $amountInput.value = '';
  $modal.classList.remove('open');
};
