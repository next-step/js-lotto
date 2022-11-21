import { removeAllChildNodes } from "./utils.js";

class Ui {
  #lottoList;
  #purchasedCount;
  #purchasedLottos;
  #checkWinningNumber;

  constructor() {
    this.#purchasedLottos = document.querySelector("#purchased-lottos");
    this.#lottoList = document.querySelector("#lotto-list");
    this.#checkWinningNumber = document.querySelector("#check-winning-number");
    this.#purchasedCount = document.querySelector(".purchased-count");
  }

  displayLottoDetail(checked) {
    this.#lottoList.querySelectorAll(".lotto-detail").forEach(($detail) => {
      $detail.style.display = checked ? "inline-block" : "none";
    });
  }

  onToggleReadMore(checked) {
    checked
      ? this.#lottoList.classList.add("flex-col")
      : this.#lottoList.classList.remove("flex-col");

    this.displayLottoDetail(checked);
  }

  createListItem(lotto) {
    const $newListItem = document.createElement("li");
    $newListItem.className = "d-flex mx-1 text-4xl";

    const $listOfLottoNumber = document.createElement("span");
    $listOfLottoNumber.className = "lotto-detail ml-1";
    $listOfLottoNumber.style.display = "none";
    $listOfLottoNumber.innerText = lotto.join(", ");

    const $listOfLottoIcon = document.createElement("span");
    $listOfLottoIcon.className = "lotto-icon";
    $listOfLottoIcon.innerText = "🎟";

    $newListItem.appendChild($listOfLottoIcon);
    $newListItem.appendChild($listOfLottoNumber);

    return $newListItem;
  }

  renderLottoElements(lottos) {
    removeAllChildNodes(this.#lottoList);

    lottos.forEach((lotto) => {
      const createdListItem = this.createListItem(lotto);
      this.#lottoList.appendChild(createdListItem);
    });
  }

  renderLottoCount(count) {
    this.#purchasedCount.innerText = count;
  }

  render = (state) => {
    this.#purchasedLottos.style.display = "block";
    this.#checkWinningNumber.style.display = "block";
    this.renderLottoElements(state.lottos);
    this.renderLottoCount(state.gameCount);
  };
}

export default Ui;
