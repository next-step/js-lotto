import { CLICK_EVENT_MAP, ELEMENT_DATA_ID, ELEMENT_DATA_ID_FORM, TITLE_WITH_VALUE_MAP } from '../../constants.js';
import { generateTtitleAndValueArray, getWinningCount, makeRateOfReturn } from '../../utils/index.js';
class ResultModal {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.$modal = $target.querySelector('.modal');
    this.$modalTableBody = $target.querySelector(ELEMENT_DATA_ID_FORM.MODAL_RESULT_TABLE_BODY);
    this.$investmentReturnSpan = $target.querySelector(ELEMENT_DATA_ID_FORM.INVESTMENT_RETURN);
    this.render();
    this.addEventListener();
  }

  render() {
    const { isVisibleModal, lottoNumbers, winningNumbers, bonusNumber, moneyAmount } = this.props.state;

    if (isVisibleModal) {
      console.log({ lottoNumbers }, { winningNumbers });

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

  addEventListener() {
    CLICK_EVENT_MAP.set(ELEMENT_DATA_ID.RESTART_BUTTON, this.props.onRestart);
    CLICK_EVENT_MAP.set(ELEMENT_DATA_ID.MODAL_CLOSE_BUTTON, (event) => {
      event.preventDefault();
      this.props.onModalShow({ isVisibleModal: false });
    });
  }
}

export default ResultModal;
