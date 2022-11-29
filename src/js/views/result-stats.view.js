import View from './view.js';
import NumberUtil from '../../utils/number.util.js';

export class ResultStatsView extends View {
  #lottoState;
  #winningNumberService;
  #result;
  #btnClose = document.querySelector('.btn-close');
  #btnReset = document.querySelector('.btn-reset');
  #resultTable = document.querySelector('.result-table tbody');
  #messageReturn = document.querySelector('.message-return');

  constructor(lottoState, winningNumberService) {
    super('.result-stats');
    this.#lottoState = lottoState;
    this.#winningNumberService = winningNumberService;
    this.#lottoState.reset.push(this.#close);

    this.#getMatchResult();
    this.#render();
    this.#setEvent();
    this.#open();
  }

  #setEvent() {
    this.events = [
      {
        target: this.#btnClose,
        event: 'click',
        handler: this.#close,
      },
      {
        target: this.#btnReset,
        event: 'click',
        handler: this.#reset,
      },
    ];

    super.setEventHandler();
  }

  #open() {
    this.element.classList.add('open');
  }

  #close = () => {
    this.element.classList.remove('open');
  };

  #reset = () => {
    this.#lottoState.list = null;
  };

  #getMatchResult() {
    this.#result = this.#winningNumberService.getMatchResult();
  }

  #render() {
    const list = this.#result.map(item => `<tr class="text-center">
                  <td class="p-3">${item.numberOfMatches}개 ${item.allowBonus ? '+ 보너스볼' : ''}</td>
                  <td class="p-3">${NumberUtil.formatting(item.prize)}</td>
                  <td class="p-3">${item.count}개</td>
                </tr>`);

    this.#resultTable.innerHTML = list.join('');
    this.#messageReturn.innerHTML = `당신의 총 수익률은 ${this.#winningNumberService.getRateOfReturn()}%입니다.`;
  }
}
