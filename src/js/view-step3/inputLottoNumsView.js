import { $ } from '../utils/dom';

export class InputLottoNumsView {
  #inputLottoNums;
  #showResultBtn;
  #inputs;
  #inputValues = [];
  #first;
  #second;
  #third;
  #fourth;
  #fifth;
  #rateOfReturn;

  constructor() {
    this.#inputLottoNums = $('.input-lotto-nums');
    this.#showResultBtn = $('.show-result-btn');
    this.#inputs = this.#inputLottoNums.querySelectorAll('input');
    this.#first = $('.first');
    this.#second = $('.second');
    this.#third = $('.third');
    this.#fourth = $('.fourth');
    this.#fifth = $('.fifth');
    this.#rateOfReturn = $('.rate-of-return');

    this.#inputLottoNums.style.display = 'none';
  }

  getWinningAndBonusNumbers() {
    this.#inputs.forEach((input) => this.#inputValues.push(input.value));
    return {
      winningNumbers: this.#inputValues.slice(0, 6),
      bonusNumber: this.#inputValues[this.#inputValues.length - 1],
    };
  }

  setResultHtml(lottoResult, rateOfReturn) {
    this.#first.innerHTML = `${lottoResult.FIRST.length}개`;
    this.#second.innerHTML = `${lottoResult.SECOND.length}개`;
    this.#third.innerHTML = `${lottoResult.THIRD.length}개`;
    this.#fourth.innerHTML = `${lottoResult.FOURTH.length}개`;
    this.#fifth.innerHTML = `${lottoResult.FIFTH.length}개`;

    this.#rateOfReturn.innerHTML = `당신의 총 수익률은 ${rateOfReturn}%입니다.`;
  }

  get showResultBtn() {
    return this.#showResultBtn;
  }

  showInputLottoNums() {
    this.#inputLottoNums.style.display = 'block';
  }

  initialize() {
    this.#first.innerHTML = '';
    this.#second.innerHTML = '';
    this.#third.innerHTML = '';
    this.#fourth.innerHTML = '';
    this.#fifth.innerHTML = '';
    this.#rateOfReturn.innerHTML = '';
    this.#inputs.forEach((input) => (input.value = ''));
  }
}
