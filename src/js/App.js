import SETTINGS from './settings.js';
import { $, log } from './utils.js';

import {
  PriceForm,
  PurchaseDetails,
  WinningForm,
  WinningResult,
  Modal,
} from './component/index.js';

const App = (({ ID, KLASS }) => {
  return $el => {
    const state = { isOpen: true };

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

        <div id="${ID.WINNING_RESULT}" class="${KLASS.MODAL}"></div>
      `;

      PriceForm($.id(ID.PRICE_FORM, $el));
      PurchaseDetails($.id(ID.PURCHASE_DETAILS, $el));
      WinningForm($.id(ID.WINNING_FORM, $el));
      Modal(
        $.id(ID.WINNING_RESULT, $el),
        state.isOpen,
        _ => log('clicked'),
        WinningResult,
      );
    };

    render($el);
  };
})(SETTINGS);

export default App;
