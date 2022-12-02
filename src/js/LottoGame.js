import generateLottoRandomNumbers from "./Lotto/LottoGenerator.js";
import LottoInput from "./Components/LottoInput.js";
import LottoResult from "./Components/LottoResult.js";
import { LOTTO } from "./constants.js";

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

        this.setState({ inputAmount: 0, lottoCnt, randomNumberArray });
      },
    });

    this.lottoResult = new LottoResult({
      $target: this.$element,
      lottoCnt: 0,
      lottoNumberArr: [],
    });
  }

  setState({ inputAmount = 0, lottoCnt, randomNumberArray }) {
    this.state = {
      inputAmount,
      lottoCnt,
      randomNumberArray,
    };

    this.lottoResult.setState({
      lottoCnt: lottoCnt,
      lottoNumberArr: randomNumberArray,
      toggled: this.lottoResult.state.toggled,
    });

    this.lottoInput.setState(inputAmount);
  }
}
