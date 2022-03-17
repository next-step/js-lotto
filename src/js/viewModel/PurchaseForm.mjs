export default class PurchaseForm {
  #user;

  #seller;

  #machine;

  #button;

  #el;

  #lottoHistory;

  constructor(user, seller, machine, lottoHistory) {
    this.#user = user;
    this.#seller = seller;
    this.#machine = machine;
    this.#lottoHistory = lottoHistory;
    this.#el = document.querySelector('input[placeholder="구입 금액"]');
    this.#button = document.querySelector('input[placeholder="구입 금액"] + button');
    this.#el.addEventListener("change", this.#handleInputChange);
    this.#button.addEventListener("click", this.#handleButtonClick);
  }

  #handleInputChange = (event) => {
    const { valueAsNumber } = event.target;
    this.#user.wallet = valueAsNumber;
  }

  #handleButtonClick = (event) => {
    this.#user.buyLotto(this.#seller, this.#machine);
    this.#lottoHistory.render(this.#user.purchaseHistory)
  }
}
