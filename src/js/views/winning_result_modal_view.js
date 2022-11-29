import { PROFIT } from '../../const.js';
import { $ } from '../../utils.js';
import View from './view.js';

class WinningResultModalView extends View {
  constructor($target) {
    super($target);
    this.$winningResultModal = $('.modal');
    this.$winningResultClose = $('.modal-close');
    this.$winningResult = $('#winning-result-tbody');
    this.$profit = $('#profit');
    this.$resetButton = $('#reset-btn');
    this.$winningLottoNumbersForm = $('#winning-lotto-numbers-form');
    this.$inputPriceForm = $('#input-price-form');
    this.$lottoSwitch = $('#lotto-switch');
    this.$purchasedLottoList = $('#purchased-lotto-list');
    this.$purchasedLottos = $('#purchased-lottos');
  }

  renderWinningResult({ result }) {
    this.$winningResult.innerHTML = Object.entries(result)
      .map(([key, value]) => {
        return `<tr class="text-center">
                  <td class="p-3">${PROFIT[key].COUNT}</td>
                  <td class="p-3">${PROFIT[key].PRICE}</td>
                  <td class="p-3">${value}개</td>
                </tr>`;
      })
      .join('');
  }

  renderProfit({ profit }) {
    this.$profit.innerText = profit;
  }

  render({ result, profit, lottos }) {
    this.renderWinningResult({ result });
    this.renderProfit({ profit });
  }
}

export default WinningResultModalView;
