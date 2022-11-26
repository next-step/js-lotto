import {
  ALERT,
  DEFAULT_LOTTO_STATE,
  LOTTO_MAX_VALUE,
  LOTTO_MIN_VALUE,
  MAX_LOTTO_PRICE,
  MAX_WINNING_INPUT_LENGTH,
  MIN_LOTTO_PRICE,
} from '../constants.js';
import {
  isDuplicatedInArray,
  isRerender,
  makeLottoNumbers,
} from '../utils/index.js';
import ConfirmButton from './components/buttons/ConfirmButton.js';
import OpenModalButton from './components/buttons/OpenModalButton.js';
import ResultForm from './components/ResultForm.js';
import ResultModal from './components/ResultModal.js';
class Lotto {
  constructor({ $target }) {
    this.$target = $target;
    this.$checkWrapper = $target.querySelector('#check-result');
    this.$numberInput = $target.querySelector('[data-id=lotto-number-input]');
    this.$submitButton = $target.querySelector('[data-id=lotto-submit-button]');
    this.$bonusNumberInput = $target.querySelector('.bonus-number');
    this.$winningNumbersInput = Array.from(
      $target.getElementsByClassName('winning-number')
    );

    this.state = {
      ...DEFAULT_LOTTO_STATE,
    };
    this.initialize();
  }

  setState(nextState) {
    if (isRerender({ currentState: this.state, nextState })) return;

    this.state = nextState;
    this.render();
  }

  onToggle() {
    this.setState({ ...this.state, isToggle: !this.state.isToggle });
  }

  onConfirm() {
    const { moneyAmount } = this.state;
    const isOverPirce = moneyAmount > MAX_LOTTO_PRICE;
    const isConfirm =
      moneyAmount >= MIN_LOTTO_PRICE && moneyAmount <= MAX_LOTTO_PRICE;
    const isThousandUnit = moneyAmount % MIN_LOTTO_PRICE === 0;

    if (isOverPirce) {
      window.alert(ALERT.OVER_MAX_VALUE);
      this.setState({ ...this.state, moneyAmount: null });
      return;
    }

    if (!isThousandUnit) {
      window.alert(ALERT.TYPE_THOUSAND_UNIT);
      this.setState({ ...this.state, moneyAmount: null });
      return;
    }

    if (isConfirm) {
      const lottoNumbers = makeLottoNumbers(moneyAmount);

      this.setState({
        ...this.state,
        lottoPurchaseNumber: moneyAmount / MIN_LOTTO_PRICE,
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

  onModalShow({ isVisibleModal }) {
    const isValidBonusNumber = Boolean(this.state.bonusNumber);
    const isAllTyped =
      this.state.winningNumbers.filter((number) => Boolean(number)).length ===
        MAX_WINNING_INPUT_LENGTH && isValidBonusNumber;
    const isValidNumbers =
      this.state.winningNumbers.filter(
        (number) => +number >= LOTTO_MIN_VALUE && +number <= LOTTO_MAX_VALUE
      ).length === MAX_WINNING_INPUT_LENGTH && isValidBonusNumber;

    if (!isAllTyped) {
      alert(ALERT.NOT_ALL_TYPED_WINNING_INPUT);
      return;
    }

    if (!isValidNumbers) {
      alert(ALERT.IN_RANGE_WINNING_INPUT);
      return;
    }

    if (
      isDuplicatedInArray([this.state.winningNumbers, this.state.bonusNumber])
    ) {
      alert(ALERT.DUPLICATE_VALUE_EXIST);
      return;
    }

    this.setState({ ...this.state, isVisibleModal });
  }

  onTypeWinning({ value, index }) {
    const TYPE_MAX_LENGTH = 2,
      LAST_WINNING_INPUT_INDEX = 5;
    if (value.length > TYPE_MAX_LENGTH) return;

    const isNextWinningInput =
        value.length >= TYPE_MAX_LENGTH && index < LAST_WINNING_INPUT_INDEX,
      isBonusInput =
        value.length >= TYPE_MAX_LENGTH && index === LAST_WINNING_INPUT_INDEX;

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
    if (index === MAX_WINNING_INPUT_LENGTH) {
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

  render() {
    this.renderInput();

    new ResultForm({
      $target: this.$target,
      props: {
        state: this.state,
      },
    });

    new ConfirmButton({
      $target: this.$target,
      props: {
        state: this.state,
        onConfirm: this.onConfirm.bind(this),
      },
    });

    new ResultModal({
      $target: this.$target,
      props: {
        state: this.state,
        onModalShow: this.onModalShow.bind(this),
        onRestart: this.onRestart.bind(this),
      },
    });

    new OpenModalButton({
      $target: this.$target,
      props: {
        state: this.state,
        onModalShow: this.onModalShow.bind(this),
      },
    });
  }

  addEventListener() {
    this.$target.addEventListener('click', (event) => {
      if (event.target.dataset.id === 'number-toggle-button') {
        this.onToggle();
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
