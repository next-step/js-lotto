import { $ } from './utils/helpers.js';
import PriceForm from './components/PriceForm.js';
import Lottos from './components/Lottos.js';
import WinningNumberForm from './components/WinningNumberForm.js';
import Modal from './components/Modal.js';
import getRandomNumber from './utils/getRandomInt.js';


const initialState = {
  // NOTE: lottos 배열 안에는 lotto의 문자열 값이 들어간다.
  lottos: [],
  purchasedPrice: 0,
  winningNumber: [],
  numberOfWinner: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  isLottosExist: false,
  isModalHidden: true,
}

function App($root) {
  this.$root = $root;

  this.generateLottoNumber = () => [...Array(7).keys()].map(() => getRandomNumber(0, 46));

  // TODO: setState가 호출되는 경우는 무엇무엇인가? 구입금액 눌렀을 때,
  // TODO: 다시시작하기 눌렀을 때?
  this.setState = (nextState) => {
    this.state = nextState;
    if (!this.components) return;
    Object.values(this.components).map(component => {
      component.updateProps && component.updateProps(this.state);
    })
    this.render();
  }

  this.handleSubmitPurchase = (purchasedPrice) => {
    // TODO: reset 하고 다시시작하게 만들기
    const lottos = [...Array(purchasedPrice / 1000).keys()].map(() => this.generateLottoNumber());
    this.setState({...this.state, lottos, purchasedPrice, isLottosExist: true });
  }

  this.calculateWinner = (winningNumber) => {
    console.log(winningNumber)
    const normalOfWinning = winningNumber.slice(0, 6);
    const bonusOfWinning = winningNumber[6];
    console.log(normalOfWinning)
    const numberOfWinner = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    const lottos = this.state.lottos;
    lottos.map((lotto) => {
      const normal = lotto.slice(0,6);
      const bonus = lotto[6];
      let count = 0;
      normal.map((val) => {
        console.log(normalOfWinning)
        if (normalOfWinning.indexOf(val) !== -1) count += 1;
      })
      console.log(bonus)
      console.log(bonusOfWinning)
      if (count === 3) numberOfWinner[1] += 1;
      else if (count === 4) numberOfWinner[2] += 1;
      else if (count === 5) numberOfWinner[3] += 1;
      else if (count === 5 && bonus === bonusOfWinning) numberOfWinner[4] += 1;
      else if (count === 6) numberOfWinner[5] += 1;
    })
    return numberOfWinner;  
  }

  // NOTE: Get Number Of Winner
  this.handleSubmitResult = (winningNumber) => {
    this.setState({...this.state, numberOfWinner: this.calculateWinner(winningNumber) });
    console.log(this.state.numberOfWinner);
  }

  this.mountComponents = () => {
    this.components = {
      priceForm: new PriceForm($('#price-form'), this.handleSubmitPurchase),
      lottos: new Lottos($('#lottos'), { lottos: this.state.lottos, isLottosExist: this.state.isLottosExist }),
      winningNumberForm:
        new WinningNumberForm($('#winning-number'),
        { isLottosExist: this.state.isLottosExist },
        this.handleSubmitResult
      ),
      modal: new Modal($('#modal')),
    }
  }

  // TODO: state가 변화될 때 마다 render가 호출된다.
  this.render = () => {
  }

  // NOTE: Construction
  this.setState(initialState);
  this.mountComponents();
  this.render();
}

export default App;