import { EVENT as E, LOTTO_PRICE } from '../constants/index.js';
import { Clerk } from '../model/Clerk.js';
import { Customer } from '../model/Customer.js';
import { Machine } from '../model/Machine.js';
import { validateBonusNumer, validateInputPrice, validateWinningNumber } from '../validator.js';
import { LottoOutput } from '../view/LottoOutput.js';

export class LottoClerk {
  constructor({ app }) {
    this.output = new LottoOutput({ app });
    this.initState();
    this.bindEvent();
  }


  initState() {
    this.clerk = new Clerk();
    this.customer = new Customer();
    this.machine = new Machine();
  }

  bindEvent() {
    this.output.budgetForm.addEventListener(E.SUBMIT, this.onPurchaseLotto);
    this.output.winningForm.addEventListener(E.SUBMIT, this.onSubmitWinningNumber);
    this.output.winningForm.querySelectorAll(E.INPUT).forEach((input, index) => {
      input.addEventListener(E.INPUT, (event) => this.onChangeWinningNumber(event, index));
    });
    this.output.budgetInput.addEventListener(E.INPUT, this.onChangeBudget);
    this.output.budgetButton.addEventListener(E.CLICK, this.onPurchaseLotto);
    this.output.retryButton.addEventListener(E.CLICK, this.onRetryLotto);
    this.output.modalCloseButton.addEventListener(E.CLICK, () => this.output.closeModal());
    this.output.lottoToggle.addEventListener(E.CHANGE, (e) => this.output.toggleLotto(e.target.checked));
  }

  onPurchaseLotto = (event) => {
    event.preventDefault();
    
    this.machine.insertMoney(this.clerk.budget);
    this.output.showLottos(this.machine.lottos);
  }


  onCalculateResult = () => {
    const result = this.machine.lottos.map((lotto) => this.clerk.countWinningNumber(lotto));
    result.forEach((count) => this.customer.countResult(count));
  };



  onSubmitWinningNumber = (event) => {
    event.preventDefault();
    this.onCalculateResult();
    this.output.showResultModal(this.customer.results, this.customer.getProfit())
    this.output.winningForm.removeEventListener(E.SUBMIT, this.onSubmitWinningNumber);
    this.output.winningForm.addEventListener(E.SUBMIT, (event) => {
      event.preventDefault();
      this.output.openModal();
    });
  };

  onChangeBudget = (event) => {
    const { value, dataset : {testId} } = event.target;
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

  onChangeWinningNumber = (event, index) => {
    const { value, dataset : {testId} } = event.target;
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
