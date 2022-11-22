import {
  $confirmButton,
  $lottoNumbersToggleButton,
  $manualAddButton,
  $modalClose,
  $restart,
  $resultAreas,
  $showResultButton,
  $startButton,
} from './Selector.js';
import { setLottoNumberToggle } from './Lotto.js';
import {
  onLottoRestart,
  onLottosBought,
  onManualAdd,
  onModalClose,
  onModalShow,
  onPurchasingAmountEntered,
} from './listener.js';
import { setVisibleAreas } from './Element.js';

let lottos = [];

export function initialize() {
  setVisibleAreas($resultAreas, false);
  $startButton.addEventListener('click', onPurchasingAmountEntered);
  $manualAddButton.addEventListener('click', onManualAdd);
  $lottoNumbersToggleButton.addEventListener('click', setLottoNumberToggle);
  $confirmButton.addEventListener('click', () => {
    lottos = onLottosBought();
  });

  $showResultButton.addEventListener('click', () => onModalShow(lottos));
  $modalClose.addEventListener('click', onModalClose);
  $restart.addEventListener('click', onLottoRestart);
}
