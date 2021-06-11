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
App.prototype.constructor = Component;

function App($root) {
  this.$root = $root;
  this.state = { ...initialState };

  this.handleSubmitPurchase = (purchasedPrice) => {
    const lottos = [...Array(purchasedPrice / 1000).keys()].map(() =>
      getLottoNum()
    );
    this.setState({ ...this.state, lottos, purchasedPrice });
  };

  this.handleSubmitResult = (winningNumber) => {
    const numberOfWinner = calculateWinner(this.state.lottos, winningNumber);
    this.state.numberOfWinner = numberOfWinner;
    this.setState({ ...this.state, isModalHidden: false, numberOfWinner });
    // TODO: 여기서 isModalHidden도 this.state에 변화된 상태를 넣어주게 하자.
    // TODO: 여기서 app의 setState를 사용하지 않고 아래처럼 하는 이유는
    // TODO: 아래의 경우는 모달만 띄어지면 되는데 setState를 하게 되면 모든 컴포넌트가 렌더링 되기 때문이다.
    // TODO: 따라서 지금 해야할 건 setState를 해도 자기가 이미 갖고 있던 props와 비교해서 만약 정보가 같다면
    // TODO: 렌더링을 할 필요가 없게 만들어야한다.
  };

  this.handleRetry = () => {
    this.setState({ ...initialState });
    this.children.PriceForm.init();
  };

  // NOTE: Construction

  const init = () => {
    const state = { ...this.state };
    this.children = {
      PriceForm: new PriceForm($('#price-form'), {
        onSubmit: this.handleSubmitPurchase,
      }),
      // NOTE: lottos, isShowNumber(직접 수정함)
      Lottos: new Lottos($('#lottos'), { props: { lottos: state.lottos } }),
      // NOTE: lottos,
      WinningNumberForm: new WinningNumberForm($('#winning-number'), {
        props: { lottos: state.lottos },
        onSubmit: this.handleSubmitResult,
      }),
      // NOTE: numberOfWinner, purchasedPrice, isModalHidden
      Modal: new Modal($('#modal'), {
        props: {
          numberOfWinner: state.numberOfWinner,
          purchasedPrice: state.purchasedPrice,
          isModalHidden: state.isModalHidden,
        },
        onRetry: this.handleRetry,
      }),
    };
  };
  init();
}

export default App;
