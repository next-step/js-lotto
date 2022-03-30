import { CLASS } from '../const/className.js';
import { buy } from '../service/lotto.js';
import LottoHeader from '../views/lotto/LottoDetailHeader.js';
import LottoList from '../views/lotto/LottoDetailList.js';
import MoneyForm from '../views/lotto/MoneyForm.js';
import { $Curry } from '../dom/index.js';
import Controller from './Controller.js';
import WinningForm from '../views/winning/WinningForm.js';
import WinningResultModal from '../views/winning/WinningResultModal.js';
import { getWinningStatistics } from '../service/winning.js';

class LottoController extends Controller {
  static moneyForm;
  static lottoHeader;
  static lottoList;
  static winningForm;
  static winningResultModal;

  constructor(...props) {
    super(...props);
  }

  initializeComponents($app) {
    const $ = $Curry($app);

    LottoController.moneyForm = MoneyForm($(CLASS.MONEY_FORM))
      .init()
      .on('@buy', this.buy.bind(this));

    LottoController.lottoHeader = LottoHeader($(CLASS.LOTTO_HEADER))
      .init()
      .on('@toggle-numbers', this.toggleNumbers.bind(this));

    LottoController.lottoList = LottoList($(CLASS.LOTTO_LIST)).init();

    LottoController.winningForm = WinningForm($(CLASS.WINNING_FORM))
      .init()
      .on('@submit-winning-numbers', this.openWinningResultModal.bind(this));

    LottoController.winningResultModal = WinningResultModal($Curry()(CLASS.MODAL))
      .init()
      .on('@retry', this.retry.bind(this));
  }

  initializeState() {
    this.store.subscribe('lotto', LottoController.lottoHeader);
    this.store.subscribe('lotto', LottoController.lottoList);
    this.store.subscribe('lotto', LottoController.winningForm);
    this.store.subscribe('winning', LottoController.winningResultModal);

    this.store.subscribe('reset', LottoController.moneyForm);
    this.store.subscribe('reset', LottoController.lottoHeader);
    this.store.subscribe('reset', LottoController.lottoList);
    this.store.subscribe('reset', LottoController.winningForm);
  }

  buy({ detail }) {
    this.store.state.lotto = buy(detail, this.store.state.lotto);
  }

  toggleNumbers({ detail }) {
    LottoController.lottoList.toggleStyle(detail);
  }

  openWinningResultModal({ detail }) {
    const winningStatistics = getWinningStatistics(detail, this.store.state.lotto.numbers);

    if (!winningStatistics) return;
    this.store.state.winning = winningStatistics;
  }

  retry() {
    this.store.state.reset = true;
  }
}

export default (...props) => new LottoController(...props);
