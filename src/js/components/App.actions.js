import { $, $elementRemoveClass, $allElementProp } from '../helper/index.js';
import LottoList from './lottoList/LottoList.js';
import LottoCheck from './lottoCheck/LottoCheck.js';
import LottoResultModal from './lottoResultModal/LottoResultModal.js';
import LottoService from '../services/Lotto.service.js';

export const inputAmount = event => {
  event.preventDefault();

  const $amountInput = $('[data-props="amount-input"]');
  const $lottoSection = $('.lotto-section');
  try {
    const count = LottoService.validCount($amountInput.value);

    const $lottoList = LottoList(count);
    const $lottoCheck = LottoCheck();

    $lottoSection.replaceChildren($lottoList, $lottoCheck);
    $elementRemoveClass($lottoSection, 'hidden');
  } catch (error) {
    $amountInput.value = '';
    alert(error.message);
  }
};

export const toggleLottoResultModal = event => {
  event.stopPropagation();
  const $target = event.target;

  if (LottoService.notingAction($target)) return;

  const $modal = $('.modal');

  try {
    if (LottoService.isLotteryOpen($target)) {
      const purchasedNumbers = $allElementProp('.winning-number', 'value');
      const lotteryResult = LottoService.lotteryResult(purchasedNumbers);
      const $lottoResultModal = LottoResultModal(lotteryResult);
      $modal.replaceChildren($lottoResultModal);
    }
    $modal.classList.toggle('open');
  } catch (error) {
    alert(error.message);
  }
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
