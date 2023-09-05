import Lotto from "./js/lotto";
import ModalView from "./js/view/ModaView"
import { RESULT_MESSAGE, INPUT_NUMBER_LENGTH } from './js/utils/constants'
import { inputElement, buttonElement, resultElement, showLottoNumbers, lottoListEl, winningNumbers, bonusNumber, openResult, restartBtn, rateResult } from "./js/utils/selector";

buttonElement.addEventListener('click', () => {
  const inputValue = inputElement.value;
  Lotto.getLottoPurchaseAmount(inputValue);
  resultElement.textContent = RESULT_MESSAGE.PURCHASE(Lotto.numLottos);
});

showLottoNumbers.addEventListener('change', () => {
  lottoListEl.textContent = Lotto.lottos;
});

winningNumbers.forEach(function (input) {
  input.addEventListener('input', function (event) {
    if (event.target.value.length > INPUT_NUMBER_LENGTH) {
      event.target.value = event.target.value.slice(0, INPUT_NUMBER_LENGTH);
    }
  });
});

bonusNumber.addEventListener('input', function (event) {
  if (event.target.value.length > INPUT_NUMBER_LENGTH) {
    event.target.value = event.target.value.slice(0, INPUT_NUMBER_LENGTH);
  }
});

openResult.addEventListener('click', function () {
  const hasEmptyField = [...winningNumbers].some(input => input.value === '') || bonusNumber.value === '';
  const winningNumberList = [...winningNumbers].map(input => Number(input.value));

  if (hasEmptyField) {
    ModalView.showMessage(RESULT_MESSAGE.INPUT)
  } else {
    Lotto.matchedRank(winningNumberList, bonusNumber.value);
    ModalView.updateTable();
    rateResult.textContent = RESULT_MESSAGE.RESULT_RATE(Lotto.profitPercentage);
    ModalView.showModal();
  }
});

restartBtn.addEventListener('click', () => {
  location.reload();
});