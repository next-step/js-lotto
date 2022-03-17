const LOTTO_SECTION = 'lotto-section';
const LOTTO_SECTION__LABEL = 'lotto-section__label';
export default class LottoSection {
  #el;
  #state;

  constructor(props = { state: { isShow: false } }) {
    const { state } = props;
    this.#state = state || { price: '' };
    this.#el = document.createElement('section');
    this.#el.innerHTML = this.getHtml();
    this.#state = state;
  }

  get isHidden() {
    return !this.#state.isShow;
  }

  getHtml() {
    return `<section class="mt-9 ${LOTTO_SECTION}" ${this.isHidden && 'hidden'}>
            <div class="d-flex">
            <label class="flex-auto my-0 ${LOTTO_SECTION__LABEL}">총 5개를 구매하였습니다.</label>
            <div class="flex-auto d-flex justify-end pr-1">
                <label class="switch">
                <input type="checkbox" class="lotto-numbers-toggle-button" />
                <span class="text-base font-normal">번호보기</span>
                </label>
            </div>
            </div>
            <div class="d-flex flex-wrap lotto-section-tickets">
            </div>
        </section>`;
  }
}
