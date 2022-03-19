import { canBeDividedBy1000, isNumber } from "../validation.js";

export class PriceInput {
  #value = 0;
  #template = () => {
    return `
    <form class="mt-5">
        <label class="mb-2 d-inline-block"
        >구입할 금액을 입력해주세요.
        </label>
        <div class="d-flex">
        <input
            type="number"
            class="price-input w-100 mr-2 pl-2"
            placeholder="구입 금액"
        />
        <button type="button" class="confirm btn btn-cyan">확인</button>
        </div>
    </form>
    `;
  };

  #setEvents = () => {
    const button = document.querySelector(".confirm");
    button.addEventListener("click", () => {
      this.#checkValidation();
    });
  };

  #checkValidation = () => {
    const input = document.querySelector(".price-input");
    const inputNumber = Number(input.value);
    if (!isNumber(inputNumber) || !canBeDividedBy1000(inputNumber)) {
      window.alert(`천 원 단위로 금액을 입력해주세요. `);
      input.value = "";
      return;
    }
    this.#value = inputNumber;
    console.log(`Validation passed: ${this.#value}`);
  };

  constructor(target) {
    target.innerHTML = this.#template();
    this.#setEvents();
  }
}
