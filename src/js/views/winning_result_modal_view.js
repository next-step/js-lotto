import { $ } from '../../utils.js';
import View from './view.js';

class WinningResultModalView extends View {
  constructor() {
    this.$winningResultModal = $('.modal');
    this.$winningResultClose = $('.modal-close');
    this.$winningResult = $('#winning-result-tbody');
    this.$winRate = $('#win-rate');
  }

  renderWinningResult({ result }) {
    this.$winningResult.innerHTML = Object.entries(result).map(
      ([key, value]) => {
        return `<tr class="text-center">
                  <td class="p-3">${key}개</td>
                  <td class="p-3">5,000</td>
                  <td class="p-3">${value}개</td>
                </tr>`;
      }
    );
  }

  renderWinRate({ winRate }) {
    this.$winRate.innerText = `${winRate}%`;
  }

  render({ result, winRate }) {
    this.renderWinningResult({ result });
    this.renderWinRate({ winRate });
  }
}

export default WinningResultModalView;
