import { $elements } from '../helper/index.js';

const AppTemplate = () =>
  $elements(/*html*/ `
    <div id="app" class="p-3">
      <div class="d-flex justify-center mt-5" data-props="amount-info-form">
        <div class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
          <form class="mt-5" data-props="amount-form">
            <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.
            </label>
            <div class="d-flex">
              <input type="text" class="w-100 mr-2 pl-2" name="amount-input" data-props="amount-input" placeholder="구입 금액" />
              <button type="submit" data-props="confirm-button" class="open-purchase-modal-button btn btn-cyan">구매</button>
            </div>
          </form>
          <div class="lotto-section hidden"></div>
        </div>
      </div>
      <div class="modal"></div>
    </div>
    `);

export default AppTemplate;
