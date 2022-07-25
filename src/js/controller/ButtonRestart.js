import { DISPATCH } from '../store/constants.js';
import store from '../store/index.js';
import ModalClose from './Modal/Close.js';

export default function ButtonRestart() {
  const $restartButton = document.querySelector('#restart-button');
  const $inputAmount = document.querySelector('#input-amount');
  const $inputWinningNumbers = document.querySelectorAll('.winning-number');
  const $inputBonusNumber = document.querySelector('.bonus-number');

  const clearInputs = () => {
    $inputWinningNumbers.forEach($el => {
      $el.value = '';
    });
    $inputBonusNumber.value = '';
    $inputAmount.value = '';
  };

  const restart = () => {
    store.dispatch(DISPATCH.RESTART_LOTTO);
    clearInputs();
    ModalClose();
  };

  $restartButton.addEventListener('click', restart);
}
