class LottoListSection {
  #$lottoListSection;
  #$lottoCount;
  #$lottoListToggleButton;
  #$lottoList;

  constructor(
    $lottoListSection,
    $lottoCount,
    $lottoListToggleButton,
    $lottoList,
    onToggle
  ) {
    this.#$lottoListSection = $lottoListSection;
    this.#$lottoCount = $lottoCount;
    this.#$lottoListToggleButton = $lottoListToggleButton;
    this.#$lottoList = $lottoList;
    this.#$lottoListToggleButton.addEventListener("click", onToggle);
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

  showLottoListSection(lottos) {
    this.#$lottoListSection.classList.remove("d-none");

    // update purchased lotto count
    const lottoCountLabelContent = lottos.length;
    this.#$lottoCount.textContent = lottoCountLabelContent;

    this.hideLottoNumbers(lottos);
  }

  hidelottoListSection() {
    this.#$lottoListSection.classList.add("d-none");
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

  reset() {
    this.hideLottoNumbers();
    this.#$lottoListToggleButton.checked = false;
  }
}

export default LottoListSection;
