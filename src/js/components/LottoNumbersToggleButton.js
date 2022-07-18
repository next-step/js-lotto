import store, { COMMIT } from '../store/index.js';

export default function lottoNumbersToggleButton() {
  const $lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');

  const toggle = event => {
    store.commit(COMMIT.SET_IS_VISIBLE_LOTTOS, event.target.checked);
  };

  $lottoNumbersToggleButton.addEventListener('change', toggle);

  return $lottoNumbersToggleButton;
}
