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

  const handleSubmitPurchase = (purchasedPrice) => {
    this.setState({
      ...this.state,
      lottos: autoGenerateLotto(purchasedPrice),
      purchasedPrice,
      isModalHidden: true,
    });
  };

  const handleSubmitResult = (winningNumber) => {
    this.setState({
      ...this.state,
      isModalHidden: false,
      numberOfWinner: calculateWinner(this.state.lottos, winningNumber),
    });
  };

  const handleCloseModal = () => {
    this.setState({ ...this.state, isModalHidden: true });
  };

  const handleRetry = () => {
    this.setState({ ...initialState });
  };

  // NOTE: Construction
  const init = () => {
    const { lottos, numberOfWinner, purchasedPrice, isModalHidden } = { ...this.state };
    this.children = [
      new PriceForm($('#price-form'), {
        props: { purchasedPrice },
        onSubmit: handleSubmitPurchase,
      }),
      new Lottos($('#lottos'), { props: { lottos } }),
      new WinningNumberForm($('#winning-number'), {
        props: { lottos },
        onSubmit: handleSubmitResult,
      }),
      new Modal($('#modal'), {
        props: {
          numberOfWinner,
          purchasedPrice,
          isModalHidden,
        },
        onRetry: handleRetry,
        onClose: handleCloseModal,
      }),
    ];
  };
  init();
}

export default App;
