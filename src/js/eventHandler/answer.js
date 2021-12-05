import ERROR_MESSAGE from '../constant/errorMessage.js';
import { ANSWER_INPUT_NAMES } from '../constant/lotto.js';
import lottoManager from '../model/lotto.js';
import { isValidLottoInput } from '../service/lotto.js';
import { focusPaymentInput, resetMainView } from '../view/main.js';
import { closeModal, openModal, updateResultView } from '../view/resultModal.js';

const filterAnswer = (elements) =>
  Object.fromEntries(
    Object.entries(elements)
      .filter(([key]) => ANSWER_INPUT_NAMES.includes(key))
      .map(([key, value]) => [key, value.valueAsNumber])
  );

const isValid = (answer) => {
  return lottoManager.amount && isValidLottoInput(answer) && !lottoManager.hasLeft();
};

const getErrorMessage = (answer) => {
  if (!lottoManager.amount) {
    return ERROR_MESSAGE.EMPTY_LOTTO;
  }

  if (!isValidLottoInput(answer)) {
    return ERROR_MESSAGE.INVALID_ANSWER_INPUT;
  }

  if (lottoManager.hasLeft()) {
    return ERROR_MESSAGE.LOTTO_LEFT;
  }
};

export const handleLottoAnswer = (event) => {
  event.preventDefault();

  const answer = filterAnswer(event.target.elements);

  if (!isValid(answer)) {
    alert(getErrorMessage(answer));
    return;
  }

  lottoManager.setResult(answer);
  updateResultView(lottoManager.result);
  openModal();
};

export const handleModalClose = () => {
  lottoManager.resetAll();
  resetMainView();
  focusPaymentInput();
  closeModal();
};

export const handleModalCloseOuter = ({ target, currentTarget }) => {
  if (target !== currentTarget) return;

  handleModalClose();
};
