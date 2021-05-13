import { lottoInputValidator } from "./utils/validators.js";
import { SELECTORS, ERROR_MESSAGES } from "./utils/constants.js";
import { $ } from "./utils/dom.js";
import autoGenerator from "./utils/autoGenerator.js";
import BuyLotto from "./components/BuyLotto.js";
import LottoList from "./components/LottoList.js";

function App() {
  this.state = {
    lottoCount: 0,
    lottoList: [],
    isVisible: false,
    isModalOpen: false,
  };

  this.$lottoListSection = $(SELECTORS.LOTTO_SECTION);
  this.$lottoConfirm = $(SELECTORS.LOTTO_CONFIRM);

  this.init = () => {
    this.BuyLotto = new BuyLotto({ onClickBuy: this.onClickBuy });
    this.LottoList = new LottoList({
      $target: this.$lottoListSection,
      initialState: this.state,
    });
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
    this.$lottoListSection.style = "display:block";
    this.$lottoConfirm.style = "display:block";
  };

  this.setState = (nextState) => {
    this.LottoList.setState(nextState);
  };
  this.init();
}

export default App;
