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

  start() {
    const hadleInputPriceForm = (e) => {
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

    this.#inputPriceFormView.inputPriceForm.addEventListener(
      'submit',
      hadleInputPriceForm
    );

    const handleLottoSwitch = (e) => {
      if (e.target.checked) {
        this.#purchasedLottoView.setLottoIcons(this.#store.lottos, true);
        return;
      }
      this.#purchasedLottoView.setLottoIcons(this.#store.lottos);
    };

    this.#purchasedLottoView.lottoSwitch.addEventListener(
      'click',
      handleLottoSwitch
    );

    const handleInputLottoNums = () => {
      const { winningNumbers, bonusNumber } =
        this.#inputLottoNumsVIew.getWinningAndBonusNumbers();

      this.#store.winningNumbers = winningNumbers;
      this.#store.bonusNumber = bonusNumber;

      try {
        const winningLotto = new WinningLotto(
          new Lotto(this.#store.winningNumbers),
          this.#store.bonusNumber
        );

        const result = this.#lottoMachine.checkWinningLotto(
          this.#store.lottos,
          winningLotto
        );

        this.#store.result = result;

        const purchaseAmount = this.#store.lottos.length * LOTTO_AMOUNT_UNIT;
        const rateOfReturn = calculateRateOfReturn(
          result.TOTAL_WINNING_PRIZE,
          purchaseAmount
        );

        this.#inputLottoNumsVIew.setResultHtml(
          this.#store.result,
          rateOfReturn
        );

        this.#modalView.openModal();
      } catch (error) {
        alert(error.message);
      }
    };

    this.#inputLottoNumsVIew.showResultBtn.addEventListener(
      'click',
      handleInputLottoNums
    );

    this.#modalView.modalClose.addEventListener('click', () => {
      this.#modalView.closeModal();
    });

    this.#modalView.restart.addEventListener('click', () => {
      this.#initialize();
      this.#inputLottoNumsVIew.initialize();
      this.#purchasedLottoView.initialize();
      this.#modalView.closeModal();
    });
  }
}
