import { $ } from './utils/helpers.js';
import Component from './components/Component.js';
import PriceForm from './components/PriceForm.js';
import Lottos from './components/Lottos.js';
import WinningNumberForm from './components/WinningNumberForm.js';
import Modal from './components/Modal.js';
import calculateWinner from './utils/getWinner.js';
import autoGenerateLotto from './utils/autoGenerateLotto.js';

const initialState = {
  purchasedPrice: 0,
  lottos: [],
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
App.prototype.constructor = Component;

function App($root) {
  this.$root = $root;
  this.state = { ...initialState };

  this.handleSubmitPurchase = (purchasedPrice) => {
    this.setState({
      ...this.state,
      lottos: autoGenerateLotto(purchasedPrice),
      purchasedPrice,
      isModalHidden: true,
    });
  };

  this.handleSubmitResult = (winningNumber) => {
    this.setState({
      ...this.state,
      isModalHidden: false,
      numberOfWinner: calculateWinner(this.state.lottos, winningNumber),
    });
  };

  this.handleCloseModal = () => {
    this.setState({ ...this.state, isModalHidden: true });
  };

  this.handleRetry = () => {
    this.setState({ ...initialState });
  };

  // NOTE: Construction
  const init = () => {
    const state = { ...this.state };
    this.children = [
      new PriceForm($('#price-form'), {
        props: { purchasedPrice: state.purchasedPrice },
        onSubmit: this.handleSubmitPurchase,
      }),
      new Lottos($('#lottos'), { props: { lottos: state.lottos } }),
      new WinningNumberForm($('#winning-number'), {
        props: { lottos: state.lottos },
        onSubmit: this.handleSubmitResult,
      }),
      new Modal($('#modal'), {
        props: {
          numberOfWinner: state.numberOfWinner,
          purchasedPrice: state.purchasedPrice,
          isModalHidden: state.isModalHidden,
        },
        onRetry: this.handleRetry,
        onClose: this.handleCloseModal,
      }),
    ];
  };
  init();
}

export default App;
