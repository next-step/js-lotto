import SETTINGS from './settings.js';
import { $ } from './lib/utils.js';

import {
  PriceForm,
  PurchaseDetails,
  WinningForm,
  WinningResult,
  Modal,
} from './component/index.js';
import { getState, actionCreator } from './store.js';

const App = (({ ID, KLASS }) => {
  return $el => {
    const { lottos, isModalOpen } = getState();

    const render = $el => {
      $el.innerHTML = `
        <h1 class="text-center">🎱 행운의 로또</h1>
        <div class="d-flex justify-center mt-5">
          <div class="w-100">
            <form id="${ID.PRICE_FORM}" class="mt-5"></form>
            <section id="${ID.PURCHASE_DETAILS}" class="mt-9"></section>
            <form id="${ID.WINNING_FORM}" class="mt-9"></form>
          </div>
        </div>

        <div id="${ID.WINNING_RESULT}" class="${KLASS.MODAL}"></div>
      `;

      PriceForm($.id(ID.PRICE_FORM, $el));

      if (lottos.length) {
        PurchaseDetails($.id(ID.PURCHASE_DETAILS, $el));
        WinningForm($.id(ID.WINNING_FORM, $el));
        Modal(
          $.id(ID.WINNING_RESULT, $el),
          isModalOpen,
          actionCreator.toggleModal,
          WinningResult,
        );
      }
    };

    render($el);
  };
})(SETTINGS);

export default App;
