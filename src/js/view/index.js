import { $confirmButton, $lottoNumbersToggleButton, $modalClose, $restart, $showResultButton } from './Selector.js';
import { setLottoNumberToggle } from './Lotto.js';
import { onLottoRestart, onLottosBought, onModalClose, onModalShow } from './listener.js';
import { setVisibleResultAreas } from './Element.js';

let lottos = [];

export function initialize() {
  setVisibleResultAreas(false);
  $confirmButton.addEventListener('click', () => {
    lottos = onLottosBought(lottos);
  });
  $lottoNumbersToggleButton.addEventListener('click', setLottoNumberToggle);

  $showResultButton.addEventListener('click', () => onModalShow(lottos));
  $modalClose.addEventListener('click', onModalClose);
  $restart.addEventListener('click', onLottoRestart);
}
