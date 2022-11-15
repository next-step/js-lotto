import { ERROR_MESSAGE, LOTTO } from '../constants/index.js';
import { getLottoPurchaseCount } from '../service/lotto.js';
import { validation } from '../utils/validation.js';
import {
  getLottoPurchasePrice,
  renderLottoPurchaseCountText,
  renderLottoIcons,
  showPurchasedLotto,
  showLottoResultForm,
  toggleLottoNumber,
} from '../view/lotto.js';

export const handleSubmit = (e) => {
  e.preventDefault();

  try {
    const lottoPurchasePrice = getLottoPurchasePrice();

    if (validation.isZeroNumber(Number(lottoPurchasePrice))) {
      throw Error(ERROR_MESSAGE.INVALID_ZERO_LOTTO_PRICE);
    }

    if (!validation.isPositiveNumber(lottoPurchasePrice)) {
      throw Error(ERROR_MESSAGE.INVALID_NEGATIVE_LOTTO_PRICE);
    }

    if (!validation.isRemainderZero(lottoPurchasePrice, LOTTO.PRICE)) {
      throw Error(ERROR_MESSAGE.INVALID_LOTTO_PRICE_UNIT);
    }

    const lottoPurchaseCount = getLottoPurchaseCount(lottoPurchasePrice);

    renderLottoPurchaseCountText(lottoPurchaseCount);
    renderLottoIcons(lottoPurchaseCount);

    showPurchasedLotto();
    showLottoResultForm();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export const handleClickNumberToggle = () => {
  toggleLottoNumber();
};
