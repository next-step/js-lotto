import { LOTTO_PRICE, SELECTOR } from '../constants/index.js';
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
    this.lottoCycle = false;
    delete this.machine;
    delete this.customer;
  };
  
  initRender = () => {
    this.winningForm.querySelectorAll('input')
    .forEach((input) => (input.value = ''));
    this.winningForm.classList.add('hidden');
    this.lottoToggleWrapper.classList.add('hidden');
    this.lottoSection.classList.add('hidden');
    this.lottoList.classList.remove('flex-col');
    this.lottoToggle.checked = false;
    this.budgetInput.disabled = false;
    this.budgetButton.disabled = false;
    this.budgetButton.disabled = true;
    this.lottoList.innerHTML = '';
    this.budgetInput.value = '';
  };

  bindEvent() {
    this.budgetForm.addEventListener('submit', this.enterLottoStore);

    this.winningForm.addEventListener('submit', (event) => {
      event.preventDefault();
      try {
        validateWinningNumber(this.winningNumber);
        validateBonusNumer(this.winningNumber, this.bonusNumber);
        this.winningError.innerHTML = '';
        this.checkoutLotto();
      } catch (error) {
        this.winningError.innerHTML = error.message;
      }
    });

    this.winningForm.querySelectorAll('input').forEach((input, index) => {
      input.addEventListener('input', (event) => {
        index === 6
          ? (this.bonusNumber = Number(event.target.value))
          : (this.winningNumber[index] = Number(event.target.value));
      });
    });

    this.budgetInput.addEventListener('input', (event) => {
      try {
        validateInputPrice(event.target.value);
        this.budgetError.innerHTML = '';
        this.budgetButton.disabled = false;
      } catch (error) {
        this.budgetError.innerHTML = error.message;
        this.budgetButton.disabled = true;
      } finally {
        this.budget = Math.round(event.target.value / 1000) * 1000;
        this.lottoCount = this.budget / this.lottoPrice;
      }
    });

    this.budgetButton.addEventListener('click', this.enterLottoStore);

    this.lottoToggle.addEventListener('change', this.toggleLotto);

    this.retryButton.addEventListener('click', this.retryLotto);

    this.modalCloseButton.addEventListener('click', this.closeModal);
  }

  enterLottoStore = (event) => {
    event.preventDefault();

    this.machine = new LottoMachine(app, Math.floor(this.budget / this.lottoPrice));
    this.customer = new Customer(this.budget);

    this.winningForm.classList.remove('hidden');
    this.budgetInput.disabled = true;
    this.budgetButton.disabled = true;
  };

  toggleLotto = (event) => {
    const { target } = event;
    this.icons = document.querySelectorAll(SELECTOR.LOTTO_TICKET);

    const addClass = target.checked;
    this.lottoList.classList.toggle('flex-col', addClass);
    this.icons.forEach((child) => child.classList.toggle('hidden', !addClass));
  };

  checkoutLotto = () => {
    const totalCounts = this.machine.lottos.map((lotto) => this.#countWinningNumber(lotto));
    totalCounts.forEach((count) => this.customer.countResult(count));
    this.announceResult();
  };

  announceResult() {
    if (!this.lottoCycle) {
      const profitRate = getProfitRate(this.customer.money, this.customer.amount);
      this.modalBody.innerHTML = this.output.LOTTO_RESULT(this.customer.results, profitRate);
    }
    this.modal.classList.add('open');
  }

  retryLotto = () => {
    this.modal.classList.remove('open');
    this.initState();
    this.initRender();
  };

  closeModal = () => {
    this.modal.classList.remove('open');
    this.lottoCycle = true;
  };

  #countWinningNumber(lotto) {
    const winningCount = this.winningNumber.filter((number) => lotto.includes(number));
    const bonusCount = lotto.includes(this.bonusNumber);

    if (bonusCount) {
      return winningCount.length === 4 ? 6 : winningCount.length === 5 ? 7 : winningCount.length;
    }
    return winningCount.length === 6 ? 7 : winningCount.length;
  }
}
