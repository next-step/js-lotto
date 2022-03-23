import { $ } from "../utils/document.js";
import renderLottoNumbers from "./renderLottoNumbers.js";

export const Tickets = ($el, tickets) => {

  const state = {
    isShowNumbers: false,
  };

  function switchShowNumbers() {
    state.isShowNumbers = !state.isShowNumbers;
    renderLottoNumbers($el, state, tickets);
  };

  function render() {
    $el.insertAdjacentHTML('beforeEnd', `
            <section class="mt-9">
                <div class="d-flex">
                  <label class="flex-auto my-0" data-test="tickets-count">
                  총 ${tickets.length}개를 구매하였습니다.
                  </label>
                  <div class="flex-auto d-flex justify-end pr-1">
                    <label class="switch" data-test="number-detail-switch">
                      <input type="checkbox" class="lotto-numbers-toggle-button" data-test="amount-input"/>
                      <span class="text-base font-normal">번호보기</span>
                    </label>
                  </div>
                </div>
                <div data-component="lotto-numbers"><div>
            </section>
        `);

    $('.switch', $el).addEventListener('change', switchShowNumbers);
  }

  render();
}