export default class PurchaseForm {
  #user;

  #priceForm;

  #priceInput;

  #lottoHistory;

  constructor({user, lottoHistory}) {
    this.#user = user;
    this.#lottoHistory = lottoHistory;
    this.#priceInput = document.querySelector('input[placeholder="구입 금액"]');
    this.#priceForm = this.#priceInput.closest('form');
    this.#priceInput.addEventListener("change", this.#handleInputChange);
    this.#priceForm.addEventListener("submit", this.#handleSubmit);
  }

  #handleInputChange = (event) => {
    const { valueAsNumber } = event.target;
    this.#user.wallet = valueAsNumber;
  }

  /**
   *
   * @param {Event} event
   */
  #handleSubmit = (event) => {
    event.preventDefault()
    this.#user.buyLotto();
    this.#lottoHistory.render(this.#user.purchaseHistory)
  }
}
