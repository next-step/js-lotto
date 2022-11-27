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

    model.lottoPurchasePrice = getLottoPurchasePrice();
    assertLottoPurchasePrice(model.lottoPurchasePrice);

    renderLottoPurchaseContainer(model.lottos, model.lottoPurchasePrice);
  } catch (error) {
    console.error(error);
    alert(error.message);

    resetLottoPurchasePrice();
  }
};

export const handleSubmitSelfBuyingForm = (e) => {
  e.preventDefault();

  try {
    const { lottoPurchasePrice } = model;
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
    const { lottoPurchasePrice } = model;
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
    const { winning, bonus } = getLottoWinningNumbers();
    const lottoNumbers = [...winning, bonus];

    assertLottoNumbers(lottoNumbers);

    model.calculateLottoWinningResult(winning, bonus);

    renderResultForm(model.lottoWinningCount, model.rateOfReturn);
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
