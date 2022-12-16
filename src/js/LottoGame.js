import { generateLottoRandomNumbers } from "./Lotto/LottoGenerator.js";
import {
  isWinningBonusNumberDuplicated,
  getLottoProfit,
} from "./utils/random-utils.js";
import { lottoWinningNumberCounter } from "../js/Lotto/LottoWinningDataMaker.js";
import { ERROR_MESSAGES } from "../js/constants.js";

import LottoInput from "./Components/LottoInput.js";
import LottoResult from "./Components/LottoResult.js";
import LottoModal from "./Components/LottoWinForm.js";
import LottoWinForm from "./Components/LottoWinForm.js";
import { LOTTO, WINNING_AMOUNT } from "./constants.js";
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

    this.lottoModal = new LottoModal({
      $target: this.$element,
    });

    this.lottoWinForm = new LottoWinForm({
      $target: this.$element,
      lottoNumberArrays: this.state.lottoNumberArr,
      onSubmit: () => {
        const winningNumbers = Array.from(
          this.lottoWinForm.$form.querySelectorAll(".winning-number")
        ).map((el) => Number(el.value));

        const bonusNumber = Number(
          this.lottoWinForm.$form.querySelector(".bonus-number").value
        );

        if (isWinningBonusNumberDuplicated([...winningNumbers, bonusNumber])) {
          alert(ERROR_MESSAGES.DUPLICATED_NUMBERS);
          return;
        }
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

        this.lottoWinForm.state["lottoWinNumberCountMap"] =
          lottoWinNumberCountMap;
        this.lottoWinForm.state["lottoProfitRate"] = lottoProfitRate;
        this.lottoWinForm.state["statisticsMade"] = true;
        this.lottoWinForm.state["modalOpened"] = true;

        this.lottoWinForm.setState(this.state);
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
    });

    //this.lottoInput.setState(inputAmount);
    this.lottoWinForm.setState({ lottoNumberArr });
  }
}
