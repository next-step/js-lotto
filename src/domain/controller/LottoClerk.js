import { EVENT as E, LOTTO_PRICE, SELECTOR } from '../constants/index.js';
import { Customer } from '../model/Customer.js';
import { Machine } from '../model/Machine.js';
import { validateBonusNumer, validateInputPrice, validateWinningNumber } from '../validator.js';
import { LottoOutput } from '../view/LottoOutput.js';

export class LottoClerk {
  constructor({ app }) {
    this.app = app;
    this.initState();
    this.bindEvent();
    this.output = new LottoOutput({ app });
  }

  initState = () => {
    this.budget = 0;
    this.lottos = [];
    this.winningNumber = Array.from({ length: 6 });
    this.bonusNumber = null;

    this.customer = new Customer();
    this.machine = new Machine();
  }

  bindEvent = () => {
    this.app.addEventListener(E.CLICK, (event) => this.onClick(event));
    this.app.addEventListener(E.SUBMIT, (event) => this.onSubmit(event));
    this.app.addEventListener(E.INPUT, (event) => this.onInput(event));
    this.app.addEventListener(E.CHANGE, (event) => this.onChange(event));
  }

  extractDataFromEvent = (event) => {
    const {
      value: VALUE,
      dataset: { testId, index },
    } = event.target;

    if (testId === undefined) return {
      ID: undefined,
      INDEX : undefined,
      VALUE : undefined
    };

    const ID = testId.toUpperCase();
    const INDEX = index === undefined ? undefined : Number(index);

    return {
      ID,
      INDEX,
      VALUE,
    };
  };

  onClick = (event) => {
    const { ID } = this.extractDataFromEvent(event);

    if (ID === undefined) return;

    switch (SELECTOR[ID]) {
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
        this.output.toggleModal();
        break;
      default:
        break;
    }
  };

  onSubmit = (event) => {
    const { ID } = this.extractDataFromEvent(event);
    if (ID === undefined) return;

    switch (SELECTOR[ID]) {
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

  onInput = (event) => {
    const { ID } = this.extractDataFromEvent(event);
    if (ID === undefined) return;

    switch (SELECTOR[ID]) {
      case SELECTOR.BUDGET_INPUT:
        this.onChangeBudget(event);
        break;
      case SELECTOR.WINNING_INPUT:
        this.onChangeWinningNumber(event);
        break;
      default:
        break;
    }
  }

  onChange = (event) => {
    const { ID } = this.extractDataFromEvent(event);

    if (ID === undefined) return;
    switch (SELECTOR[ID]) {
      case SELECTOR.LOTTO_TOGGLE:
        this.output.toggleLotto(event.target.checked);
        break;
      default:
        break;
    }
  }

  onPurchaseLotto = (event) => {
    event.preventDefault();

    this.machine.insertMoney(this.budget);
    this.output.showLottos(this.machine.lottos);
  };

  onSubmitWinningNumber = (event) => {
    event.preventDefault();
    this.customer.calculateResults(this.machine.lottos, this.winningNumber, this.bonusNumber);
    this.output.showResultModal(this.customer.results, this.customer.getProfit());
    this.output.winningForm.replaceEvent(E.SUBMIT, this.onSubmitWinningNumber, (event) => {
      event.preventDefault();
      this.output.toggleModal(true);
    });
  };

  onChangeBudget = (event) => {
    const { VALUE, ID } = this.extractDataFromEvent(event);

    try {
      validateInputPrice(VALUE);
      this.output.showErrorMessage(ID, '');
    } catch (error) {
      this.output.showErrorMessage(ID, error.message);
    } finally {
      this.budget = Math.floor(VALUE / LOTTO_PRICE) * LOTTO_PRICE;
      this.customer.money = Math.floor(VALUE / LOTTO_PRICE) * LOTTO_PRICE;
      this.lottoCount = this.budget / this.lottoPrice;
    }
  };

  onChangeWinningNumber = (event) => {
    const { VALUE, INDEX, ID } = this.extractDataFromEvent(event);

    INDEX === 6 ? (this.bonusNumber = Number(VALUE)) : (this.winningNumber[INDEX] = Number(VALUE));

    const isValid = this.winningNumber.every((num) => !isNaN(num)) && this.bonusNumber;

    if (!isValid) return;

    try {
      validateWinningNumber(this.winningNumber);
      validateBonusNumer(this.winningNumber, this.bonusNumber);
      this.output.showErrorMessage(ID, '');
    } catch (error) {
      this.output.showErrorMessage(ID, error.message);
    }
  };

  onRetryLotto = () => {
    this.output.toggleModal();
    this.initState();
    this.output = new LottoOutput({ app });
  };
}
