import { buy } from '../util/LottoBuyer.js';
import { validatePurchasingAmount } from '../util/Validator.js';
import { toggleResultAreas } from './Element.js';
import { setLottos } from './Lotto.js';
import { getMyLottoResult, updateLottoResult } from './LottoResult.js';
import { $modal, $purchasingAmountInput } from './Selector.js';

/**
 * @param {number[]} lottos
 */
export const onModalShow = (lottos = []) => {
  try {
    updateLottoResult(lottos, getMyLottoResult(lottos));
    $modal.classList.add('open');
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

export const onModalClose = () => {
  $modal.classList.remove('open');
};

export const onLottoRestart = () => {
  $purchasingAmountInput.value = '';
  toggleResultAreas();
  onModalClose();
};

export const onLottosBought = () => {
  try {
    const purchasingAmount = $purchasingAmountInput.value;
    validatePurchasingAmount(purchasingAmount);
    const lottos = buy(parseInt(purchasingAmount));
    setLottos(lottos);
    toggleResultAreas();
    return lottos;
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};
