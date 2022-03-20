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
    const $purchaseInput = document.querySelector('#purchace-amount-input');
    this.$purchaseInput = $purchaseInput.cloneNode(true);
    this.$purchaseInput.value = this.inputValue;
    $purchaseInput.after(this.$purchaseInput);
    $purchaseInput.remove();

    this.addEvent(this.$purchaseInput, 'change', (e) => this.handleChange(e.target.value))
  }

  addEvent($el, event, callbackFn) {
    $el.addEventListener(event, callbackFn);
  }
}