import { LOTTO_PRICE, SELECTOR, CLASS, STATE, EVENT as E, EMPTY_STRING } from '../constants/index.js';
import { getProfitRate } from '../../util/index.js';
import { Customer } from '../model/Customer.js';
import { LottoMachine } from '../model/LottoMachine.js';
import { validateInputPrice, validateBonusNumer, validateWinningNumber } from '../validator.js';
import { LottoOutput } from '../view/LottoOutput.js';

export class LottoClerk {
  constructor({ app }) {
    this.budgetForm = app.querySelector(SELECTOR.BUDGET_FORM);
    this.budgetInput = app.querySelector(SELECTOR.BUDGET_INPUT);
    this.budgetButton = app.querySelector(SELECTOR.BUDGET_BUTTON);
    this.budgetError = app.querySelector(SELECTOR.BUDGET_ERROR);
    this.lottoCount = app.querySelector(SELECTOR.LOTTO_COUNT);
    this.lottoList = app.querySelector(SELECTOR.LOTTO_LIST);
    this.lottoToggle = app.querySelector(SELECTOR.LOTTO_TOGGLE);
    this.lottoToggleWrapper = app.querySelector(SELECTOR.LOTTO_TOGGLE_WRAPPER);
    this.lottoSection = app.querySelector(SELECTOR.LOTTO_SECTION);
    this.winningForm = app.querySelector(SELECTOR.WINNING_FORM);
    this.winningButton = app.querySelector(SELECTOR.WINNING_BUTTON);
    this.winningError = app.querySelector(SELECTOR.WINNING_ERROR);
    this.modal = app.querySelector(SELECTOR.MODAL);
    this.modalBody = app.querySelector(SELECTOR.MODAL_BODY);
    this.modalCloseButton = app.querySelector(SELECTOR.MODAL_CLOSE);
    this.retryButton = app.querySelector(SELECTOR.RETRY_BUTTON);
    this.output = LottoOutput;
    this.initState();
    this.initRender();
    this.bindEvent();
  }

  initState = () => {
    this.budget = 0;
    this.lottos = [];
    this.lottoPrice = LOTTO_PRICE;
    this.winningNumber = Array.from({ length: 6 });
    this.lottoCount = 0;
    this.lottoCycle = STATE.FALSE;
    delete this.machine;
    delete this.customer;
  };

  initRender = () => {
    this.winningForm.querySelectorAll(E.INPUT).forEach((input) => (input.value = EMPTY_STRING));
    this.winningForm.classList.add(CLASS.HIDDEN);
    this.lottoToggleWrapper.classList.add(CLASS.HIDDEN);
    this.lottoSection.classList.add(CLASS.HIDDEN);
    this.lottoList.classList.remove(CLASS.FLEX_COL);
    this.lottoToggle.checked = STATE.FALSE;
    this.budgetInput.disabled = STATE.FALSE;
    this.budgetButton.disabled = STATE.FALSE;
    this.budgetButton.disabled = STATE.TRUE;
    this.lottoList.innerHTML = EMPTY_STRING;
    this.budgetInput.value = EMPTY_STRING;
  };

  bindEvent() {
    this.budgetForm.addEventListener(E.SUBMIT, this.onPurchaseLotto);

    this.winningForm.addEventListener(E.SUBMIT, this.onSubmitWinningNumber);

    this.winningForm.querySelectorAll(E.INPUT).forEach((input, index) => {
      input.addEventListener(E.INPUT, (event) => {
        index === 6
          ? (this.bonusNumber = Number(event.target.value))
          : (this.winningNumber[index] = Number(event.target.value));
      });
    });

    this.budgetInput.addEventListener(E.INPUT, this.onChangeBudget);

    this.budgetButton.addEventListener(E.CLICK, this.onPurchaseLotto);
    
    this.retryButton.addEventListener(E.CLICK, this.onRetryLotto);
    
    this.modalCloseButton.addEventListener(E.CLICK, this.onCloseModal);

    this.lottoToggle.addEventListener(E.CHANGE, this.onToggleLotto);
  }

  askCheckoutResult = () => {
    const totalCounts = this.machine.lottos.map((lotto) => this.#countWinningNumber(lotto));
    totalCounts.forEach((count) => this.customer.countResult(count));
    this.showResultToCustomer();
  };

  showResultToCustomer() {
    if (!this.lottoCycle) {
      const profitRate = getProfitRate(this.customer.money, this.customer.amount);
      this.modalBody.innerHTML = this.output.LOTTO_RESULT(this.customer.results, profitRate);
    }
    this.modal.classList.add(CLASS.OPEN);
  }

  #countWinningNumber(lotto) {
    const winningCount = this.winningNumber.filter((number) => lotto.includes(number));
    const bonusCount = lotto.includes(this.bonusNumber);

    if (bonusCount) {
      return winningCount.length === 4 ? 6 : winningCount.length === 5 ? 7 : winningCount.length;
    }
    return winningCount.length === 6 ? 7 : winningCount.length;
  }

  onPurchaseLotto = (event) => {
    event.preventDefault();

    this.machine = new LottoMachine(app, Math.floor(this.budget / this.lottoPrice));
    this.customer = new Customer(this.budget);
    this.winningForm.classList.remove(CLASS.HIDDEN);
    this.budgetInput.disabled = STATE.TRUE;
    this.budgetButton.disabled = STATE.TRUE;
  };

  onSubmitWinningNumber = (event) => {
    event.preventDefault();
    try {
      validateWinningNumber(this.winningNumber);
      validateBonusNumer(this.winningNumber, this.bonusNumber);
      this.winningError.innerHTML = EMPTY_STRING;
      this.askCheckoutResult();
    } catch (error) {
      this.winningError.innerHTML = error.message;
    }
  };

  onChangeBudget = (event) => {
    try {
      validateInputPrice(event.target.value);
      this.budgetError.innerHTML = EMPTY_STRING;
      this.budgetButton.disabled = STATE.FALSE;
    } catch (error) {
      this.budgetError.innerHTML = error.message;
      this.budgetButton.disabled = STATE.TRUE;
    } finally {
      this.budget = Math.round(event.target.value / LOTTO_PRICE) * LOTTO_PRICE;
      this.lottoCount = this.budget / this.lottoPrice;
    }
  };

  onToggleLotto = (event) => {
    const { target } = event;
    this.icons = document.querySelectorAll(SELECTOR.LOTTO_TICKET);

    const addClass = target.checked;
    this.lottoList.classList.toggle(CLASS.FLEX_COL, addClass);
    this.icons.forEach((child) => child.classList.toggle(CLASS.HIDDEN, !addClass));
  };

  onRetryLotto = () => {
    this.modal.classList.remove(CLASS.OPEN);
    this.initState();
    this.initRender();
  };

  onCloseModal = () => {
    this.modal.classList.remove(CLASS.OPEN);
    this.lottoCycle = STATE.TRUE;
  };
}
