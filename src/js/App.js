import { lottoInputValidator } from "./utils/validators.js";
import { SELECTORS, ERROR_MESSAGES } from "./utils/constants.js";
import { $ } from "./utils/dom.js";
import autoGenerator from "./utils/autoGenerator.js";
import BuyLotto from "./components/BuyLotto.js";
import LottoList from "./components/LottoList.js";
import VisibleToggle from "./components/VisibleToggle.js";
import LottoResult from "./components/LottoResult.js";
import AnalyzeModal from "./components/AnalyzeModal.js";

function App() {
  this.state = {
    lottoCount: 0,
    lottoList: [],
    winningNumbers: [],
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
    this.VisibleToggle = new VisibleToggle({
      onVisibleToggle: this.onVisibleToggle,
    });
    this.LottoResult = new LottoResult({
      $target: this.$lottoConfirm,
      onSubmitResult: this.onSubmitResult,
    });
    this.AnalyzeModal = new AnalyzeModal({
      initialState: this.state,
      modalCloseHandler: this.modalCloseHandler,
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

  this.onVisibleToggle = () => {
    const isVisible = !this.state.isVisible;
    const nextState = {
      ...this.state,
      isVisible,
    };
    this.setState(nextState);
  };

  this.onSubmitResult = (winningNumbers) => {
    const nextState = {
      ...this.state,
      winningNumbers,
      isModalOpen: true,
    };
    this.setState(nextState);
  };

  this.modalCloseHandler = () => {
    const nextState = {
      ...this.state,
      isModalOpen: false,
    };
    this.setState(nextState);
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.LottoList.setState(nextState);
    this.AnalyzeModal.setState(nextState);
  };

  this.init();
}

export default App;
