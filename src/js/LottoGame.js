import LottoGenerator from "./LottoGenerator.js";
import LottoInput from "./LottoInput.js";
import LottoResult from "./LottoResult.js";

export default function LottoGame() {
  this.$element = document.querySelector("#app");

  // this.inputAmount = 0;
  // this.lottoNumbers = [];
  // this.lottoCnt = 0;

  const lottoGenerator = new LottoGenerator();
  const lottoInput = new LottoInput({
    $target: this.$element,
    onSubmit: (inputAmount) => {
      const [randomNumberArray, lottoCnt] = lottoGenerator({
        moneyAmount: inputAmount,
        min: 1,
        max: 45,
      });

      lottoResult.setState({
        lottoCnt: lottoCnt,
        lottoNumberArr: randomNumberArray,
        toggled: lottoResult.state.toggled,
      });
    },
  });

  const lottoResult = new LottoResult({
    $target: this.$element,
  });
}
