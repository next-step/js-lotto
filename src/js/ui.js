import { removeAllChildNodes, toggleClass } from "./utils.js";

class Ui {
  #lottoList;
  #purchasedLottos;
  #purchasedCount;
  #viewNumbersCheckbox;
  #checkWinningNumber;

  constructor() {
    this.#lottoList = document.querySelector("#lotto-list");
    this.#purchasedLottos = document.querySelector("#purchased-lottos");
    this.#purchasedCount = document.querySelector(".purchased-count");
    this.#viewNumbersCheckbox = document.querySelector(
      ".view-numbers-checkbox"
    );
    this.#checkWinningNumber = document.querySelector("#check-winning-number");
  }

  onViewNumbers(checked) {
    toggleClass({
      $element: this.#lottoList,
      className: "expanded",
      condition: checked,
    });
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

  render = (state) => {
    this.#purchasedLottos.classList.add("display");
    this.#checkWinningNumber.classList.add("display");
    this.#lottoList.classList.remove("expanded");
    this.#viewNumbersCheckbox.checked = false;
    this.#renderLottoElements(state.lottos);
    this.#renderLottoCount(state.gameCount);
  };
}

export default Ui;
