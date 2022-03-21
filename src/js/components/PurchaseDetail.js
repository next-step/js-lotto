export class PurchaseDetail {
  #template = () => {
    return `
    <section class="mt-9">
        <div class="d-flex">
        <label id="count-text" class="flex-auto my-0"
            ></label
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
        </div>
        <div class="d-flex flex-wrap text-base contents"></div>
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

  #createIconElement = () => {
    const icon = document.createElement("span");
    const text = document.createTextNode("🎟️");
    icon.className = "mx-1 text-4xl";
    icon.appendChild(text);
    this.#lottoIconsElement.appendChild(icon);
  };

  #createLottoContentElement = (lotto) => {
    const content = document.createElement("span");
    const text = document.createTextNode(`${lotto}`);
    content.className = "mx-1 text-xl";
    content.appendChild(text);
    this.#lottoContentsElement.appendChild(content);
  };

  #initializeElements = () => {
    try {
      const icons = this.#lottoIconsElement;
      while (icons.hasChildNodes()) {
        icons.removeChild(icons.firstChild);
      }
      const contents = this.#lottoContentsElement;
      while (contents.hasChildNodes()) {
        contents.removeChild(contents.firstChild);
      }
    } catch (e) {
      console.error(e);
    }
  };

  setState = (lottos) => {
    const countText = document.querySelector("#count-text");
    countText.innerText = `총 ${lottos.length}개를 구매하였습니다. `;
    this.#initializeElements();
    for (const lotto of lottos) {
      this.#createIconElement();
      this.#createLottoContentElement(lotto);
    }
    this.#handleIfToggleButtonIsChecked();
  };

  constructor(target) {
    target.innerHTML = this.#template();
    this.#toggleButtonElement = document.querySelector(".toggle-button");
    this.#lottoIconsElement = document.querySelector(".icons");
    this.#lottoContentsElement = document.querySelector(".contents");
    this.#setEvents();
  }
}
