import { $, addEvent } from '../utils/utils.js';
import {
  MESSAGE,
  WINNINGNUMBER,
  WINNINGMONEY,
} from '../constants/constants.js';

class WinningNumberInput {
  constructor() {
    this.number = null;
  }
}

export default function LottoResult(app) {
  this.numbers = [];
  this.winningNumbers = [];
  this.bonus = 0;
  this.result = [];

  const lottoResultArea = $({
    target: app.container,
    selector: '.lotto-result-form',
  });

  const winningNumberContainer = $({
    target: lottoResultArea,
    selector: '.winning-numbers',
  });

  const bonusNumber = $({ selector: '.bonus-number' });
  const showResultButton = $({
    target: lottoResultArea,
    selector: '.open-result-modal-button',
  });
  const modal = $({ target: app.container, selector: '.modal' });
  const modalClose = $({ target: modal, selector: '.modal-close' });
  const profitRate = $({ target: modal, selector: '.profit-rate' });
  const restartButton = $({ target: modal, selector: '.restart-button' });

  this.setLottoResult = () => {
    this.numbers = [];
    winningNumberContainer.innerHTML = '';

    let count = 0;
    while (count < 6) {
      this.numbers = [...this.numbers, new WinningNumberInput()];
      const numberInput = document.createElement('div');
      numberInput.innerHTML = WINNINGNUMBER;
      numberInput.dataset.index = count;
      winningNumberContainer.appendChild(numberInput);
      count++;
    }
  };

  const addWinningNumber = e => {
    const inputIndex = e.target.closest('div').dataset.index;
    this.numbers[inputIndex].number = e.target.valueAsNumber;
  };

  const validateWinningNumber = () => {
    const numberSet = new Set([
      ...this.numbers.map(number => number.number),
      bonusNumber.valueAsNumber,
    ]);

    console.log(numberSet);

    if (numberSet.size < 7) {
      window.alert(MESSAGE.NUMBER_CANNOT_BE_DUPLICATED);
      return false;
    }

    if (![...numberSet].every(number => number)) {
      window.alert(MESSAGE.NUMBER_REQUIRED);
      return false;
    }

    if (![...numberSet].every(number => number < 46 && number > 0)) {
      window.alert(MESSAGE.NUMBER_NOT_IN_RANGE);
      return false;
    }

    this.winningNumbers = this.numbers.map(number => number.number);
    this.bonus = bonusNumber.valueAsNumber;
    return true;
  };

  const calcResult = () => {
    const rank = [0, 0, 0, 0, 0];
    app.lotto.map(lotto => {
      const resultWithoutBonus = new Set([
        ...lotto.numbers,
        ...this.winningNumbers,
      ]);
      const resultWithBonus = resultWithoutBonus.add(this.bonus);
      const hitCount = 13 - resultWithBonus.size;
      if (resultWithoutBonus.size === 6) {
        rank[rank.length - 1] += 1;
      }
      if (hitCount >= 3) {
        rank[hitCount - 3] += 1;
      }
    });
    this.result = rank;
  };

  const displayResult = () => {
    let total = 0;
    this.result.map((rank, index) => {
      if (rank > 0) {
        const target = $({ selector: `.place-${this.result.length - index}` });
        target.innerText = `${rank}개`;
        total += WINNINGMONEY[index] * rank;
      }
    });
    const pay = app.lottoCount * 1000;
    const profit = total - pay;
    const profitResult = Math.floor((profit / pay) * 100);
    profitRate.innerText = profitResult;
  };

  const showResult = () => {
    if (validateWinningNumber()) {
      calcResult();
      displayResult();
      onModalShow();
    }
  };

  const onModalShow = () => {
    modal.classList.add('open');
  };
  const onModalClose = () => {
    modal.classList.remove('open');
  };

  const restartGame = () => {
    this.numbers = [];
    this.winningNumbers = [];
    this.bonus = 0;
    this.result = [];
    app.lottoCount = 0;
    app.lotto = [];

    bonusNumber.value = '';
    const priceInput = $({ target: app.container, selector: '.price-input' });
    const lottoArea = $({ target: app.container, selector: '.lotto-area' });
    lottoResultArea.hidden = true;
    lottoArea.hidden = true;
    priceInput.value = '';
    onModalClose();
  };

  addEvent({ el: showResultButton, type: 'click', callback: showResult });
  addEvent({ el: modalClose, type: 'click', callback: onModalClose });
  addEvent({
    el: winningNumberContainer,
    type: 'change',
    callback: addWinningNumber,
  });
  addEvent({
    el: restartButton,
    type: 'click',
    callback: restartGame,
  });
}
