import { getRandomNumber } from "./utils/index.js";
import { LOTTO } from "./constants/index.js";

// const $showResultButton = document.querySelector(".open-result-modal-button");
// const $modalClose = document.querySelector(".modal-close");
// const $modal = document.querySelector(".modal");
// const $lottoNumbersToggleButton = document.querySelector(".lotto-numbers-toggle-button");

class LottoApp {
  constructor() {
    this.lottos = [];
    this.price = "";
  }

  init() {
    document.querySelector(".price").addEventListener("change", (e) => this.onChangePrice(e));
    document.querySelector(".submit").addEventListener("click", () => this.onSubmitPrice());
    document.querySelector(".lotto-numbers-toggle-button").addEventListener("change", () => this.onToggleButton());
  }

  onChangePrice(e) {
    this.price = e.target.value;
  }

  showLottoNumbers() {
    document.querySelectorAll(".lotto-number").forEach((el) => el.classList.remove("hide"));
  }

  hideLottoNumers() {
    document.querySelectorAll(".lotto-number").forEach((el) => el.classList.add("hide"));
  }

  onToggleButton() {
    const toggleStatus = document.querySelector(".lotto-numbers-toggle-button").classList.toggle("button");

    toggleStatus ? this.showLottoNumbers() : this.hideLottoNumers();
  }

  calurateLottoNumbers() {
    this.lottos = Array.from({ length: Math.floor(this.price / LOTTO.PRICE) }, (lotto) => {
      lotto = new Set();

      while (lotto.size < LOTTO.COUNT) {
        lotto.add(getRandomNumber(LOTTO.MIN, LOTTO.MAX));
      }
      return [...lotto];
    });
  }

  renderLottosNumbers() {
    document.querySelector(".lotto-container").innerHTML += this.lottos.map((lotto) => {
      return `
      <div class="d-flex">
        <span class="mx-1 text-4xl">🎟️ </span>
        <span class="mx-1 text-base lotto-number hide">${lotto.join(", ")}</span>
      </div>
      `;
    });

    document.querySelector(".total").textContent = `총 ${this.lottos.length}개를 구매하였습니다.`;
  }

  onSubmitPrice() {
    this.calurateLottoNumbers();
    this.renderLottosNumbers();
  }
}

new LottoApp().init();

// const onModalShow = () => {
//   $modal.classList.add("open");
// };

// const onModalClose = () => {
//   $modal.classList.remove("open");
// };

// $showResultButton.addEventListener("click", onModalShow);
// $modalClose.addEventListener("click", onModalClose);
