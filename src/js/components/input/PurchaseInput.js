import { ELEMENT_DATA_ID_FORM } from '../../../constants/elements.js';
class PurchaseInput {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.$numberInput = $target.querySelector(ELEMENT_DATA_ID_FORM.LOTTO_NUMBER_INPUT);
    this.props = props;
    this.render();
  }

  render() {
    const { moneyAmount } = this.props.state;
    const isBlank = moneyAmount === 0 || moneyAmount === null;

    if (isBlank) {
      this.$numberInput.value = null;
    }

    if (!isBlank) {
      this.$numberInput.value = moneyAmount;
    }
  }
}

export default PurchaseInput;
