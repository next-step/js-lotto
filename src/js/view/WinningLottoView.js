import AbstractView from './AbstractView.js';
import WinningLotto from '../WinningLotto.js';

const $winingLottoForm = document.querySelector('#winning-result-form');
const $winningAllNumbers = $winingLottoForm.querySelectorAll(
  'input.winning-number, input.bonus-number'
);
const $winningResultModal = document.querySelector('.modal');
const $modalCloseButton = $winningResultModal.querySelector('.modal-close');
const $restartButton = $winningResultModal.querySelector('.btn.btn-cyan');

function notificationDuplicateNumber() {
  alert('중복된 당첨 숫자가 존재합니다.');
}

class WinningLottoView extends AbstractView {
  static #winningNumberList() {
    return Array.from($winningAllNumbers).map(
      ($winningNumber) => $winningNumber.value
    );
  }

  static #hideWinningHistory() {
    $winingLottoForm.classList.add('hide');
  }

  static #initializeWinningNumbers() {
    $winningAllNumbers.forEach(($winningNumber) => {
      // eslint-disable-next-line no-param-reassign
      $winningNumber.value = null;
    });
  }

  static #openModal() {
    $winningResultModal.classList.add('open');
  }

  static #closeModal() {
    $winningResultModal.classList.remove('open');
  }

  static #handleWinningResult(event) {
    event.preventDefault();
    if (
      WinningLotto.isInvalidWinningNumbers(
        WinningLottoView.#winningNumberList()
      )
    ) {
      notificationDuplicateNumber();
      return;
    }
    WinningLottoView.#openModal();
  }

  static #handleRestart(onInitialize) {
    WinningLottoView.#closeModal();
    onInitialize();
  }

  static showWinningLotto() {
    $winingLottoForm.classList.remove('hide');
  }

  static initialize() {
    WinningLottoView.#hideWinningHistory();
    WinningLottoView.#initializeWinningNumbers();
  }

  static eventBindings(onInitialize) {
    $winingLottoForm.addEventListener(
      'submit',
      WinningLottoView.#handleWinningResult
    );
    $modalCloseButton.addEventListener('click', WinningLottoView.#closeModal);
    $restartButton.addEventListener('click', () =>
      WinningLottoView.#handleRestart(onInitialize)
    );
  }
}
export default WinningLottoView;
