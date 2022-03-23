import { MIN_PURCHASE_AMOUNT, PRICE_PER_TICKET } from "../constants/constants.js";
import { $ } from "../utils/document.js";
import { replaceRender } from "../utils/replaceRender.js";

/*
    @dev purchaseTicketsByUpdatingAmount is a function which is injected from Lotto.js
*/
export const AmountForm = ($el, purchaseTicketsByUpdatingAmount) => {

  function onSubmitAmount(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const amount = Number(formData.get('amount'));

    if (!amount || amount % PRICE_PER_TICKET > 0) {
      console.log('amount: ', amount);
      alert('각각의 로또는 1,000원 단위로 구매하실 수 있습니다.');
      return;
    }

    purchaseTicketsByUpdatingAmount(amount);
  }

  replaceRender({
    $originEl: $el,
    replaceHTML: `
          <form class="mt-5" data-test="amount-form">
              <label class="mb-2 d-inline-block">
                  구입할 금액을 입력해주세요.
              </label>
              <div class="d-flex">
                  <input
                      type="number"
                      class="w-100 mr-2 pl-2"
                      placeholder="구입 금액"
                      name="amount"
                      min="${MIN_PURCHASE_AMOUNT}"
                      data-test="amount-input"
                  />
                  <button type="submit" class="btn btn-cyan">확인</button>
              </div>
          </form>
      `,
    bindEvents: [
      ($el) => $('form', $el)
        .addEventListener('submit', onSubmitAmount),
    ],
  });
};

