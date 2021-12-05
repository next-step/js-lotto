import ERROR_MESSAGE from '../constant/errorMessage.js';
import { ANSWER_INPUT_NAMES } from '../constant/lotto.js';
import lottoManager from '../model/lotto.js';
import { isAnswerValid } from '../service/lotto.js';
import { focusPaymentInput, resetMainView } from '../view/main.js';
import { closeModal, openModal, updateResultView } from '../view/resultModal.js';

const filterAnswer = (elements) =>
  Object.fromEntries(
    Object.entries(elements)
      .filter(([key]) => ANSWER_INPUT_NAMES.includes(key))
      .map(([key, value]) => [key, value.valueAsNumber])
  );

export const handleAnswer = (event) => {
  event.preventDefault();

  const answer = filterAnswer(event.target.elements);

  if (!lottoManager.lottos.length) {
    alert(ERROR_MESSAGE.EMPTY_LOTTO);
    return;
  }

  if (!isAnswerValid(answer)) {
    alert(ERROR_MESSAGE.INVALID_ANSWER_INPUT);
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
