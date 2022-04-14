import { CLASS } from '../../const/className.js';
import { $Curry, insertAdjacentHTML } from '../../dom/index.js';
import View from '../View.js';

const getStatisticsRowLabel = key => (key === 'bonus' ? `5개 + 보너스볼` : `${key}개`);

const getStatisticsRowTemplate = ([key, info]) => `
    <tr class="text-center">
      <td class="p-3">${getStatisticsRowLabel(key)}</td>
      <td class="p-3">${info.prize.toLocaleString()}</td>
      <td class="p-3">${info.count}개</td>
    </tr>
  `;

const swapBonusInfo = results => {
  const last = results.length - 1;
  const bonusIdx = last - 1;

  [results[last], results[bonusIdx]] = [results[bonusIdx], results[last]];

  return results;
};
export default class WinningResultModal extends View {
  #$modalClose;
  #$statisticsRate;
  #$retry;
  constructor($el) {
    super($el);
    const $ = $Curry($el);

    this.#$modalClose = $(CLASS.CLOSE_MODAL);
    this.#$statisticsRate = $(CLASS.WINNING_STATISTICS_RATE);
    this.#$retry = $(CLASS.RETRY);
  }

  init() {
    this.bindEvent();
    return this;
  }

  render({ winningInfo = [], rate = 0 }) {
    this.#printStatisticsTable(swapBonusInfo(winningInfo));
    this.#printRate(rate);
    this.#open();
  }

  bindEvent() {
    this.#$modalClose.addEventListener('click', this.#close.bind(this));
    this.#$retry.addEventListener('click', () => this.#retry());
  }

  #printStatisticsTable(results) {
    const $statisticsInfo = $Curry()(CLASS.WINNING_STATISTICS_INFO);
    const $copied = $statisticsInfo.cloneNode();

    const template = results.map(getStatisticsRowTemplate).join('');
    insertAdjacentHTML($copied, template);

    $statisticsInfo.parentNode.replaceChild($copied, $statisticsInfo);
  }

  #printRate(rate) {
    this.#$statisticsRate.textContent = `당신의 총 수익률은 ${rate}%입니다.`;
  }

  #retry() {
    this.emit('@retry');
    this.#close();
  }

  #open() {
    this.$el.classList.add('open');
  }

  #close() {
    this.$el.classList.remove('open');
  }
}
