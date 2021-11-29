import { ANSWER_INPUT_NAMES } from '../constant/lotto.js';
import lottoManager from '../model/lotto.js';
import { getLottoAmount } from '../service/lotto.js';
import {
  setBriefMode,
  setDetailMode,
  updateLottoCount,
  updateLottoTicketView,
} from '../view/main.js';
import { closeModal, openModal, updateResultView } from '../view/resultModal.js';

const buyLotto = (price) => {
  const lottoAmount = getLottoAmount(price);

  lottoManager.issue(lottoAmount);

  updateLottoCount(lottoManager.lottos.length);
  updateLottoTicketView(lottoManager.lottos);
};

export const handlePayment = (event) => {
  event.preventDefault();

  const price = event.target.elements['price'].value;

  buyLotto(price);
};

export const handleLottoDetailToggle = ({ target }) => {
  if (target.checked) {
    setDetailMode();
  } else {
    setBriefMode();
  }
};

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
  updateLottoCount();
  updateLottoTicketView();
  updateResultView();
};

export const handleModalClose = () => {
  reset();
  closeModal();
};

export const handleModalCloseOuter = ({ target, currentTarget }) => {
  if (target !== currentTarget) return;

  handleModalClose();
};
