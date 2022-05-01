import { CLASS } from '../const/className.js';
import { buyLotto } from '../service/lotto.js';
import LottoHeader from '../views/lotto/LottoDetailHeader.js';
import LottoList from '../views/lotto/LottoDetailList.js';
import MoneyForm from '../views/lotto/MoneyForm.js';
import { $Curry } from '../dom/index.js';
import WinningForm from '../views/winning/WinningForm.js';
import WinningResultModal from '../views/winning/WinningResultModal.js';
import { getWinningStatistics } from '../service/winning.js';

export default class LottoController {
  #moneyForm;
  #lottoHeader;
  #lottoList;
  #winningForm;
  #winningResultModal;

  #store;

  constructor($app, store) {
    const $ = $Curry($app);

    this.#store = store;

    this.#moneyForm = new MoneyForm($(CLASS.MONEY_FORM)).init().on('@buy', this.buy.bind(this));

    this.#lottoHeader = new LottoHeader($(CLASS.LOTTO_HEADER))
      .init()
      .on('@toggle-numbers', this.toggleNumbers.bind(this));

    this.#lottoList = new LottoList($(CLASS.LOTTO_LIST)).init();

    this.#winningForm = new WinningForm($(CLASS.WINNING_FORM))
      .init()
      .on('@submit-winning-numbers', this.openWinningResultModal.bind(this));

    this.#winningResultModal = new WinningResultModal($Curry()(CLASS.MODAL))
      .init()
      .on('@retry', this.retry.bind(this));

    this.#store.subscribe({
      key: 'lotto',
      handles: [this.#lottoHeader, this.#lottoList, this.#winningForm],
    });
    this.#store.subscribe({
      key: 'winning',
      handles: [this.#winningResultModal],
    });
    this.#store.subscribe({
      key: 'reset',
      handles: [this.#moneyForm, this.#lottoHeader, this.#lottoList, this.#winningForm],
    });
  }

  buy({ detail }) {
    this.#store.state.lotto = buyLotto(detail, this.#store.state.lotto);
  }

  toggleNumbers({ detail }) {
    this.#lottoList.toggleStyle(detail);
  }

  openWinningResultModal({ detail }) {
    const winningStatistics = getWinningStatistics(detail, this.#store.state.lotto.numbers);

    if (!winningStatistics) return;
    this.#store.state.winning = winningStatistics;
  }

  retry() {
    this.#store.state.reset = true;
  }
}
