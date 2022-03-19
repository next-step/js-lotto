import { INITIAL_STATE } from './common/constants.js';
import PurchaseDisplay from './components/display/PurchaseDisplay.js';
import WinningNumberInput from './components/input/WinningNumberInput.js';

class App {
  constructor({$target}) {
    this.$target = $target;
    this.$purchaseDisplay = null;
    this.$winningNumberInput = null;
    this.state = null;
    this.setState({...INITIAL_STATE})
  }

  setState(next) {
    this.state = next;
    this.render();
  }

  render() {
    this.$purchaseDisplay = new PurchaseDisplay({isEnterBtnClicked: this.state.isEnterBtnClicked});
    this.$winningNumberInput = new WinningNumberInput({isEnterBtnClicked: this.state.isEnterBtnClicked});
  }
}

new App({$target: document.body.querySelector('#app')})