import { $ } from "../../../utils/dom.js";

let instance;
class LottoListSection {
  #$lottoListSection;
  #$lottoCount;
  #$lottoListToggleButton;
  #$lottoList;

  constructor(onToggle) {
    if (instance) {
      return instance;
    }

    this.#$lottoListSection = $(".lotto-list-section");
    this.#$lottoCount = $(".lotto-count");
    this.#$lottoListToggleButton = $(".lotto-list-toggle-button");
    this.#$lottoList = $(".lotto-list");

    this.#$lottoListToggleButton.addEventListener("click", onToggle);

    instance = this;
  }

  generateLottoItemTemplate(lottoNumbers, hideLottoNumbers) {
    const lottoNumbersTextContent = lottoNumbers.join(", ");

    return /*HTML*/ `<li class="d-flex items-center">
  <span class="mx-1 text-4xl">🎟️ </span>
  <span class="lotto-numbers ${
    hideLottoNumbers ? "d-none" : ""
  }">${lottoNumbersTextContent}</span>
  </li>`;
  }

  show(lottos) {
    this.#$lottoListSection.classList.remove("d-none");

    this.reset(lottos);
  }

  hide() {
    this.#$lottoListSection.classList.add("d-none");
  }

  renderLottoCount() {
    const $lottoCount = $(".lotto-count");
    $lottoCount.textContent = lottos.length;
  }

  toggleLottoNumbers(lottos) {
    const checked = this.#$lottoListToggleButton.checked;

    if (checked) {
      this.showLottoNumbers(lottos);
    } else {
      this.hideLottoNumbers(lottos);
    }
  }

  showLottoNumbers(lottos) {
    const lottoListTemplate = lottos.map((lotto) =>
      this.generateLottoItemTemplate(lotto.numbers, false)
    );

    this.#$lottoList.innerHTML = lottoListTemplate.join("");
    this.#$lottoList.classList.add("flex-col");
  }

  hideLottoNumbers(lottos) {
    const lottoListTemplate = lottos.map((lotto) =>
      this.generateLottoItemTemplate(lotto.numbers, true)
    );

    this.#$lottoList.innerHTML = lottoListTemplate.join("");
    this.#$lottoList.classList.remove("flex-col");
  }

  reset(lottos) {
    this.hideLottoNumbers(lottos);
    this.#$lottoListToggleButton.checked = false;
  }
}

export default LottoListSection;
