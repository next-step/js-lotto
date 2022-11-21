// view
class Ui {
  #lottoList;
  #purchasedCount;

  constructor() {
    this.#lottoList = document.querySelector("#lotto-list");
    this.#purchasedCount = document.querySelector(".purchased-count");
  }

  onToggleReadMore(checked) {
    if (checked) {
      this.#lottoList.classList.add("flex-col");
      return;
    }
    this.#lottoList.classList.remove("flex-col");
  }

  renderLottoElements(lottos) {
    lottos.forEach((lotto) => {
      const newListItem = document.createElement("li");
      newListItem.className = "d-flex mx-1 text-4xl";

      const listOfLottoNumber = document.createElement("span");
      listOfLottoNumber.className = "lotto-detail ml-1";
      listOfLottoNumber.style.display = "none";
      listOfLottoNumber.innerText = lotto;

      const listOfLottoIcon = document.createElement("span");
      listOfLottoIcon.className = "lotto-icon";
      listOfLottoIcon.innerText = "🎟️ ";

      newListItem.appendChild(listOfLottoIcon);
      newListItem.appendChild(listOfLottoNumber);
      this.#lottoList.appendChild(newListItem);
    });
  }

  renderLottoCount(count) {
    this.#purchasedCount.innerText = count;
  }

  render = (state) => {
    console.log("lottos", state);
    this.renderLottoElements(state.lottos);
    this.renderLottoCount(state.gameCount);
  };
}

export default Ui;
