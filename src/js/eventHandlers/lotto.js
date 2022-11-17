import model from '../model/Model.js';
import { getLottoWinningNumbers } from '../service/lotto.js';
import { assertLottoPurchasePrice, assertLottoWinningNumbers } from '../utils/validation.js';
import {
  getLottoPurchasePrice,
  hideModal,
  renderLottoResult,
  renderResultForm,
  resetLottoPurchasePrice,
  resetView,
  showModal,
  toggleLottoNumber,
} from '../view/lotto.js';

export const handleClickNumberToggle = () => {
  toggleLottoNumber();
};

export const handleClickOpenModal = () => {
  showModal();
};

export const handleCLickCloseModal = () => {
  hideModal();
};

export const handleSubmitPaymentForm = (e) => {
  e.preventDefault();

  try {
    const lottoPurchasePrice = getLottoPurchasePrice();

    assertLottoPurchasePrice(lottoPurchasePrice);

    model.buyLotto(lottoPurchasePrice);

    renderLottoResult(model.lottoPurchaseCount, model.lottos);
  } catch (error) {
    console.error(error);
    alert(error.message);

    resetLottoPurchasePrice();
  }
};

export const handleSubmitResultForm = (e) => {
  e.preventDefault();

  try {
    const { winning, bonus } = getLottoWinningNumbers();

    assertLottoWinningNumbers([...winning, bonus]);

    model.calculateLottoWinningResult(winning, bonus);
    renderResultForm(model.rateOfReturn, model.lottoWinningCount);

    handleClickOpenModal();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export const handleClickReset = () => {
  model.reset();

  resetView(model.lottoPurchaseCount, model.lottos, model.rateOfReturn, model.lottoWinningCount);
};
