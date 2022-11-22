class LottoView {
  constructor() {
    this.$purchaseTotalCount = document.getElementById("purchase-total-count");
    this.$lottoListSection = document.getElementById("lotto-list-section");
    this.$showLottoNumberToggle = document.getElementById(
      "show-lotto-number-toggle"
    );

    this.lottos = [];
    this.isShowLottoNumberChecked = false;
    this.#initEvents();
  }

  #initEvents() {
    this.$showLottoNumberToggle.addEventListener(
      "change",
      this.onChangeShowNumberToggle.bind(this)
    );
  }

  render(lottos) {
    this.lottos = lottos;

    this.$purchaseTotalCount.innerHTML = this.templateTotalCount();
    this.renderLottoList();
  }

  renderLottoList() {
    this.$lottoListSection.classList = this.isShowLottoNumberChecked
      ? "d-block"
      : "d-flex flex-wrap";
    this.$lottoListSection.innerHTML = this.lottos
      .map((lotto) => this.templateLotto(lotto))
      .join("");
  }

  onChangeShowNumberToggle(event) {
    this.isShowLottoNumberChecked = event.target.checked;
    this.renderLottoList();
  }

  templateTotalCount() {
    return `총 ${this.lottos.length}개를 구매하였습니다.`;
  }

  templateLotto(lotto) {
    return `
            <div class="d-flex items-center">
              <span class="mx-1 text-4xl">🎟️ </span>
              ${
                this.isShowLottoNumberChecked
                  ? `<span data-cy="lotto-number">${lotto}</span>`
                  : ``
              }
            </div>
          `;
  }
}

export default LottoView;
