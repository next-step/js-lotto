import { winningForm } from '../constants.js';
import { $profit, $tbody } from '../dom.js';

export class LottoResultComponent {
  constructor(lottoResultModel) {
    this.render(lottoResultModel);
  }

  render(lottoResultModel) {
    $tbody.replaceChildren();

    const result = Object.keys(winningForm)
      .map(
        (place) => `
          <tr class="text-center">
            <td class="p-3">${winningForm[place].number}</td>
            <td class="p-3">${winningForm[place].winnings}</td>
            <td class="p-3">${lottoResultModel.winningResult[place]}개</td>
          </tr>`
      )
      .join('');

    $tbody.insertAdjacentHTML('afterbegin', result);
    $profit.textContent = lottoResultModel.profitRate;
  }
}
