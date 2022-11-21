import { buy } from '../service/LottoBuyer.js';
import { validatePurchasingAmount } from '../util/Validator.js';
import { setVisibleResultAreas } from './Element.js';
import { setLottos } from './Lotto.js';
import { getMyLottoResult, updateLottoResult } from './LottoResult.js';
import { $checkPurchasingManually, $modal, $purchasingAmountInput } from './Selector.js';

/**
 * @param {number[]} lottos
 */
export const onModalShow = (lottos) => {
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
  setVisibleResultAreas(false);
  onModalClose();
};

export const onLottosBought = () => {
  try {
    const purchasingAmount = $purchasingAmountInput.value;
    validatePurchasingAmount(purchasingAmount);
    // TODO: 기능 작성 후 역할 분리하기
    const isPurchasingManually = $checkPurchasingManually.checked;
    // 로또 구매 로직
    const lottos = buy(parseInt(purchasingAmount));
    setLottos(lottos);
    setVisibleResultAreas();
    return lottos;
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};
