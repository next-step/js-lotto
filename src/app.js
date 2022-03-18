import InputPriceForm from './components/inputPriceForm.js';
import MyLottoList from './components/myLottoList.js';
import InputLottoNumbersForm from './components/inputLottoNumbersForm.js';
import LottoMaker from './libs/lottoMaker.js';
import CONSTANTS from './common/constants.js';

export default function App() {
  this.state = {
    isPreviousPurchase: CONSTANTS.INITIAL.IS_PREVIOUS_PURCHASE_OFF,
    userInputPrice: CONSTANTS.INITIAL.USER_INPUT_PRICE,
    visiableLottoToggle: CONSTANTS.INITIAL.VISIABLE_LOTTO_TOGGLE_OFF,
    myLottos: CONSTANTS.INITIAL.MY_LOTTOS,
    lottoNumbers: {
      winningNumber: CONSTANTS.INITIAL.LOTTO_WINNING_NUMBER,
      bonusNumber: CONSTANTS.INITIAL.LOTTO_BONUS_NUMBER,
    },
  };

  this.lottoMaker = new LottoMaker();

  this.$inputPriceForm = new InputPriceForm({
    onSubmit: (price, coin) => {
      const newLottos = this.lottoMaker.run(coin);
      this.setState({
        ...this.state,
        isPreviousPurchase: CONSTANTS.COMMON.IS_PREVIOUS_PURCHASE_ON,
        userInputPrice: price,
        visiableLottoToggle: CONSTANTS.INITIAL.VISIABLE_LOTTO_TOGGLE_OFF,
        myLottos: newLottos,
      });
    },
  });

  this.$myLottoList = new MyLottoList({
    initState: {
      isPreviousPurchase: this.state.isPreviousPurchase,
      visiableLottoToggle: this.state.visiableLottoToggle,
      myLottos: this.state.myLottos,
    },
    onToggle: (toggle) => {
      this.setState({ ...this.state, visiableLottoToggle: toggle });
    },
  });

  this.$inputLottoNumbersForm = new InputLottoNumbersForm({
    initState: {
      isPreviousPurchase: this.state.isPreviousPurchase,
      lottoNumbers: this.state.lottoNumbers,
    },
  });

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { isPreviousPurchase, visiableLottoToggle, myLottos, lottoNumbers } = this.state;
    this.$myLottoList.setState({ isPreviousPurchase, visiableLottoToggle, myLottos });
    this.$inputLottoNumbersForm.setState({ isPreviousPurchase, lottoNumbers });
  };
}
