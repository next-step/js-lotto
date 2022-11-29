import { removeAllChildNodes, toggleClass } from "./utils.js";

class Ui {
  #lottoList;
  #purchasedLottos;
  #purchasedCount;
  #viewNumbersCheckbox;
  #checkWinningNumberArea;
  #modal;

  constructor() {
    this.#lottoList = document.querySelector("#lotto-list");
    this.#purchasedLottos = document.querySelector("#purchased-lottos");
    this.#purchasedCount = document.querySelector(".purchased-count");
    this.#viewNumbersCheckbox = document.querySelector(
      ".view-numbers-checkbox"
    );
    this.#checkWinningNumberArea = document.querySelector(
      "#check-winning-number-area"
    );
    this.#modal = document.querySelector(".modal");
  }

  get modal() {
    return this.#modal;
  }

  onViewNumbers(checked) {
    toggleClass({
      $element: this.#lottoList,
      className: "expanded",
      flag: checked,
    });
  }

  onOpenResultModal() {
    this.#modal.classList.add("open");
  }

  onCloseResultModal() {
    this.#modal.classList.remove("open");
  }

  getLottoElement(lotto) {
    const $newListItem = document.createElement("li");
    const $listOfLottoNumber = document.createElement("span");
    const $listOfLottoIcon = document.createElement("span");

    $newListItem.className = "d-flex mx-1 text-4xl";
    $listOfLottoIcon.className = "lotto-icon";
    $listOfLottoNumber.className = "lotto-detail ml-1";
    $listOfLottoIcon.innerText = "🎟";
    $listOfLottoNumber.innerText = lotto.join(", ");

    $newListItem.appendChild($listOfLottoIcon);
    $newListItem.appendChild($listOfLottoNumber);

    return $newListItem;
  }

  #renderLottoElements(lottos) {
    removeAllChildNodes(this.#lottoList);

    lottos.forEach((lotto) => {
      const $lottoElement = this.getLottoElement(lotto);
      this.#lottoList.appendChild($lottoElement);
    });
  }

  #renderLottoCount(count) {
    this.#purchasedCount.innerText = count;
  }

  #initPurchasedView() {
    this.#purchasedLottos.classList.add("display");
    this.#checkWinningNumberArea.classList.add("display");
    this.#lottoList.classList.remove("expanded");
    this.#viewNumbersCheckbox.checked = false;
  }

  render = (state) => {
    this.#initPurchasedView();
    this.#renderLottoElements(state.lottos);
    this.#renderLottoCount(state.gameCount);
  };
}

export default Ui;
