import { generateLottoRandomNumbers } from "./Lotto/LottoGenerator.js";
import { getLottoProfit } from "./utils/random-utils.js";
import { lottoWinningNumberCounter } from "../js/Lotto/LottoWinningDataMaker.js";

import LottoInput from "./Components/LottoInput.js";
import LottoResult from "./Components/LottoResult.js";
import LottoWinForm from "./Components/LottoWinForm.js";
import { LOTTO, WINNING_AMOUNT, INITIAL_STATE } from "./constants.js";
export default class LottoGame {
  constructor() {
    this.$element = document.querySelector("#app");
    this.state = {
      inputAmount: 0,
      lottoCnt: 0,
      lottoNumberArr: [],
    };

    this.lottoInput = new LottoInput({
      $target: this.$element,
      onSubmit: (inputAmount) => {
        const [randomNumberArray, lottoCnt] = generateLottoRandomNumbers({
          moneyAmount: inputAmount,
          min: LOTTO.LOTTO_NUMBER_MIN,
          max: LOTTO.LOTTO_NUMBER_MAX,
        });

        this.setState({
          inputAmount,
          lottoCnt,
          lottoNumberArr: randomNumberArray,
        });
      },
    });

    this.lottoResult = new LottoResult({
      $target: this.$element,
      lottoCnt: 0,
      lottoNumberArr: [],
    });

    this.lottoWinForm = new LottoWinForm({
      $target: this.$element,
      lottoNumberArrays: this.state.lottoNumberArr,
      onSubmit: (winningNumbers, bonusNumber) => {
        const lottoWinNumberCountMap = lottoWinningNumberCounter({
          lottoNumberArrays: this.state.lottoNumberArr,
          lottoWinningsNumberArray: winningNumbers,
          lottoBonusNumber: bonusNumber,
        });

        const totalProfitAmount = Array.from(
          Object.entries(lottoWinNumberCountMap)
        ).reduce((prev, cur, i) => prev + WINNING_AMOUNT[cur[0]] * cur[1], 0);

        const lottoProfitRate = getLottoProfit(
          totalProfitAmount,
          this.state.inputAmount
        );

        this.lottoWinForm.setState({
          lottoWinNumberCountMap: lottoWinNumberCountMap,
          lottoProfitRate: lottoProfitRate,
          modalOpened: true,
        });
      },
      onClickRestartButton: () => {
        this.setState(INITIAL_STATE.LOTTO_GAME);
        this.lottoWinForm.setState(INITIAL_STATE.LOTTO_WIN_FORM);
        this.lottoResult.setState(INITIAL_STATE.LOTTO_RESULT);
      },
    });
  }

  setState({ inputAmount, lottoCnt, lottoNumberArr }) {
    this.state = {
      inputAmount,
      lottoCnt,
      lottoNumberArr,
    };

    this.lottoResult.setState({
      lottoCnt: lottoCnt,
      lottoNumberArr,
      toggled: this.lottoResult.state.toggled,
      visible: true,
    });

    this.lottoInput.setState(inputAmount);
  }
}
