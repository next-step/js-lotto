import { $ } from "../../../utils/dom.js";

const LottoListSection = {
  elements: {
    LOTTO_LIST_SECTION: $(".lotto-list-section"),
    LOTTO_COUNT: $(".lotto-count"),
    LOTTO_LIST_TOGGLE_BUTTON: $(".lotto-list-toggle-button"),
    LOTTO_LIST: $(".lotto-list"),
  },

  generateLottoItemTemplate(lottoNumbers, hideLottoNumbers) {
    const lottoNumbersTextContent = lottoNumbers.join(", ");

    return /*HTML*/ `<li class="lotto-item d-flex items-center">
  <span class="mx-1 text-4xl">🎟️ </span>
  <span class="lotto-numbers ${
    hideLottoNumbers ? "d-none" : ""
  }">${lottoNumbersTextContent}</span>
  </li>`;
  },

  show(lottos) {
    this.elements.LOTTO_LIST_SECTION.classList.remove("d-none");
    this.renderLottoCount(lottos);
    this.reset(lottos);
  },

  hide() {
    this.elements.LOTTO_LIST_SECTION.classList.add("d-none");
  },

  renderLottoCount(lottos) {
    this.elements.LOTTO_COUNT.textContent = lottos.length;
  },

  toggleLottoNumbers(lottos) {
    const checked = this.elements.LOTTO_LIST_TOGGLE_BUTTON.checked;

    if (checked) {
      this.showLottoNumbers(lottos);
    } else {
      this.hideLottoNumbers(lottos);
    }
  },

  showLottoNumbers(lottos) {
    const lottoListTemplate = lottos.map((lotto) =>
      this.generateLottoItemTemplate(lotto.lottoNumberValues, false)
    );

    this.elements.LOTTO_LIST.innerHTML = lottoListTemplate.join("");
    this.elements.LOTTO_LIST.classList.add("flex-col");
  },

  hideLottoNumbers(lottos) {
    const lottoListTemplate = lottos.map((lotto) =>
      this.generateLottoItemTemplate(lotto.lottoNumberValues, true)
    );

    this.elements.LOTTO_LIST.innerHTML = lottoListTemplate.join("");
    this.elements.LOTTO_LIST.classList.remove("flex-col");
  },

  reset(lottos) {
    this.hideLottoNumbers(lottos);
    this.elements.LOTTO_LIST_TOGGLE_BUTTON.checked = false;
  },
};

export default LottoListSection;
