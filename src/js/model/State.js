import PriceModel from './PriceModel.js';
import LottoModel from './LottoModel.js';

import { LOTTO_PURCHASE_UNIT } from '../constants/unit.js';
import {
  LOTTO_SECTION,
  LOTTO_FORM,
  PRICE_FORM__INPUT,
  LOTTO_MODAL,
  LOTTO_FORM__WINNING_NUMBER,
  LOTTO_MODAL_BENEFIT_RATE,
  LOTTO_MODAL_WINNING_RESULT,
  LOTTO_FORM__BONUS_NUMBER,
  LOTTO_SECTION_TICKETS,
} from '../constants/selectTarget.js';
import { $, $$ } from '../util/dom.js';

import { PRIZE_TYPES } from '../constants/prize.js';

export default class State {
  #priceModel;
  #lottoModel;

  constructor() {
    this.#priceModel = new PriceModel();
  }

  initLotto = () => {
    this.#priceModel.initPrice();
    this.#lottoModel = undefined;
    $(LOTTO_SECTION).hidden = true;
    $(LOTTO_FORM).hidden = true;
    $(LOTTO_MODAL).classList.toggle('open');
    $$(LOTTO_FORM__WINNING_NUMBER).forEach(($el) => {
      $el.value = '';
    });
    $(LOTTO_FORM__BONUS_NUMBER).value = '';
  };

  calculateAndDisplayWinningResult = (e) => {
    e.preventDefault();

    try {
      const winningNumbers = [];
      let bonusNumber = 0;

      $$(LOTTO_FORM__WINNING_NUMBER).forEach(($el) => {
        winningNumbers.push($el.value);
      });

      LottoModel.validators.isDuplicatedWinningNumber(winningNumbers);
      bonusNumber = $(LOTTO_FORM__BONUS_NUMBER).value;
      this.#lottoModel.calculateWinningResult({ winningNumbers, bonusNumber });
      this.displayWinningResultModal();
    } catch (err) {
      alert(err.message);
    }
  };

  displayWinningResultModal = () => {
    const prizeKeys = Object.keys(PRIZE_TYPES);

    $$(LOTTO_MODAL_WINNING_RESULT).forEach(($el, i) => {
      $el.lastElementChild.textContent = `${this.lottoModel.getWinningQuantityByRank(prizeKeys[i])}개`;
    });
    $(LOTTO_MODAL).classList.toggle('open');
    $(LOTTO_MODAL_BENEFIT_RATE).textContent = `${this.lottoBenefitRate}%`;
  };

  purchaseLotto = (e) => {
    e.preventDefault();

    try {
      const inputPrice = Number($(PRICE_FORM__INPUT).value);

      PriceModel.validators.isValidPrice(inputPrice);
      this.#priceModel.updatePrice(inputPrice);
      this.generateLotto(inputPrice);
    } catch (err) {
      alert(err.message);
    }
  };

  toggleDisplayLottoNumbers = () => {
    $(LOTTO_SECTION_TICKETS).classList.toggle('hidden');
  };

  closeWinningResultModal = (e) => {
    e.preventDefault();
    $(LOTTO_MODAL).classList.toggle('open');
  };

  generateLotto(price) {
    try {
      const quantity = price / LOTTO_PURCHASE_UNIT;
      const totalQuantity = this.#lottoModel?.quantity + quantity;
      LottoModel.validators.isValidQuantity(totalQuantity);

      if (this.#lottoModel) {
        this.#lottoModel.addLotto(quantity);
        return;
      }

      this.#lottoModel = new LottoModel(quantity);
    } catch (e) {
      alert(e.message);
    }
  }

  get priceModel() {
    return this.#priceModel;
  }

  get lottoModel() {
    return this.#lottoModel;
  }

  get lottoBenefitRate() {
    return this.lottoModel.lottoBenefit / this.priceModel.totalPurchasePrice;
  }
}
