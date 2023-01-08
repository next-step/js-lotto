import { ELEMENT } from '../../constants/elements.js';
import { TITLE_WITH_VALUE_MAP } from '../../constants/modal.js';
import { generateTtitleAndValueArray, getWinningCount, makeRateOfReturn } from '../../utils/index.js';
class ResultModal {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.$modal = $target.querySelector(ELEMENT.MODAL);
    this.$modalTableBody = $target.querySelector(ELEMENT.MODAL_RESULT_TABLE_BODY);
    this.$investmentReturnSpan = $target.querySelector(ELEMENT.INVESTMENT_RETURN);
    this.$restartButton = $target.querySelector(ELEMENT.RESTART_BUTTON);
    this.$modalCloseButton = $target.querySelector(ELEMENT.MODAL_CLOSE_BUTTON);

    this.render();
  }

  render() {
    const { isVisibleModal, lottoNumbers, winningNumbers, bonusNumber, moneyAmount } = this.props.state;

    if (isVisibleModal) {
      const { countedLottoNumbersMap, totalAdvantage } = getWinningCount({
        lottoNumbers,
        winningInput: winningNumbers.map((el) => Number(el)),
        bonusNumber,
      });

      const profit = makeRateOfReturn(moneyAmount, totalAdvantage);

      this.$modalTableBody.innerHTML = `
            ${generateTtitleAndValueArray(TITLE_WITH_VALUE_MAP)
              .map(({ title, value }) => {
                return `
              <tr class="text-center" data-id=${title}>
                <td class="p-3">${title}</td>
                <td class="p-3">${value.toLocaleString()}</td>
                <td class="p-3">${countedLottoNumbersMap.has(title) ? countedLottoNumbersMap.get(title) : 0}개</td>
              </tr>
              `;
              })
              .join('')}
          `;

      this.$investmentReturnSpan.innerText = `
        당신의 총 수익률은 ${profit}%입니다.
      `;
      this.$modal.classList.add('open');
    }

    if (!isVisibleModal) {
      this.$modal.classList.remove('open');
    }
  }
}

export default ResultModal;
