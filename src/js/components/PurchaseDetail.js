export class PurchaseDetail {
  #template = () => {
    return `
    <section class="mt-9">
        <div class="d-flex">
        <label id="count-text" class="flex-auto my-0"
            >총 개를 구매하였습니다.</label
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
    </section>
    `;
  };

  #setEvents = () => {};
  setState = (lottos) => {
    const countText = document.querySelector("#count-text");
    countText.innerText = `총 ${lottos.length}개를 구매하였습니다. `;
    for (const lotto of lottos) {
      const icon = document.createElement("span");
      const text = document.createTextNode("🎟️");
      icon.className = "mx-1 text-4xl";
      icon.appendChild(text);
      const parent = document.querySelector(".icons");
      parent.appendChild(icon);
    }
  };

  constructor(target) {
    target.innerHTML = this.#template();
    this.#setEvents();
  }
}
