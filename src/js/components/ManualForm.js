import { CLICK_EVENT_MAP, ELEMENT_DATA_ID } from '../../constants/elements.js';

class ManualForm {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;

    this.$manualWrapper = $target.querySelector('#manual-form');
    this.$countManual = $target.querySelector('.count-manual-auto');
    this.$moveAutoNumberButton = $target.querySelector('.move-auto-number-button');
    this.$submitManualButton = $target.querySelector('.submit-manual-number-button');
    this.$doneManualButton = $target.querySelector('.done-manual-button');
    this.$manualNumbersInput = Array.from($target.getElementsByClassName('manual-number'));

    this.render();
    this.addEventListener();
  }

  render() {
    const { isVisibleAutoInput, lottoPurchaseNumber, manualPurchaseNumber, typedManualNumber } = this.props.state;
    const autoPurchaseCount = lottoPurchaseNumber - manualPurchaseNumber;
    const isVisibleDoneManualButton = autoPurchaseCount === 0;

    if (!isVisibleAutoInput) {
      this.$manualWrapper.style.display = 'none';
    } else {
      this.$manualWrapper.style.display = 'flex';

      this.$countManual.innerHTML = `
      자동: ${autoPurchaseCount} 개 구매 가능합니다 \n
      수동: ${manualPurchaseNumber} 개 구매하셨습니다.`;
    }

    this.$manualNumbersInput.forEach((element, index) => {
      element.value = typedManualNumber[index];
    });

    this.$submitManualButton.style.display = 'block';
    this.$moveAutoNumberButton.style.display = 'block';
    this.$doneManualButton.style.display = 'none';

    if (isVisibleDoneManualButton) {
      this.$submitManualButton.style.display = 'none';
      this.$moveAutoNumberButton.style.display = 'none';
      this.$doneManualButton.style.display = 'block';
    }
  }

  addEventListener() {
    CLICK_EVENT_MAP.set(ELEMENT_DATA_ID.MANUAL_SUBMIT_BUTTON, this.props.onSubmitManualNumber);

    this.$moveAutoNumberButton.addEventListener('click', (event) => {
      this.props.onConfirmManual(event);
    });

    this.$doneManualButton.addEventListener('click', (event) => {
      this.props.onConfirmManual(event);
    });
  }
}

export default ManualForm;
