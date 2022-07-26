import { COMMIT } from '../../store/constants.js';
import store from '../../store/index.js';

export default function LottoNumbersToggleButton() {
  const $lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');

  const toggle = event => {
    store.commit(COMMIT.SET_IS_VISIBLE_LOTTOS, event.target.checked);
  };

  $lottoNumbersToggleButton.addEventListener('change', toggle);
}
