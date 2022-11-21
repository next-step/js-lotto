export default function LottoResult({ $target }) {
  this.$element = $target.querySelector("[data-target=purchase-result]");
  this.state = {
    lottoCnt: 0,
    lottoNumberArr: [],
    toggled: false,
  };
  const $lottoNumbersToggleButton = $target.querySelector(
    ".lotto-numbers-toggle-button"
  );

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  $lottoNumbersToggleButton.addEventListener("input", (event) => {
    this.setState({
      lottoCnt: this.state.lottoCnt,
      lottoNumberArr: this.state.lottoNumberArr,
      toggled: event.target.checked,
    });
  });

  this.render = () => {
    const { lottoCnt, lottoNumberArr, toggled } = this.state;
    console.log(lottoNumberArr);
    this.$element.querySelector(
      "[data-target=purchase-result-txt] span"
    ).textContent = lottoCnt;

    const purchaseResultHtml = toggled
      ? `<ul id="lotto-icons" class="d-flex flex-wrap flex-col">` +
        lottoNumberArr.map((lottoNumbers) => {
          return `
            <li class="mx-1 text-4xl lotto-wrapper">
            <span class="lotto-icon">🎟️ </span>
            <span class="lotto-detail" style="display: inline;">${[
              ...lottoNumbers,
            ]}</span>
          </li>
            `;
        }) +
        `</ul>`
      : `<span class="mx-1 text-4xl">🎟️ </span>`.repeat(lottoCnt);

    this.$element.querySelector("[data-target=purchase-result-cnt]").innerHTML =
      purchaseResultHtml;
  };
}
