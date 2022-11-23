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

  createListItem(lotto) {
    const $newListItem = document.createElement("li");
    $newListItem.className = "d-flex mx-1 text-4xl";

    const $listOfLottoNumber = document.createElement("span");
    $listOfLottoNumber.className = "lotto-detail ml-1";
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
    this.#purchasedLottos.classList.add("display");
    this.#checkWinningNumber.classList.add("display");
    this.#lottoList.classList.remove("expanded");
    this.#viewNumbersCheckbox.checked = false;
    this.renderLottoElements(state.lottos);
    this.renderLottoCount(state.gameCount);
  };
}

export default Ui;
