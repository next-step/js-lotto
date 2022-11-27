import model from '../model/Model.js';
import { getLottoPurchaseCount, getLottoWinningNumbers } from '../service/lotto.js';
import { assertLottoPurchasePrice, assertLottoNumbers } from '../utils/validation.js';
import {
  getLottoPurchasePrice,
  getLottoPurchasingBonusNumber,
  getLottoPurchasingNumberArray,
  hideLottoPurchaseContainer,
  hideModal,
  renderLottoPurchaseContainer,
  renderLottoResult,
  renderResultForm,
  resetLottoPurchasePrice,
  resetLottoPurchasingNumbers,
  resetView,
  showCurrentPurchasedLottoStatus,
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
    model.reset();
    const lottoPurchasePrice = getLottoPurchasePrice();
    assertLottoPurchasePrice(lottoPurchasePrice);

    renderLottoPurchaseContainer(model.lottos, lottoPurchasePrice);
  } catch (error) {
    console.error(error);
    alert(error.message);

    resetLottoPurchasePrice();
  }
};

export const handleSubmitSelfBuyingForm = (e) => {
  e.preventDefault();

  try {
    const lottoPurchasePrice = getLottoPurchasePrice();
    const lottoPurchaseCount = getLottoPurchaseCount(lottoPurchasePrice);

    const lottoInputNumbers = getLottoPurchasingNumberArray();
    const lottoInputBonusNumber = getLottoPurchasingBonusNumber();

    const lottoNumbers = [...lottoInputNumbers, lottoInputBonusNumber];

    assertLottoNumbers(lottoNumbers);

    model.buyLottoSelf(lottoNumbers);

    resetLottoPurchasingNumbers();
    showCurrentPurchasedLottoStatus(model.lottos, lottoPurchasePrice);

    const isDoneLottoPurchase = model.lottos.length === lottoPurchaseCount;

    if (isDoneLottoPurchase) {
      hideLottoPurchaseContainer();
      renderLottoResult(lottoPurchaseCount, model.lottos);
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export const handleClickAutoBuyingButton = () => {
  try {
    const lottoPurchasePrice = getLottoPurchasePrice();
    const lottoPurchaseCount = getLottoPurchaseCount(lottoPurchasePrice);
    model.buyLottoAuto();

    showCurrentPurchasedLottoStatus(model.lottos, lottoPurchasePrice);
    const isDoneLottoPurchase = model.lottos.length === lottoPurchaseCount;

    if (isDoneLottoPurchase) {
      hideLottoPurchaseContainer();
      renderLottoResult(lottoPurchaseCount, model.lottos);
    }
  } catch (error) {
    console.error(error);
    alert(error.message);

    resetLottoPurchasePrice();
  }
};

export const handleSubmitResultForm = (e) => {
  e.preventDefault();

  try {
    if (model.isFinished) {
      handleClickOpenModal();
      return;
    }

    const { winning, bonus } = getLottoWinningNumbers();
    const lottoNumbers = [...winning, bonus];

    assertLottoNumbers(lottoNumbers);

    model.calculateLottoWinningResult(winning, bonus);

    renderResultForm(model.lottoWinningCount, model.rateOfReturn);
    handleClickOpenModal();

    model.isFinished = true;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export const handleClickReset = () => {
  model.reset();

  resetView(model.lottoPurchaseCount, model.lottos, model.rateOfReturn, model.lottoWinningCount);
};
