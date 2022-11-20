// view
class Ui {
  #lottoList;

  constructor() {
    this.#lottoList = document.querySelector("#lotto-list");
  }

  onToggleReadMore(checked) {
    if (checked) {
      this.#lottoList.classList.add("flex-col");
      return;
    }
    this.#lottoList.classList.remove("flex-col");
  }

  render = (lottos) => {
    console.log("lottos", lottos);
  };
}

export default Ui;
