export default class LottoResult {
  constructor({ $target, lottoCnt, lottoNumberArr }) {
    this.$element = $target.querySelector(".purchase-result");
    this.state = {
      lottoCnt: lottoCnt,
      lottoNumberArr: lottoNumberArr,
      toggled: false,
      visible: false,
    };

    this.$purchasResultCntTxt = this.$element.querySelector(
      ".purchase-result-txt span"
    );
    this.$lottoIconsUl = this.$element.querySelector("#lotto-icons");

    const $lottoNumbersToggleButton = this.$element.querySelector(
      ".lotto-numbers-toggle-button"
    );

    $lottoNumbersToggleButton.addEventListener(
      "input",
      this.handleIsNumberShown
    );
  }

  setState(nextState) {
    this.state = nextState;

    this.render();
  }

  handleIsNumberShown = () => {
    this.setState({
      lottoCnt: this.state.lottoCnt,
      lottoNumberArr: this.state.lottoNumberArr,
      toggled: !this.state.toggled,
      visible: this.state.visible,
    });
  };

  render() {
    const { lottoCnt, lottoNumberArr, toggled, visible } = this.state;
    if (visible) {
      this.$element.classList.remove("hidden");
      this.$element.classList.add("visible");
    } else {
      this.$element.classList.add("hidden");
      this.$element.classList.remove("visible");
    }

    this.$purchasResultCntTxt.textContent = lottoCnt;
    this.$lottoIconsUl.innerHTML = lottoNumberArr
      .map((lottoNumbers) => {
        return `
      <li class="mx-1 text-4xl lotto-wrapper">
      <span class="lotto-icon">🎟️ </span>
      <span class="lotto-detail ${toggled ? "visible" : "hidden"}"  >${[
          ...lottoNumbers,
        ]}</span>
    </li>`;
      })
      .join("");
  }
}
