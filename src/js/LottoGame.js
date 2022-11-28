import LottoGenerator from "./Controller/LottoGenerator.js";
import LottoInput from "./View/LottoInput.js";
import LottoResult from "./View/LottoResult.js";
import { LOTTO } from "./constants.js";

export default function LottoGame() {
  this.$element = document.querySelector("#app");

  const lottoGenerator = new LottoGenerator();
  const lottoInput = new LottoInput({
    $target: this.$element,
    onSubmit: (inputAmount) => {
      const [randomNumberArray, lottoCnt] = lottoGenerator({
        moneyAmount: inputAmount,
        min: LOTTO.LOTTO_NUMBER_MIN,
        max: LOTTO.LOTTO_NUMBER_MAX,
      });
      lottoResult.setState({
        lottoCnt: lottoCnt,
        lottoNumberArr: randomNumberArray,
        toggled: lottoResult.state.toggled,
      });
      lottoInput.setState("");
    },
  });

  const lottoResult = new LottoResult({
    $target: this.$element,
  });
}
