import { isValidPriceInput } from "../validation.js";
import { INVALID_INPUT_ALERT_STRING } from "../constants.js";

export class PriceInput {
  constructor(target, onClickPriceInputConfirmButton) {
    target.innerHTML = this.#template();
    this.#setEvents(onClickPriceInputConfirmButton);
  }

  #template = () => {
    return `
    <form id="price-input-form" class="mt-5">
        <label class="mb-2 d-inline-block"
        >구입할 금액을 입력해주세요.
        </label>
        <div class="d-flex">
        <input
            type="number"
            name="price-input"
            class="price-input w-100 mr-2 pl-2"
            placeholder="구입 금액"
            autofocus
            required
        />
        <button class="confirm btn btn-cyan">확인</button>
        </div>
    </form>
    `;
  };

  #setEvents = (onClickPriceInputConfirmButton) => {
    const priceInputForm = document.querySelector("#price-input-form");
    priceInputForm.addEventListener("submit", (event) => {
      this.#handlePriceInputSubmitEvent(event, onClickPriceInputConfirmButton);
    });
  };

  #handlePriceInputSubmitEvent = (event, callback) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const inputValue = Number(form.get("price-input"));

    if (!isValidPriceInput(inputValue)) {
      window.alert(INVALID_INPUT_ALERT_STRING);
      form.set("price-input", "");
      return;
    }
    callback(inputValue);
  };
}
