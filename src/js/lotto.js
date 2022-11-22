import {
  ALERT,
  DEFAULT_LOTTO_STATE,
  MAX_LOTTO_PRICE,
  MIN_LOTTO_PRICE,
  MODAL_WIINING_TABLE_MAP,
  WINNING_NUMBER_INPUT_COUNT,
} from '../constants.js';
import {
  getWinningCount,
  isDuplicatedInArray,
  makeLottoNumbers,
  makeRateOfReturn,
} from '../utils/index.js';

class Lotto {
  constructor({ $target }) {
    this.$target = $target;
    this.$resultWrapper = $target.querySelector('#purchased-result');
    this.$checkWrapper = $target.querySelector('#check-result');
    this.$modal = $target.querySelector('.modal');
    this.$numberInput = $target.querySelector('[data-id=lotto-number-input]');
    this.$submitButton = $target.querySelector('[data-id=lotto-submit-button]');
    this.$openModalButton = $target.querySelector(
      '[data-id=open-result-modal-button]'
    );
    this.$bonusNumberInput = $target.querySelector('.bonus-number');
    this.$winningNumbersInput = Array.from(
      $target.getElementsByClassName('winning-number')
    );
    this.$modalTableBody = $target.querySelector(
      '[data-id=modal-result-table-body]'
    );
    this.$investmentReturnSpan = $target.querySelector(
      '[data-id=investment-return]'
    );

    this.state = {
      ...DEFAULT_LOTTO_STATE,
    };

    this.initialize();
  }

  setState(nextState) {
    console.log({ nextState });
    this.state = nextState;
    this.render();
  }

  onConfirm() {
    const isOverPirce = this.state.moneyAmount > MAX_LOTTO_PRICE;
    const isConfirm =
      this.state.moneyAmount >= MIN_LOTTO_PRICE &&
      this.state.moneyAmount <= MAX_LOTTO_PRICE;
    const isAlert = this.state.moneyAmount % MIN_LOTTO_PRICE !== 0;

    if (isOverPirce) {
      window.alert(ALERT.OVER_MAX_VALUE);
      this.setState({ ...this.state, moneyAmount: null });
      return;
    }

    if (isAlert) {
      window.alert(ALERT.TYPE_THOUSAND_UNIT);
      this.setState({ ...this.state, moneyAmount: null });
      return;
    }

    if (isConfirm) {
      const lottoNumbers = makeLottoNumbers(this.state.moneyAmount);

      this.setState({
        ...this.state,
        lottoPurchaseNumber: this.state.moneyAmount / MIN_LOTTO_PRICE,
        lottoNumbers,
        isVisibleResult: true,
      });
    }
  }

  onEnter(event) {
    event.preventDefault();
    this.onConfirm();
  }

  onTypeAmount(value) {
    if (!Number.isInteger(Number(value))) return;
    this.setState({ ...this.state, moneyAmount: Number(value) });
  }

  onToggle() {
    this.setState({ ...this.state, isToggle: !this.state.isToggle });
  }

  onModalShow({ isVisibleModal }) {
    const isValidBonusNumber = Boolean(this.state.bonusNumber);
    const isAllTyped =
      this.state.winningNumbers.filter((number) => Boolean(number)).length ===
        WINNING_NUMBER_INPUT_COUNT && isValidBonusNumber;

    const isValidNumbers =
      this.state.winningNumbers.filter(
        (number) => +number >= 1 && +number <= 45
      ).length === WINNING_NUMBER_INPUT_COUNT && isValidBonusNumber;

    if (!isAllTyped) {
      alert('7개의 값을 모두 입력해주세요');
      return;
    }

    if (!isValidNumbers) {
      alert('1이상 45이하의 숫자를 입력해주세요');
      return;
    }

    if (isDuplicatedInArray(this.state.winningNumbers)) {
      alert('중복된 값이 있습니다.');
      return;
    }

    this.setState({ ...this.state, isVisibleModal });
  }

  onTypeWinning({ value, index }) {
    const MAX_LENGTH = 2,
      LAST_WINNING_INPUT_INDEX = 5;
    if (value.length > MAX_LENGTH) return;

    const isNextWinningInput =
        value.length >= MAX_LENGTH && index < LAST_WINNING_INPUT_INDEX,
      isBonusInput =
        value.length >= MAX_LENGTH && index === LAST_WINNING_INPUT_INDEX;

    if (isNextWinningInput) {
      const nextInputIndex = index + 1;
      this.$winningNumbersInput[nextInputIndex].focus();
    }

    this.setState({
      ...this.state,
      winningNumbers: this.state.winningNumbers.map((el, originIndex) =>
        index === originIndex ? value : el
      ),
    });

    if (isBonusInput) this.$bonusNumberInput.focus();
    if (index === WINNING_NUMBER_INPUT_COUNT) {
      this.setState({
        ...this.state,
        bonusNumber: value,
      });
    }
  }

  onRestart() {
    this.setState({
      ...DEFAULT_LOTTO_STATE,
    });
  }

  renderModal() {
    const {
      isVisibleModal,
      lottoNumbers,
      winningNumbers,
      bonusNumber,
      moneyAmount,
    } = this.state;

    if (isVisibleModal) {
      const { countedLottoNumbersMap, totalAdvantage } = getWinningCount({
        lottoNumbers,
        winningInput: winningNumbers.map((el) => Number(el)),
        bonusNumber,
      });
      const profit = makeRateOfReturn(moneyAmount, totalAdvantage);
      this.$modalTableBody.innerHTML = `
            ${MODAL_WIINING_TABLE_MAP.map(({ title, value }) => {
              return `
              <tr class="text-center" data-id=${title}>
                <td class="p-3">${title}</td>
                <td class="p-3">${value.toLocaleString()}</td>
                <td class="p-3">${
                  countedLottoNumbersMap.has(title)
                    ? countedLottoNumbersMap.get(title)
                    : 0
                }개</td>
              </tr>
              `;
            }).join('')}
          `;

      this.$investmentReturnSpan.innerText = `
        당신의 총 수익률은 ${profit}%입니다.
      `;
      this.$modal.classList.add('open');
    }

    if (!isVisibleModal) {
      this.$modal.classList.remove('open');
    }
  }

  renderToggle() {
    this.$target
      .querySelectorAll('.lotto-number')
      .forEach(
        (element) =>
          (element.style.display = this.state.isToggle ? 'inline' : 'none')
      );
  }

  renderResult() {
    if (!this.state.isVisibleResult) {
      this.$resultWrapper.style.display = 'none';
      return;
    }

    this.$resultWrapper.querySelector(
      '[data-id=result-text]'
    ).innerText = `총 ${this.state.lottoPurchaseNumber}개를 구매하였습니다.`;

    this.$resultWrapper.querySelector(
      '[data-id=lotto-image-wrapper]'
    ).innerHTML = `
      ${this.state.lottoNumbers
        .map((lottoNumber) => {
          return `
            <li class="lotto-list">
              <span class="mx-1 text-4xl" data-id="lotto-image">🎟️</span>
              <span class="lotto-number" data-id="lotto-number">
                ${lottoNumber.join(' ')}
              </span>
            </li>
        `;
        })
        .join('')}
    `;
    if (this.$resultWrapper.style.display !== 'block') {
      this.$resultWrapper.style.display = 'block';
    }
  }

  renderCheckResultForm() {
    if (!this.state.isVisibleResult) {
      this.$checkWrapper.style.display = 'none';
      return;
    }

    if (this.$checkWrapper.style.display !== 'block') {
      this.$checkWrapper.style.display = 'block';
    }
  }

  renderInput() {
    const isBlank =
      this.state.moneyAmount === 0 || this.state.moneyAmount === null;

    if (isBlank) {
      this.$numberInput.value = null;
    }

    if (!isBlank) {
      this.$numberInput.value = this.state.moneyAmount;
    }
  }

  renderWinningInput() {
    this.$winningNumbersInput.forEach((element, index) => {
      element.value = this.state.winningNumbers[index];
    });
  }

  renderBonusInput() {
    this.$bonusNumberInput.value = this.state.bonusNumber;
  }

  renderConfirmButton() {
    const isBlank =
      this.state.moneyAmount === 0 || this.state.moneyAmount === null;

    if (isBlank) this.$submitButton.setAttribute('disabled', '');
    if (!isBlank) this.$submitButton.removeAttribute('disabled');
  }

  renderOpenModalButton() {
    const isValidBonusNumber = Boolean(this.state.bonusNumber);
    const isAllTyped =
      this.state.winningNumbers.filter((number) => Boolean(number)).length ===
        WINNING_NUMBER_INPUT_COUNT && isValidBonusNumber;
    const isValid = isAllTyped && isValidBonusNumber;

    if (isValid) this.$openModalButton.removeAttribute('disabled');
    if (!isValid) this.$openModalButton.setAttribute('disabled', '');
  }

  render() {
    this.renderResult();
    this.renderCheckResultForm();
    this.renderToggle();
    this.renderInput();
    this.renderConfirmButton();
    this.renderModal();
    this.renderWinningInput();
    this.renderBonusInput();
    this.renderOpenModalButton();
  }

  addEventListener() {
    this.$target.addEventListener('click', (event) => {
      if (event.target.dataset.id === 'lotto-submit-button') {
        this.onConfirm();
      }

      if (event.target.dataset.id === 'number-toggle-button') {
        this.onToggle();
      }
      if (event.target.dataset.id === 'open-result-modal-button') {
        event.preventDefault();
        this.onModalShow({ isVisibleModal: true });
      }

      if (event.target.dataset.id === 'modal-close-button') {
        event.preventDefault();
        this.onModalShow({ isVisibleModal: false });
      }

      if (event.target.dataset.id === 'restart-button') {
        this.onRestart();
      }
    });

    this.$target.addEventListener('input', (event) => {
      if (event.target.dataset.id === 'lotto-number-input') {
        this.onTypeAmount(event.target.value);
      }
    });

    this.$target.addEventListener('keydown', (event) => {
      if (
        event.target.dataset.id === 'lotto-number-input' &&
        event.key === 'Enter'
      ) {
        this.onEnter(event);
      }
    });

    this.$winningNumbersInput.forEach((eachInput, winningNumbersIndex) => {
      eachInput.addEventListener('keyup', (event) => {
        this.onTypeWinning({
          value: event.target.value,
          index: winningNumbersIndex,
        });
      });
    });

    this.$target.addEventListener('keyup', (event) => {
      if (event.target.classList.contains('bonus-number')) {
        const BONUS_NUMBER_STATE_INDEX = 6;
        this.onTypeWinning({
          value: event.target.value,
          index: BONUS_NUMBER_STATE_INDEX,
        });
      }
    });
  }

  initialize() {
    this.render();
    this.addEventListener();
  }
}

export default Lotto;
