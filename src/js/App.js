import { INITIAL_STATE } from './common/constants.js';
import PurchaseDisplay from './components/display/PurchaseDisplay.js';
import WinningNumberInput from './components/input/WinningNumberInput.js';
import PriceInput from './components/input/PriceInput.js';

class App {
  constructor({$target}) {
    this.$target = $target;
    this.$purchaseDisplay = null;
    this.$winningNumberInput = null;
    this.$priceInput = null;
    this.state = null;
    this.setState({...INITIAL_STATE})
  }

  setState(next) {
    this.state = next;
    this.render();
  }

  handlePurchaseInputChange(newInputVal) {
    this.setState({...this.state, priceInputVal: newInputVal});
    this.render();
  }

  render() {
    this.$purchaseDisplay = new PurchaseDisplay({isEnterBtnClicked: this.state.isEnterBtnClicked});
    this.$winningNumberInput = new WinningNumberInput({isEnterBtnClicked: this.state.isEnterBtnClicked});
    this.$priceInput = new PriceInput({priceInputVal: this.state.priceInputVal, onChange: this.handlePurchaseInputChange.bind(this) })
  }
}

new App({$target: document.body.querySelector('#app')})