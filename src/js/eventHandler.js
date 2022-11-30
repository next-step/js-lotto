import {selector} from "./constants/selector.js";
import {
  issueLotto,
  buyLotto,
  rankLotto,
  priceEarningRatio,
  resetLotto,
} from "./service.js";
import {$$, getWinningNumbers, getRandomNumbers} from "./utils/index.js";
import {isDuplicateNumber} from "./isValidation.js";
import {MESSAGE} from "./constants/index.js";
import {
  hideElement,
  hideModal,
  paintRankLotto,
  paintRevenue,
  showElement,
  showModal,
} from "./view.js";

export const handlePaymentForm = (event) => {
  event.preventDefault();
  showElement(selector.purchaseSection);
  showElement(selector.winningForm);

  const payment = selector.paymentInput.valueAsNumber;
  buyLotto(payment);
};

export const handleShowNumber = ({target}) => {
  selector.lottoContainer.classList.toggle(
    "lotto-container-hidden",
    !target.checked
  );
};

export const handleWinningForm = (event) => {
  event.preventDefault();

  const winningAndBonusNumber = [
    ...getWinningNumbers(selector.winningInput)[0],
    selector.bonusInput.valueAsNumber,
  ];

  if (!isDuplicateNumber(winningAndBonusNumber)) {
    showModal(selector.modalOpen);

    const randomNumberList = getRandomNumbers(".lotto-number");
    const resultRankLotto = rankLotto(winningAndBonusNumber, randomNumberList);
    const payment = selector.paymentInput.valueAsNumber;
    const earningRatio = priceEarningRatio(payment, resultRankLotto);

    paintRankLotto(resultRankLotto);
    paintRevenue(earningRatio);
  } else {
    alert(MESSAGE.DUPLICATED_LOTTO_NUMBER);
  }
};

export const handleCloseModal = () => {
  hideModal(selector.modalOpen);
};

export const handleAllReset = () => {
  hideElement(selector.purchaseSection);
  hideElement(selector.winningForm);
  handleCloseModal();

  buyLotto();
  issueLotto();
  resetLotto();
  $$("input").forEach((input) => (input.value = null));
};
