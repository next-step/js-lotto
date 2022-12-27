import { CLICK_EVENT_MAP, ELEMENT_DATA_ID, ELEMENT_DATA_ID_FORM } from '../../constants.js';
import WinningNumberInput from './input/WinningNumberInput.js';
import LottoTickets from './LottoTickets.js';
class ResultForm {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.$resultWrapper = $target.querySelector('#purchased-result');
    this.$checkWrapper = $target.querySelector('#check-result');
    this.render();
    this.addEventListener();
  }

  render() {
    if (!this.props.state.isVisibleResult) {
      this.$resultWrapper.style.display = 'none';
    } else {
      this.$resultWrapper.querySelector(
        ELEMENT_DATA_ID_FORM.RESULT_TEXT
      ).innerText = `총 ${this.props.state.lottoPurchaseNumber}개를 구매하였습니다.`;

      this.$resultWrapper.querySelector(ELEMENT_DATA_ID_FORM.LOTTO_IMAGE_WRAPPER).innerHTML = `
        ${this.props.state.lottoNumbers
          .map((lottoNumber) => {
            return `
              <li class="lotto-list">
                <span class="mx-1 text-4xl" data-id="lotto-image">🎟️</span>
                <span class="lotto-number" data-id="lotto-number">
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

  addEventListener() {
    CLICK_EVENT_MAP.set(ELEMENT_DATA_ID.NUMBER_TOGGLE_BUTTON, this.props.onToggle);
  }
}

export default ResultForm;
