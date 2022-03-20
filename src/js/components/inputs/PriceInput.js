export default class PriceInput {
  constructor({priceInputVal, onChange}) {
    this.inputValue = null;
    this.$purchaseInput = null;
    this.handleChange = onChange;
    this.setState(priceInputVal);
  }

  setState(nextInputVal) {
    this.inputValue = nextInputVal;
    this.render();
  }

  render() {
    this.$purchaseInput = document.querySelector('#purchace-amount-input');
    console.log(this.$purchaseInput, this.$purchaseInput.value)
    this.addEvent(this.$purchaseInput, 'change', () => this.handleChange(this.$purchaseInput.value))
  }

  addEvent($el, event, callbackFn) {
    $el.addEventListener(event, callbackFn);
  }
}