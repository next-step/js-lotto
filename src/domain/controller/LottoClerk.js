import { EVENT as E, LOTTO_PRICE, SELECTOR } from '../constants/index.js';
import { Clerk } from '../model/Clerk.js';
import { Customer } from '../model/Customer.js';
import { Machine } from '../model/Machine.js';
import { validateBonusNumer, validateInputPrice, validateWinningNumber } from '../validator.js';
import { LottoOutput } from '../view/LottoOutput.js';

export class LottoClerk {
  constructor({ app }) {
    this.app = app
    this.output = new LottoOutput({ app });
    this.initState();
    this.bindEvent();
  }

  initState() {
    this.clerk = Clerk;
    this.customer = new Customer();
    this.machine = new Machine();
  }

  bindEvent() {
    this.app.addEventListener(E.CLICK, this.onClick.bind(this));
    this.app.addEventListener(E.SUBMIT, this.onSubmit.bind(this));
    this.app.addEventListener(E.INPUT, this.onInput.bind(this));
    this.app.addEventListener(E.CHANGE, this.onChange.bind(this));
  }
  
  onClick(event) {
    let select;
    select = event.target.dataset.testId;
  
    if (event.target.tagName === 'svg' || event.target.tagName === 'path') {
      select = event.target.parentNode.dataset.testId;
    }
  
    if (select === undefined) return;
  
    switch (SELECTOR[select.toUpperCase()]) {
      case SELECTOR.BUDGET_BUTTON:
        this.onPurchaseLotto(event);
        break;
      case SELECTOR.WINNING_BUTTON:
        this.onSubmitWinningNumber(event);
        break;
      case SELECTOR.RETRY_BUTTON:
        this.onRetryLotto();
        break;
      case SELECTOR.MODAL_CLOSE:
        this.output.closeModal();
        break;
      default:
        break;
    }
  }
  
  onSubmit(event) {
    const select = event.target.dataset.testId;
    if (select === undefined) return;
  
    switch (SELECTOR[select.toUpperCase()]) {
      case SELECTOR.BUDGET_FORM:
        this.onPurchaseLotto(event);
        break;
      case SELECTOR.WINNING_FORM:
        this.onSubmitWinningNumber(event);
        break;
      default:
        break;
    }
  }
  
  onInput(event) {
    const { testId, index } = event.target.dataset;
    if (testId === undefined) return;
    
    switch (SELECTOR[testId.toUpperCase()]) {
      case SELECTOR.BUDGET_INPUT:
        this.onChangeBudget(event.target);
        break;
      case SELECTOR.WINNING_INPUT:
        this.onChangeWinningNumber(event.target, Number(index));
        break;
      default:
        break;
    }
  }
  
  onChange(event) {
    const select = event.target.dataset.testId;
    if (select === undefined) return;
    switch (SELECTOR[select.toUpperCase()]) {
      case SELECTOR.LOTTO_TOGGLE:
        this.output.toggleLotto(event.target.checked);
        break;
      default:
        break;
    }
  }

  onPurchaseLotto = (event) => {
    event.preventDefault();
    
    this.machine.insertMoney(this.clerk.budget);
    this.output.showLottos(this.machine.lottos);
  }


  onSubmitWinningNumber = (event) => {
    event.preventDefault();
    this.customer.calculateResults(
      this.machine.lottos,
      this.clerk.winningNumber,
      this.clerk.bonusNumber  
    )
    this.output.showResultModal(this.customer.results, this.customer.getProfit())
    this.output.winningForm.removeEventListener(E.SUBMIT, this.onSubmitWinningNumber);
    this.output.winningForm.addEventListener(E.SUBMIT, (event) => {
      event.preventDefault();
      this.output.openModal();
    });
  };

  onChangeBudget = (target) => {
    const { value, dataset : {testId} } = target;
    try {
      validateInputPrice(value);
      this.output.showErrorMessage(testId, '');
    } catch (error) {
      this.output.showErrorMessage(testId, error.message);
    } finally {
      this.clerk.budget = Math.floor(value / LOTTO_PRICE) * LOTTO_PRICE;
      this.customer.money = Math.floor(value / LOTTO_PRICE) * LOTTO_PRICE;
      this.clerk.lottoCount = this.budget / this.lottoPrice;
    }
  };

  onChangeWinningNumber = (target, index) => {
    const { value, dataset : {testId} } = target;
    index === 6
    ? (this.clerk.bonusNumber = Number(value))
    : (this.clerk.winningNumber[index] = Number(value));

    const isValid = this.clerk.winningNumber.every((num) => !isNaN(num)) && this.clerk.bonusNumber;
    if (!isValid) return;
    
    try {
      validateWinningNumber(this.clerk.winningNumber);
      validateBonusNumer(this.clerk.winningNumber, this.clerk.bonusNumber);
      this.output.showErrorMessage(testId, '');
    } catch (error) {
      this.output.showErrorMessage(testId, error.message);
    }
  }

  onRetryLotto = () => {
    this.output.closeModal();
    this.output = new LottoOutput({ app });
    this.initState();
    this.bindEvent();
  };

}
