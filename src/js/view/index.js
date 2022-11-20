import { $confirmButton, $lottoNumbersToggleButton, $modalClose, $restart, $showResultButton } from './Selector.js';
import { setLottoNumberToggle } from './Lotto.js';
import { onLottoRestart, onLottosBought, onModalClose, onModalShow } from './listener.js';
import { toggleResultAreas } from './Element.js';

let lottos = [];

export function initialize() {
  toggleResultAreas();
  $confirmButton.addEventListener('click', () => {
    lottos = onLottosBought(lottos);
  });
  $lottoNumbersToggleButton.addEventListener('click', setLottoNumberToggle);

  $showResultButton.addEventListener('click', () => onModalShow(lottos));
  $modalClose.addEventListener('click', onModalClose);
  $restart.addEventListener('click', onLottoRestart);
}
