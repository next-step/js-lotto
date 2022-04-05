import { selector } from '../utils/consts.js'
import purchase from './Event/lottoPurchaseEvent.js';
/**
 * <div class="d-flex justify-center">
        <div class="w-100">
          <h1 class="text-center mb-5">🎱 행운의 로또</h1>
          <form class="mt-10 lotto-purchase-form">
            <label class="mb-2 d-inline-block"
              >구입할 금액을 입력해주세요.
            </label>
            <div class="lotto-purchase-inputBox d-flex">
              <input
                type="number"
                class="lotto-purchase-input w-100 mr-2 pl-2"
                placeholder="구입 금액"
                data-amount="input"
                min="1000"
                max="100000"
                required
              />
              <button type="submit" class="lotto-purchase-btn btn btn-cyan" data-amount="btn">확인</button>
            </div>
          </form>
 */

const Event = {
  init() {
    const lottoPurchaseForm = selector('.lotto-purchase-form');
    lottoPurchaseForm.addEventListener('submit', purchase.handleSubmitEvent)
  }, 
}

export default Event;
