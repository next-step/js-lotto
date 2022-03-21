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
    this.$confirmBtn = new ConfirmButton({onClick: this.handleConfirmBtnClick.bind(this)})
    this.state = null;
    this.setState({...INITIAL_STATE})
  }

  setState(next) {
    this.state = next;
    console.log(next, this.state);
    this.render();
  }

  handlePurchaseInputChange(newInputVal) {
    this.setState({...this.state, priceInputVal: newInputVal});
  }

  handleConfirmBtnClick() {
    this.operator.validatePrice(this.state.priceInputVal);
    this.operator.makeNewNumberSets(this.state.purchasedVal);
  }
  
  handleShowNumbersBtnToggle() {
    console.log(this.state.randomNumberSet);
    // todo: 티켓당 6개씩 만들어진 랜덤한 숫자가 토글되어야 한다.
    console.log('toggle 버튼 클릭됨');
  }

  render() {
    this.operator = new Operator({state: this.state, setState: this.setState.bind(this)});
    this.$purchaseDisplay = new PurchaseDisplay({isConfirmBtnClicked: this.state.isConfirmBtnClicked, purchasedVal: this.state.purchasedVal, onToggle: this.handleShowNumbersBtnToggle.bind(this)});
    this.$winningNumberInput = new WinningNumberInput({isConfirmBtnClicked: this.state.isConfirmBtnClicked});
    this.$priceInput = new PriceInput({priceInputVal: this.state.priceInputVal, onChange: this.handlePurchaseInputChange.bind(this) })
    
  }
}

new App({$target: document.body.querySelector('#app')})