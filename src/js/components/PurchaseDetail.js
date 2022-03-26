export class PurchaseDetail {
  constructor(target) {
    this.#target = target;
    this.#target.innerHTML = this.#template([]);
    this.#toggleButtonElement = document.querySelector(".toggle-button");
    this.#lottoIconsElement = document.querySelector(".icons");
    this.#lottoContentsElement = document.querySelector(".contents");
    this.#setEvents();
  }

  #target;

  #template = (lottos) => {
    let iconElements = "";
    let lottoContentElements = "";
    for (const lotto of lottos) {
      iconElements += `<span class="mx-1 text-4xl">🎟️</span>`;
      lottoContentElements += `<span class="mx-1 text-xl">${lotto}</span>`;
    }
    return `
    <section class="mt-9">
        <div class="d-flex">
        <label id="count-text" class="flex-auto my-0"
            >총 ${lottos.length}개를 구매하였습니다. </label
        >
        <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
            <input
                type="checkbox"
                class="toggle-button"
            />
            <span class="text-base font-normal">번호보기</span>
            </label>
        </div>
        </div>
        <div class="d-flex flex-wrap icons">
          ${iconElements}
        </div>
        <div class="d-flex flex-wrap text-base contents">
          ${lottoContentElements}
        </div>
    </section>
    `;
  };

  #toggleButtonElement;
  #lottoIconsElement;
  #lottoContentsElement;

  #setEvents = () => {
    this.#toggleButtonElement.addEventListener("change", () => {
      this.#handleIfToggleButtonIsChecked();
    });
  };

  #handleIfToggleButtonIsChecked = () => {
    if (this.#toggleButtonElement.checked) {
      this.#lottoContentsElement.style.visibility = "visible";
    } else {
      this.#lottoContentsElement.style.visibility = "hidden";
    }
  };

  #initializeElements = () => {
    this.#target.innerHTML = this.#template([]);
  };

  setState = (lottos) => {
    this.#initializeElements();
    this.#target.innerHTML = this.#template(lottos);
    this.#toggleButtonElement = document.querySelector(".toggle-button");
    this.#lottoIconsElement = document.querySelector(".icons");
    this.#lottoContentsElement = document.querySelector(".contents");
    this.#setEvents();
    this.#handleIfToggleButtonIsChecked();
  };
}
