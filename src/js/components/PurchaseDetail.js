export class PurchaseDetail {
  #template = () => {
    return `
    <section class="mt-9">
        <div class="d-flex">
        <label id="count-text" class="flex-auto my-0"
            >총 5개를 구매하였습니다.</label
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
        <div class="d-flex flex-wrap">
        <span class="mx-1 text-4xl">🎟️ </span>
        <span class="mx-1 text-4xl">🎟️ </span>
        <span class="mx-1 text-4xl">🎟️ </span>
        <span class="mx-1 text-4xl">🎟️ </span>
        <span class="mx-1 text-4xl">🎟️ </span>
        </div>
    </section>
    `;
  };

  #setEvents = () => {};

  constructor(target) {
    target.innerHTML = this.#template();
    this.#setEvents();
  }
}
