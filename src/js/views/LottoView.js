class LottoView {
  constructor() {
    this.$purchaseTotalCount = document.getElementById("purchase-total-count");
    this.$lottoNumberVisible = document.getElementById("lotto-number-visible");
    this.$lottoListSection = document.getElementById("lotto-list-section");
    this.$lastWinningNumbersForm = document.getElementById(
      "last-winning-numbers-form"
    );
  }

  render({ lottos, count, lottoNumberVisible }) {
    this.$purchaseTotalCount.innerHTML = this.templateTotalCount(count);

    this.$lottoListSection.classList = lottoNumberVisible
      ? "d-block"
      : "d-flex flex-wrap";
    this.$lottoListSection.innerHTML = lottos
      .map((lotto) => this.templateLotto(lotto, lottoNumberVisible))
      .join("");
  }

  templateTotalCount(count) {
    return `총 ${count}개를 구매하였습니다.`;
  }

  templateLotto(lotto, lottoNumberVisible) {
    return `
            <div class="d-flex items-center">
              <span class="mx-1 text-4xl">🎟️ </span>
              ${
                lottoNumberVisible
                  ? `<span data-cy="lotto-number">${lotto}</span>`
                  : ``
              }
            </div>
          `;
  }
}

export default LottoView;
