import {selector} from "./constants/selector.js";
import {buyLotto} from "./service.js";
import {getWinningNumbers} from "./utils/index.js";
import {isDuplicateNumber} from "./isValidation.js";
import {MESSAGE} from "./constants/index.js";

export const handlePaymentForm = (event) => {
  event.preventDefault();

  const payment = selector.paymentInput.valueAsNumber;
  selector.paymentInput.valueAsNumber = null;

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
    ...getWinningNumbers(selector.winningInput),
    selector.bonusInput.valueAsNumber,
  ];

  if (!isDuplicateNumber(winningAndBonusNumber)) {
    selector.modalOpen.classList.add("open");
  } else {
    alert(MESSAGE.DUPLICATED_LOTTO_NUMBER);
  }
};

export const handleCloseModal = () => {
  selector.modalOpen.classList.remove("open");
};
