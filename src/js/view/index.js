import {
  $confirmButton,
  $lottoNumbersToggleButton,
  $manualAddButton,
  $modalClose,
  $purchasingAmountInput,
  $restart,
  $resultAreas,
  $showResultButton,
  $startButton,
  $winningNumbers,
} from './Selector.js';
import { setLottoNumberToggle } from './Lotto.js';
import {
  onLottoNumberInput,
  onLottoRestart,
  onLottosBought,
  onManualAdd,
  onModalClose,
  onModalShow,
  onPurchasingAmount,
  onPurchasingAmountEntered,
} from './Listener.js';
import { setVisibleAreas } from './Element.js';

let lottos = [];

export function initialize() {
  setVisibleAreas($resultAreas, false);
  $winningNumbers.forEach((input) => input.addEventListener('keypress', onLottoNumberInput));
  $purchasingAmountInput.addEventListener('keypress', onPurchasingAmountEntered);
  $startButton.addEventListener('click', onPurchasingAmount);
  $manualAddButton.addEventListener('click', onManualAdd);
  $lottoNumbersToggleButton.addEventListener('click', setLottoNumberToggle);
  $confirmButton.addEventListener('click', () => {
    lottos = onLottosBought();
  });

  $showResultButton.addEventListener('click', () => onModalShow(lottos));
  $modalClose.addEventListener('click', onModalClose);
  $restart.addEventListener('click', onLottoRestart);
}
