import { LOTTO_AMOUNT_UNIT } from '../constants/lotto';
import { Lotto } from '../domain/Lotto';
import { LottoMachine } from '../domain/LottoMachine';
import { LottoNumberGenerator } from '../domain/LottoNumberGenerator';
import { WinningLotto } from '../domain/WinningLotto';
import { calculateRateOfReturn } from '../utils/number';
import { InputPriceFormView } from './InputPriceFormView';
import { PurchasedLottoView } from './PurchasedLottoView';
import { InputLottoNumsView } from './inputLottoNumsView';
import { ModalView } from './modalView';

export class LottoController {
  #lottoMachine;
  #inputPriceFormView;
  #purchasedLottoView;
  #inputLottoNumsVIew;
  #modalView;
  #store;

  constructor() {
    this.#initialize();
  }

  #initialize() {
    this.#lottoMachine = new LottoMachine(LottoNumberGenerator);
    this.#inputPriceFormView = new InputPriceFormView();
    this.#purchasedLottoView = new PurchasedLottoView();
    this.#inputLottoNumsVIew = new InputLottoNumsView();
    this.#modalView = new ModalView();
    this.#store = {
      lottos: [],
    };
  }

  hadleSubmitInputPriceForm = (e) => {
    e.preventDefault();

    const purchaseAmount = this.#inputPriceFormView.getPurchaseAmount();

    try {
      const lottos = this.#lottoMachine.issueLotto(purchaseAmount);

      this.#store.lottos = lottos;

      this.#purchasedLottoView.setTotalPurchased(this.#store.lottos.length);

      this.#purchasedLottoView.setLottoIcons(this.#store.lottos);

      this.#purchasedLottoView.showPurchasedLottos();

      this.#inputLottoNumsVIew.showInputLottoNums();
    } catch (error) {
      alert(error.message);
    }
  };

  handleClickLottoNumbersToggleBtn = (e) => {
    this.#purchasedLottoView.setLottoIcons(
      this.#store.lottos,
      e.target.checked
    );
  };

  handleClickLottoResult = () => {
    try {
      const result = this.getLottoResult(this.#store.lottos);

      const rateOfReturn = this.getRateOfReturn(result, this.#store.lottos);

      this.showResult(result, rateOfReturn);
    } catch (error) {
      alert(error.message);
    }
  };

  handleClickRestart = () => {
    this.#initialize();
    this.#inputLottoNumsVIew.initialize();
    this.#purchasedLottoView.initialize();
    this.#modalView.closeModal();
  };

  getLottoResult(lottos) {
    const { winningNumbers, bonusNumber } =
      this.#inputLottoNumsVIew.getWinningAndBonusNumbers();

    const winningLotto = new WinningLotto(
      new Lotto(winningNumbers),
      bonusNumber
    );

    return this.#lottoMachine.checkWinningLotto(lottos, winningLotto);
  }

  getRateOfReturn(result, lottos) {
    return calculateRateOfReturn(
      result.TOTAL_WINNING_PRIZE,
      lottos.length * LOTTO_AMOUNT_UNIT
    );
  }

  showResult(result, rateOfReturn) {
    this.#inputLottoNumsVIew.setResultHtml(result, rateOfReturn);
    this.#modalView.openModal();
  }

  start() {
    this.#inputPriceFormView.inputPriceForm.addEventListener(
      'submit',
      this.hadleSubmitInputPriceForm
    );

    this.#purchasedLottoView.lottoNumbersToggleBtn.addEventListener(
      'click',
      this.handleClickLottoNumbersToggleBtn
    );

    this.#inputLottoNumsVIew.showResultBtn.addEventListener(
      'click',
      this.handleClickLottoResult
    );

    this.#modalView.modalClose.addEventListener('click', () =>
      this.#modalView.closeModal()
    );

    this.#modalView.restart.addEventListener('click', this.handleClickRestart);
  }
}
