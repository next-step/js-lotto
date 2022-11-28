export default function LottoResult({ $target }) {
  this.$element = $target.querySelector(".purchase-result");
  this.state = {
    lottoCnt: 0,
    lottoNumberArr: [],
    toggled: false,
  };

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    const { lottoCnt, lottoNumberArr, toggled } = this.state;

    const purchaseResultCntDiv = `
    <div class="d-flex">
              <label class="flex-auto my-0 purchase-result-txt"
                >총 <span>${lottoCnt}</span>개를 구매하였습니다.</label
              >
              <div class="flex-auto d-flex jxustify-end pr-1">
                <label class="switch">
                  <input type="checkbox" class="lotto-numbers-toggle-button" />
                  <span class="text-base font-normal">번호보기</span>
                </label>
              </div>
            </div>`;

    const purchaseResultUl = toggled
      ? `<ul id="lotto-icons" class="d-flex flex-wrap flex-col">` +
        lottoNumberArr
          .map((lottoNumbers) => {
            return `
            <li class="mx-1 text-4xl lotto-wrapper">
            <span class="lotto-icon">🎟️ </span>
            <span class="lotto-detail" style="display: inline;">${[
              ...lottoNumbers,
            ]}</span>
          </li>
            `;
          })
          .join("") +
        `</ul>`
      : `<span class="mx-1 text-4xl lotto-icon">🎟️ </span>`.repeat(lottoCnt);

    this.$element.innerHTML = purchaseResultCntDiv + purchaseResultUl;

    const $lottoNumbersToggleButton = $target.querySelector(
      ".lotto-numbers-toggle-button"
    );

    $lottoNumbersToggleButton.addEventListener("input", (event) => {
      this.setState({
        lottoCnt: this.state.lottoCnt,
        lottoNumberArr: this.state.lottoNumberArr,
        toggled: !this.state.toggled,
      });
    });
  };
}
