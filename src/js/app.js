import InputPriceFormController from './controllers/input_price_form_controller.js';
import PurchasedLottoController from './controllers/purchase_lotto_controller.js';
import WinningInputFormController from './controllers/winning_input_form_controller.js';
import InputPriceFormView from './views/input_price_form_view.js';

class App {
  constructor($target, lotto) {
    new InputPriceFormController(new InputPriceFormView($target), lotto);
    // new PurchasedLotto($target, lotto);
    // new WinningInputForm($target, lotto);
  }
}

export default App;
