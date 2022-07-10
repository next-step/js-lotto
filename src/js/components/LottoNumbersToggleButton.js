import { mutation } from '../store/index.js';

export default function lottoNumbersToggleButton() {
  const $lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');

  const onToggleVisibleLottos = event => {
    mutation.setIsVisibleLottos(event.target.checked);
  };

  $lottoNumbersToggleButton.addEventListener('change', onToggleVisibleLottos);

  return $lottoNumbersToggleButton;
}
