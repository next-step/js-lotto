export default class PurchaseForm {
  #user;

  #seller;

  #machine;

  #form;

  #el;

  constructor(user, seller, machine) {
    this.#user = user;
    this.#seller = seller;
    this.#machine = machine;
    this.#el = document.querySelector('input[placeholder="구입 금액"]');
    this.#form = this.#el.closest("form");
    this.#el.addEventListener("change", this.#handleInputChange);
    this.#form.addEventListener("submit", this.#handleFormSubmit);
  }

  #handleInputChange(event) {
    const { valueAsNumber } = event.target;
    this.#user.wallet = valueAsNumber;
  }

  #handleFormSubmit(event) {
    event.preventDefault();

    this.#user.buyLotto(this.#seller, this.#machine);
  }
}
