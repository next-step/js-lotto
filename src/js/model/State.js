import PriceModel from './PriceModel.js';
import LottoModel from './LottoModel.js';
import { PRIZE_TYPES } from '../constants/prize.js';
import { LOTTO_PURCHASE_UNIT } from '../constants/unit.js';
import {
  LOTTO_SECTION,
  LOTTO_FORM,
  PRICE_FORM__INPUT,
  LOTTO_MODAL,
  LOTTO_MODAL_TBODY,
  LOTTO_FORM__WINNING_NUMBER,
  LOTTO_MODAL_BENEFIT_RATE,
  LOTTO_MODAL_WINNING_RESULT,
  LOTTO_FORM__BONUS_NUMBER,
  LOTTO_SECTION_TICKETS,
} from '../constants/selectTarget.js';
import { $, $$ } from '../util/dom.js';

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
    $(LOTTO_FORM).reset();
  };

  purchaseLotto = (e) => {
    e.preventDefault();
    try {
      const inputPrice = Number($(PRICE_FORM__INPUT).value);
      PriceModel.validators.isValidPrice(inputPrice);
      this.#priceModel.updatePrice(inputPrice);
      this.#generateLotto(inputPrice);
    } catch (err) {
      alert(err.message);
    }
  };

  toggleDisplayLottoNumbers = () => {
    $(LOTTO_SECTION_TICKETS).classList.toggle('hidden');
  };

  calculateAndDisplayWinningResult = (e) => {
    e.preventDefault();
    try {
      const inputWinningNumbers = this.#getWinningNumbers();
      LottoModel.validators.isDuplicatedWinningNumber(inputWinningNumbers.winningNumbers);
      this.#lottoModel.calculateWinningResult(inputWinningNumbers);
      this.#displayWinningResultModal();
    } catch (err) {
      alert(err.message);
    }
  };

  closeWinningResultModal = (e) => {
    e.preventDefault();
    $(LOTTO_MODAL).classList.toggle('open');
  };

  #getWinningNumbers = () => {
    const inputWinningNumbers = {
      winningNumbers: [],
      bonusNumber: '',
    };

    $$(LOTTO_FORM__WINNING_NUMBER).forEach(($el) => {
      inputWinningNumbers.winningNumbers.push($el.value);
    });
    inputWinningNumbers.bonusNumber = $(LOTTO_FORM__BONUS_NUMBER).value;
    return inputWinningNumbers;
  };

  #displayWinningResultModal = () => {
    const trTemplate = Object.entries(PRIZE_TYPES)
      .map(
        ([prizeKey, prize]) =>
          `<tr class="text-center ${LOTTO_MODAL_WINNING_RESULT}">
                  <td class="p-3">${prize.text}</td>
                  <td class="p-3">${prize.cost.toLocaleString()}</td>
                  <td class="p-3">${this.#lottoModel.getWinningQuantityByRank(prizeKey)}개</td>
                </tr>`
      )
      .join('');

    $(LOTTO_MODAL).classList.toggle('open');
    $(LOTTO_MODAL_TBODY, $(LOTTO_MODAL)).innerHTML = '';
    $(LOTTO_MODAL_TBODY, $(LOTTO_MODAL)).insertAdjacentHTML('afterbegin', trTemplate);
    $(LOTTO_MODAL_BENEFIT_RATE).textContent = `당신의 총 수익률은 ${this.lottoBenefitRate}%입니다.`;
  };

  #generateLotto(price) {
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

  get lottoNetBenefit() {
    return this.#lottoModel.lottoBenefit - this.#priceModel.totalPurchasePrice;
  }

  get lottoBenefitRate() {
    return (this.lottoNetBenefit / this.#priceModel.totalPurchasePrice) * 100;
  }
}
