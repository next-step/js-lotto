import { CLICK_EVENT_MAP, ELEMENT_DATA_ID } from '../../constants.js';

class ManualForm {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;

    this.$manualWrapper = $target.querySelector('#manual-form');
    this.$countManual = $target.querySelector('.count-manual-auto');
    this.$manualNumbersInput = Array.from(
      $target.getElementsByClassName('manual-number')
    );
    this.$doneManualButton = $target.querySelector(
      '.done-manual-number-button'
    );

    this.render();
    this.addEventListener();
  }

  render() {
    if (!this.props.state.isVisibleAutoInput) {
      this.$manualWrapper.style.display = 'none';
    } else {
      this.$manualWrapper.style.display = 'flex';

      this.$countManual.innerHTML = `
      자동: ${this.props.state.lottoPurchaseNumber} 개 구매 가능합니다 \n
      수동: ${this.props.state.manualPurchaseNumber} 개 구매하셨습니다.`;
    }

    this.$manualNumbersInput.forEach((element, index) => {
      element.value = this.props.state.typedManualNumber[index];
    });
  }

  addEventListener() {
    CLICK_EVENT_MAP.set(
      ELEMENT_DATA_ID.MANUAL_SUBMIT_BUTTON,
      this.props.onSubmitManualNumber
    );

    this.$doneManualButton.addEventListener('click', (event) => {
      this.props.onConfirmManual(event);
    });
  }
}

export default ManualForm;
