import { ELEMENT } from '../../constants/elements.js';
import WinningNumberInput from './input/WinningNumberInput.js';
import LottoTickets from './LottoTickets.js';
class ResultForm {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.$resultWrapper = $target.querySelector(ELEMENT.RESULT_WRAPPER);
    this.$checkWrapper = $target.querySelector(ELEMENT.CHECK_WRAPPER);
    this.$numberToggleButton = $target.querySelector(ELEMENT.NUMBER_TOGGLE_BUTTON);
    this.$resultText = $target.querySelector(ELEMENT.RESULT_TEXT);
    this.$lottoImageWrapper = $target.querySelector(ELEMENT.LOTTO_IMAGE_WRAPPER);

    this.render();
  }

  render() {
    const { isVisibleResult, lottoPurchaseNumber, lottoNumbers } = this.props.state;
    if (!isVisibleResult) {
      this.$resultWrapper.style.display = 'none';
    } else {
      this.$resultText.innerText = `총 ${lottoPurchaseNumber}개를 구매하였습니다.`;

      this.$lottoImageWrapper.innerHTML = `
        ${lottoNumbers
          .map((lottoNumber) => {
            return `
              <li class="lotto-list">
                <span class="mx-1 text-4xl lotto-image">🎟️</span>
                <span class="lotto-number">
                  ${lottoNumber.join(' ')}
                </span>
              </li>
          `;
          })
          .join('')}
      `;
      if (this.$resultWrapper.style.display !== 'block') {
        this.$resultWrapper.style.display = 'block';
      }
    }

    if (!this.props.state.isVisibleResult) {
      this.$checkWrapper.style.display = 'none';
    } else {
      this.$checkWrapper.style.display !== 'block' && (this.$checkWrapper.style.display = 'block');
    }

    new LottoTickets({
      $target: this.$target,
      props: {
        state: this.props.state,
      },
    });

    new WinningNumberInput({
      $target: this.$target,
      props: {
        state: this.props.state,
      },
    });
  }
}

export default ResultForm;
