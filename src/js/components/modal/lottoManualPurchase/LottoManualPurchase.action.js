import LottoService from '../../../services/Lotto.service.js';
import LottoList from '../../lottoList/LottoList.js';
import LottoCheck from '../../lottoCheck/LottoCheck.js';
import { $, $all, $allElementProp, $elementRemoveClass } from '../../../helper/index.js';

export const toggleLottoManualPurchaseModal = event => {
  event.preventDefault();
  event.stopPropagation();
  if (!event.target.matches('.modal-close')) return;
  $elementRemoveClass($('.modal'), 'open');
};

export const purchaseCountInput = event => {
  event.preventDefault();
  const $target = event.target;
  if (!$target.matches('[data-props="purchase-count-button"]')) return;

  const $purchaseCountInput = $('[data-props="purchase-count-input"]');
  const $manualPurchaseForm = $('[data-props="manual-purchase-form"]');
  try {
    const count = $purchaseCountInput.value;
    LottoService.isValidCount(count);
    $manualPurchaseForm.replaceChildren(LottoService.createManualPurchaseFormContent(count));
  } catch (error) {
    $purchaseCountInput.value = '';
    alert(error.message);
  }
};

export const purchaseConfirm = ({ target: _confirmButton }) => {
  if (!_confirmButton.matches('.manual-purchase-confirm-button')) return;
  try {
    const checkPurchaseLotto = Array.from($all('[data-props="lotto-purchase-numbers"]')).map(
      $element => LottoService.checkLottery($allElementProp('.purchase-number', 'value', $element)),
    );
    const $lottoList = LottoList(checkPurchaseLotto);
    const $lottoCheck = LottoCheck();
    const $lottoSection = $('.lotto-section');
    $lottoSection.replaceChildren($lottoList, $lottoCheck);
    $elementRemoveClass($lottoSection, 'hidden');
    $elementRemoveClass($('.modal'), 'open');
  } catch (error) {
    alert(error.message);
  }
};
