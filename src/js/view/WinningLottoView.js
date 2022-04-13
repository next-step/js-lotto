import AbstractView from './AbstractView.js';
import WinningLotto from '../WinningLotto.js';
import Wallet from '../data/Wallet.js';
import { WINNING_RESULT_CASE } from '../constants/lotto.js';

const $winingLottoForm = document.querySelector('#winning-result-form');
const $winningAllNumbers = $winingLottoForm.querySelectorAll(
  'input.winning-number, input.bonus-number'
);
const $winningNumbers = $winingLottoForm.querySelectorAll(
  'input.winning-number'
);
const $winningBonusNumber = $winingLottoForm.querySelector('.bonus-number');
const $winningResultModal = document.querySelector('.modal');
const $modalCloseButton = $winningResultModal.querySelector('.modal-close');
const $restartButton = $winningResultModal.querySelector('.btn.btn-cyan');
const $winningResultPanel = $winningResultModal.querySelector('tbody');
const $resultRevenue = $winningResultModal.querySelector(
  '.text-center.font-bold'
);

function notificationDuplicateNumber() {
  alert('중복된 당첨 숫자가 존재합니다.');
}

function winningResultPanelTemplate({ label, reward, winningNumber }) {
  const $template = document.createElement('template');
  $template.innerHTML = `<tr class="text-center">
    <td class="p-3">${label}</td>
    <td class="p-3">${new Intl.NumberFormat().format(reward)}</td>
    <td class="p-3">${winningNumber} 개</td>
  </tr>`;
  return $template.content.firstChild;
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

  static #winningNumbers() {
    return [...$winningNumbers].map(($winningNumber) => $winningNumber.value);
  }

  static #winningBonusNumber() {
    return $winningBonusNumber.value;
  }

  static #initializeWinningNumbers() {
    $winningAllNumbers.forEach(($winningNumber) => {
      // eslint-disable-next-line no-param-reassign
      $winningNumber.value = null;
    });
  }

  static #changeWinningResultPanel(winningResult) {
    const $panel = document.createDocumentFragment();
    $panel.append(
      ...WINNING_RESULT_CASE.map((winningCase) =>
        winningResultPanelTemplate({
          label: winningCase.label,
          reward: winningCase.reward,
          winningNumber: winningResult[winningCase.key],
        })
      )
    );
    $winningResultPanel.replaceChildren($panel);
    $resultRevenue.innerHTML = `당신의 총 수익률은 ${
      WinningLotto.totalRevenue(winningResult) / Wallet.purchasedPrice
    }%입니다.`;
  }

  static #openModal() {
    $winningResultModal.classList.add('open');
    const winningResult = WinningLotto.winningResult({
      lottoList: Wallet.lottos,
      winningNumbers: WinningLottoView.#winningNumbers(),
      bonusNumber: WinningLottoView.#winningBonusNumber(),
    });
    WinningLottoView.#changeWinningResultPanel(winningResult);
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
