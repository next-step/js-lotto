class LottoView {
  constructor() {
    this.$container = document.getElementById("purchase-lotto-section");
    this.$purchaseTotalCount = document.getElementById("purchase-total-count");
    this.$lottoNumberVisible = document.getElementById("lotto-number-visible");
    this.$lottoListContainer = document.getElementById("lotto-list-section");

    this.clear();
  }

  clear() {
    this.$container.classList.add("hide");
    this.$purchaseTotalCount.innerHTML = "";
    this.$lottoListContainer.innerHTML = "";
  }

  render({ lottos, count, lottoNumberVisible }) {
    this.$container.classList.remove("hide");
    this.$purchaseTotalCount.innerHTML = this.templateTotalCount(count);

    this.$lottoListContainer.classList = lottoNumberVisible
      ? "d-block"
      : "d-flex flex-wrap";
    this.$lottoListContainer.innerHTML = lottos
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
