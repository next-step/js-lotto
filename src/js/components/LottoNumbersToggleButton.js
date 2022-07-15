import store from '../store/index.js';
import { COMMIT } from '../constants/store.js';

export default function lottoNumbersToggleButton() {
  const $lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');

  const onToggleVisibleLottos = event => {
    store.commit(COMMIT.SET_IS_VISIBLE_LOTTOS, event.target.checked);
  };

  $lottoNumbersToggleButton.addEventListener('change', onToggleVisibleLottos);

  return $lottoNumbersToggleButton;
}
