import { lottoInputValidator } from "./utils/validators.js";
import { ERROR_MESSAGES } from "./utils/constants.js";
import autoGenerator from "./utils/autoGenerator.js";
import BuyLotto from "./components/BuyLotto.js";

function App() {
  this.state = {
    lottoCount: 0,
    lottoList: [],
    isVisible: false,
    isModalOpen: false,
  };

  this.init = () => {
    this.BuyLotto = new BuyLotto({ onClickBuy: this.onClickBuy });
  };

  this.onClickBuy = (money) => {
    if (!lottoInputValidator(money)) {
      alert(ERROR_MESSAGES.INVALID_MONEY);
      return;
    }
    const lottoCount = money / 1000;
    const lottoList = [];
    for (let i = 0; i < lottoCount; i++) {
      lottoList.push(autoGenerator());
    }
    const nextState = {
      ...this.state,
      lottoCount,
      lottoList,
    };
    this.setState(nextState);
  };

  this.setState = (nextState) => {};
  this.init();
}

export default App;
