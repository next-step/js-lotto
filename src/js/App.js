import SETTINGS from './settings.js';
import { $ } from './utils.js';

import {
  PriceForm,
  PurchaseDetails,
  WinningForm,
  WinningResult,
} from './component/index.js';

const App = (({ ID }) => {
  return $el => {
    const render = $el => {
      $el.innerHTML = `
        <div class="d-flex justify-center mt-5">
          <div class="w-100">
            <h1 class="text-center">🎱 행운의 로또</h1>
            <form id="${ID.PRICE_FORM}" class="mt-5"></form>
            <section id="${ID.PURCHASE_DETAILS}" class="mt-9"></section>
            <form id="${ID.WINNING_FORM}" class="mt-9"></form>
          </div>
        </div>

        <div class="modal">
          <div class="modal-inner p-10">
            <div class="modal-close">
              <svg viewbox="0 0 40 40">
                <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
              </svg>
            </div>
            <div id="${ID.WINNING_RESULT}"></div>
          </div>
        </div>
      `;

      PriceForm($.id(ID.PRICE_FORM, $el));
      PurchaseDetails($.id(ID.PURCHASE_DETAILS, $el));
      WinningForm($.id(ID.WINNING_FORM, $el));
      WinningResult($.id(ID.WINNING_RESULT, $el));
    };

    render($el);
  };
})(SETTINGS);

export default App;
