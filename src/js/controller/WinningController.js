import { CLASS } from '../const/className.js';
import { $Curry } from '../dom/index.js';
import WinningForm from '../views/winning/WinningForm.js';
import Controller from './Controller.js';

class WinningController extends Controller {
  static winningForm;
  constructor(...props) {
    super(...props);
  }
  initializeComponents($app) {
    const $ = $Curry($app);
    WinningController.winningForm = WinningForm($(CLASS.WINNING_FORM)).init();
  }

  initializeState() {
    this.store.subscribe('lotto', WinningController.winningForm);
  }
}

export default (...props) => new WinningController(...props);
