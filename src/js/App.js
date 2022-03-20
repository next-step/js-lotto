import { INITIAL_STATE } from './common/constants.js';
import PurchaseDisplay from './components/displays/PurchaseDisplay.js';
import WinningNumberInput from './components/inputs/WinningNumberInput.js';
import PriceInput from './components/inputs/PriceInput.js';
import ConfirmButton from './components/Buttons/ConfirmButton.js';
import Operator from './components/Operator.js'

class App {
  constructor({$target}) {
    this.$target = $target;
    this.$purchaseDisplay = null;
    this.$winningNumberInput = null;
    this.$priceInput = null;
    this.$confirmBtn = null;
    this.state = null;
    this.setState({...INITIAL_STATE})
  }

  setState(next) {
    this.state = next;
    console.log(next, this.state);
    this.render();
  }

  handlePurchaseInputChange(newInputVal) {
    console.log("newInputVal", newInputVal)
    this.setState({...this.state, priceInputVal: newInputVal});
  }

  handleConfirmBtnClick(inputVal) {
    // todo: 입력된 숫자가 1000으로 나뉘어지는 숫자인지 validate
    this.operator.validatePrice(inputVal);
    // todo: 랜덤한 숫자를 만들어내기 (2자리, 45이하)
    // todo: 구매 결과 디스플레이 하기
  }

  render() {
    this.operator = new Operator({state: this.state, setState: this.setState.bind(this)});
    this.$purchaseDisplay = new PurchaseDisplay({isConfirmBtnClicked: this.state.isConfirmBtnClicked});
    this.$winningNumberInput = new WinningNumberInput({isConfirmBtnClicked: this.state.isConfirmBtnClicked});
    this.$priceInput = new PriceInput({priceInputVal: this.state.priceInputVal, onChange: this.handlePurchaseInputChange.bind(this) })
    this.$confirmBtn = new ConfirmButton({inputPrice: this.state.priceInputVal, onClick: this.handleConfirmBtnClick.bind(this)})
  }
}

new App({$target: document.body.querySelector('#app')})