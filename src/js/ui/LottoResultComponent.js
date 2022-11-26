import { winningForm } from '../constants.js';
import { $profit, $tbody } from '../dom.js';

export class LottoResultComponent {
  lottoResultModel;

  constructor(lottoResultModel) {
    this.lottoResultModel = lottoResultModel;
    this.render();
  }

  render() {
    $tbody.replaceChildren();

    const result = Object.keys(winningForm)
      .map(
        (place) => `
          <tr class="text-center">
            <td class="p-3">${winningForm[place].number}</td>
            <td class="p-3">${winningForm[place].winnings}</td>
            <td class="p-3">${this.lottoResultModel.winningResult[place]}개</td>
          </tr>`
      )
      .join('');

    $tbody.insertAdjacentHTML('afterbegin', result);
    $profit.textContent = this.lottoResultModel.profitRate;
  }
}
