import { ELEMENT } from '../../constants/elements.js';

class ManualForm {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;

    this.$countManual = $target.querySelector(ELEMENT.COUNT_MANUAL);
    this.$manualWrapper = $target.querySelector(ELEMENT.MANUAL_WRAPPER);
    this.$manualNumbersInput = Array.from($target.querySelectorAll(ELEMENT.MANUAL_NUMBERS_INPUT));
    this.$submitManualButton = $target.querySelector(ELEMENT.SUBMIT_MANUAL_BUTTON);
    this.$doneManualButton = $target.querySelector(ELEMENT.DONE_MANUAL_BUTTON);
    this.$manualSubmitButton = $target.querySelector(ELEMENT.MANUAL_SUBMIT_BUTTON);
    this.$moveAutoNumberButton = $target.querySelector(ELEMENT.MOVE_AUTO_NUMBER_BUTTON);

    this.render();
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
}

export default ManualForm;
