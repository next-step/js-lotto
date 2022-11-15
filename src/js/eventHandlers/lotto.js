import { getLottoPurchaseCount } from '../service/lotto.js';
import { isValidLottoPurchasePrice } from '../utils/validation.js';
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

    if (isValidLottoPurchasePrice(lottoPurchasePrice)) return;

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
