import { $ } from './utils/helpers.js';
import Component from './components/Component.js';
import PriceForm from './components/PriceForm.js';
import Lottos from './components/Lottos.js';
import WinningNumberForm from './components/WinningNumberForm.js';
import Modal from './components/Modal.js';
import getLottoNum from './utils/getLottoNum.js';
import calculateWinner from './utils/getWinner.js';

const initialState = {
  purchasedPrice: 0,
  lottos: [],
  isShowNumber: false,
  winningNumber: [],
  isModalHidden: true,
  numberOfWinner: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
};

App.prototype = new Component();
App.prototype.constructor = Component

function App($root) {
  this.$root = $root;
  this.state = { ...initialState };

  this.handleSubmitPurchase = (purchasedPrice) => {
    const lottos = [...Array(purchasedPrice / 1000).keys()].map(() => getLottoNum());
    this.setState({ ...this.state, lottos, purchasedPrice });
  };

  this.handleSubmitResult = (winningNumber) => {
    const numberOfWinner = calculateWinner(this.state.lottos, winningNumber);
    this.state.numberOfWinner = numberOfWinner;
    this.children.Modal.setState({ ...this.state, isModalHidden: false });
  };

  this.handleRetry = () => {
    this.setState({ ...initialState })
    this.children.PriceForm.init();
  }

  // NOTE: Construction
  this.children = {
    PriceForm: new PriceForm($('#price-form'), { onSubmit: this.handleSubmitPurchase }),
    // NOTE: lottos, isShowNumber(직접 수정함)
    Lottos: new Lottos($('#lottos'), {  state: this.state }),
    // NOTE: lottos, 
    WinningNumberForm: new WinningNumberForm($('#winning-number'), { state: this.state, onSubmit: this.handleSubmitResult}),
    // NOTE: numberOfWinner, purchasedPrice, isModalHidden
    Modal: new Modal($('#modal'), { state: this.state, onRetry: this.handleRetry })
  }
}

export default App;
 