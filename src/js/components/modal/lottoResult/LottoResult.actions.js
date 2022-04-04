import LottoService from '../../../services/Lotto.service.js';
import { $, $close } from '../../../helper/index.js';

export const toggleLottoResultModal = event => {
  event.preventDefault();
  event.stopPropagation();
  if (!event.target.matches('.modal-close')) return;

  $close();
};

export const lottoRestart = ({ target: _button }) => {
  if (!_button.matches('[data-props="restart-button"]')) return;

  LottoService.initLottos();
  initElement();
  $close();
};

function initElement() {
  const $amountInput = $('[data-props="amount-input"]');
  $amountInput.value = '';

  const $lottoSection = $('.lotto-section');
  $lottoSection.replaceChildren();
}
