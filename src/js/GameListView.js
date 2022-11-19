class GameListView {
  constructor() {
    this.$purchaseTotalCount = document.getElementById("purchase-total-count");
    this.$gameListSection = document.getElementById("game-list-section");
    this.$showGameNumberToggle = document.getElementById(
      "show-game-number-toggle"
    );

    this.games = [];
    this.isShowGameNumberChecked = false;
    this.#init();
  }

  #init() {
    this.$showGameNumberToggle.addEventListener(
      "change",
      this.onChangeShowNumberToggle.bind(this)
    );
  }

  render(games) {
    this.games = games;

    this.$purchaseTotalCount.innerHTML = this.templateTotalCount();
    this.renderGameList();
  }

  renderGameList() {
    this.$gameListSection.classList = this.isShowGameNumberChecked
      ? "d-block"
      : "d-flex flex-wrap";
    this.$gameListSection.innerHTML = this.games
      .map((game) =>
        this.isShowGameNumberChecked
          ? this.templateGameIconWithNumber(game)
          : this.templateGameIcon()
      )
      .join("");
  }

  onChangeShowNumberToggle(event) {
    this.isShowGameNumberChecked = event.target.checked;
    this.renderGameList();
  }

  templateTotalCount() {
    return `총 ${this.games.length}개를 구매하였습니다.`;
  }

  templateGameIcon() {
    return `<span class="mx-1 text-4xl">🎟️ </span>`;
  }

  templateGameIconWithNumber(game) {
    return `
            <div class="d-flex items-center">
              <span class="mx-1 text-4xl">🎟️ </span>
              <span data-cy="game-number">${game}</span>
            </div>
          `;
  }
}

export default GameListView;
