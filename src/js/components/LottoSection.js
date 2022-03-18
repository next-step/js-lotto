const LOTTO_SECTION = 'lotto-section';
const LOTTO_SECTION__LABEL = 'lotto-section__label';
export default class LottoSection {
  #el;
  #state;

  constructor($parent, props) {
    Object.assign(this, props);

    this.#el = document.createElement('div');
    this.#el.innerHTML = this.getHtml();
    $parent.replaceWith(this.#el);
  }

  getHtml() {
    return `<section class="mt-9 ${LOTTO_SECTION}">
              <div class="d-flex">
              <label class="flex-auto my-0 lotto-section__label">총 5개를 구매하였습니다.</label>
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
