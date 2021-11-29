import { ANSWER_INPUT_NAMES } from '../constant/lotto.js';
import lottoManager from '../model/lotto.js';
import { focusPaymentInput, resetMainView } from '../view/main.js';
import { closeModal, openModal, updateResultView } from '../view/resultModal.js';

const isLottoEmpty = () => !lottoManager.lottos.length;

const isAnswerValid = (answer) => {
  return Object.values(answer).every((inputNumber) => inputNumber || inputNumber >= 1);
};

const filterAnswer = (elements) =>
  Object.fromEntries(
    Object.entries(elements)
      .filter(([key]) => ANSWER_INPUT_NAMES.includes(key))
      .map(([key, value]) => [key, value.valueAsNumber])
  );

export const handleAnswer = (event) => {
  event.preventDefault();

  const answer = filterAnswer(event.target.elements);

  if (isLottoEmpty()) {
    alert('로또를 구매하지 않았습니다. 로또를 구매한 후 결과를 확인해 주세요.');
    return;
  }

  if (!isAnswerValid(answer)) {
    alert('빈 칸이 있습니다. 모두 입력 해주세요.');
    return;
  }

  lottoManager.setResult(answer);
  updateResultView(lottoManager.result);
  openModal();
};

const reset = () => {
  lottoManager.resetAll();
  resetMainView();
  focusPaymentInput();
};

export const handleModalClose = () => {
  reset();
  closeModal();
};

export const handleModalCloseOuter = ({ target, currentTarget }) => {
  if (target !== currentTarget) return;

  handleModalClose();
};
