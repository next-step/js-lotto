import InputPriceFormController from './controllers/input_price_form_controller.js';
import PurchasedLottoController from './controllers/purchase_lotto_controller.js';
import WinningInputFormController from './controllers/winning_input_form_controller.js';
import WinningResultModalController from './controllers/winning_result_modal_controller.js';
import InputPriceFormView from './views/input_price_form_view.js';
import PurchasedLottoView from './views/purchase_lotto_view.js';
import WinningInputFormView from './views/winning_input_form_view.js';
import WinningResultModalView from './views/winning_result_modal_view.js';

class App {
  constructor($target, lotto) {
    new InputPriceFormController(new InputPriceFormView($target), lotto);
    new PurchasedLottoController(new PurchasedLottoView($target), lotto);
    new WinningInputFormController(new WinningInputFormView($target), lotto);
    new WinningResultModalController(
      new WinningResultModalView($target),
      lotto
    );
  }
}

export default App;
