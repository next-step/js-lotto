import { $, $allElementProp } from '../../helper/index.js';
import LottoService from '../../services/Lotto.service.js';
import { LottoResult } from '../modal/index.js';

export const toggleLottoResultModal = event => {
  event.stopPropagation();
  const $target = event.target;
  if ($target.matches('.open-purchase-modal-button')) return;
  if (LottoService.notingAction($target)) return;
  const $modal = $('.modal');
  try {
    if (LottoService.isLotteryOpen($target)) {
      const purchasedNumbers = $allElementProp('.winning-number', 'value');
      const lotteryResult = LottoService.lotteryResult(purchasedNumbers);
      const $lottoResult = LottoResult(lotteryResult);
      $modal.replaceChildren($lottoResult);
    }
    $modal.classList.add('open');
  } catch (error) {
    alert(error.message);
  }
};
