import {selector, winningSelector} from "./constants/selector.js";
import {buyLotto, rankLotto, priceEarningRatio} from "./service.js";
import {getWinningNumbers, getRandomNumbers} from "./utils/index.js";
import {isDuplicateNumber} from "./isValidation.js";
import {MESSAGE} from "./constants/index.js";
import {$$} from "./utils/index.js";

import {paintRankLotto, paintRevenue} from "./view.js";

export const handlePaymentForm = (event) => {
  event.preventDefault();

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
    selector.modalOpen.classList.add("open");

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
  selector.modalOpen.classList.remove("open");
};
