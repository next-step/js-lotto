import { ERROR_MESSAGE, LOTTO_PRICE } from '../constants/lotto.js';
import { isValidLottoPurchasePrice } from '../utils/validate.js';
import {
  getLottoPurchasePrice,
  renderLottoPurchaseCountText,
  renderLottoIcons,
  showPurchasedLotto,
  showLottoResultForm,
  showLottoNumber,
} from '../view/lotto.js';

export const handleSubmit = (e) => {
  e.preventDefault();

  try {
    const lottoPurchasePrice = getLottoPurchasePrice();

    if (!isValidLottoPurchasePrice(lottoPurchasePrice)) {
      throw Error(ERROR_MESSAGE.INVALID_LOTTO_PRICE);
    }

    const lottoCount = lottoPurchasePrice / LOTTO_PRICE;

    renderLottoPurchaseCountText(lottoCount);
    renderLottoIcons(lottoCount);

    showPurchasedLotto();
    showLottoResultForm();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export const handleClickNumberToggle = () => {
  showLottoNumber();
};
