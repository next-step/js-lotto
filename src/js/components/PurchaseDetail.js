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
        <div class="d-flex flex-wrap contents"></div>
    </section>
    `;
  };

  #setEvents = () => {};
  setState = (lottos) => {
    const countText = document.querySelector("#count-text");
    countText.innerText = `총 ${lottos.length}개를 구매하였습니다. `;
    this.#initializeElements();
    for (const lotto of lottos) {
      this.#createIconElement();
      this.#createLottoContentElement(lotto);
    }
  };

  #createIconElement = () => {
    const icon = document.createElement("span");
    const text = document.createTextNode("🎟️");
    icon.className = "mx-1 text-4xl";
    icon.appendChild(text);
    const parent = document.querySelector(".icons");
    parent.appendChild(icon);
  };

  #createLottoContentElement = (lotto) => {
    const content = document.createElement("span");
    const text = document.createTextNode(`${lotto}`);
    content.className = "mx-1 text-4xl";
    content.appendChild(text);
    const parent = document.querySelector(".contents");
    parent.appendChild(content);
  };

  #initializeElements = () => {
    try {
      const icons = document.querySelector(".icons");
      while (icons.hasChildNodes()) {
        icons.removeChild(icons.firstChild);
      }
      const contents = document.querySelector(".contents");
      while (contents.hasChildNodes()) {
        contents.removeChild(contents.firstChild);
      }
    } catch (e) {
      console.error(e);
    }
  };

  constructor(target) {
    target.innerHTML = this.#template();
    this.#setEvents();
  }
}
