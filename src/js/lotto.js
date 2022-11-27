import {
  ALERT,
  CLICK_EVENT_MAP,
  DEFAULT_LOTTO_STATE,
  ELEMENT_DATA_ID,
  LOTTO_VALUE,
} from '../constants.js';
import {
  isDuplicatedInArray,
  isRerender,
  makeLottoNumbers,
} from '../utils/index.js';
import ConfirmButton from './components/buttons/ConfirmButton.js';
import OpenModalButton from './components/buttons/OpenModalButton.js';
import PurchaseInput from './components/input/PurchaseInput.js';
import ResultForm from './components/ResultForm.js';
import ResultModal from './components/ResultModal.js';
class Lotto {
  constructor({ $target }) {
    this.$target = $target;
    this.$bonusNumberInput = $target.querySelector('.bonus-number');
    this.$winningNumbersInput = Array.from(
      $target.getElementsByClassName('winning-number')
    );

    this.state = {
      ...DEFAULT_LOTTO_STATE,
    };

    this.render();
    this.addEventListener();
  }

  setState(nextState) {
    if (isRerender({ currentState: this.state, nextState })) return;

    this.state = nextState;
    this.render();
  }

  onToggle = () => {
    this.setState({ ...this.state, isToggle: !this.state.isToggle });
  };

  onConfirm = () => {
    const { moneyAmount } = this.state;
    const isOverPirce = moneyAmount > LOTTO_VALUE.MAX_PRICE;
    const isConfirm =
      moneyAmount >= LOTTO_VALUE.MIN_PRICE &&
      moneyAmount <= LOTTO_VALUE.MAX_PRICE;
    const isThousandUnit = moneyAmount % LOTTO_VALUE.MIN_PRICE === 0;

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
        lottoPurchaseNumber: moneyAmount / LOTTO_VALUE.MIN_PRICE,
        lottoNumbers,
        isVisibleResult: true,
      });
    }
  };

  onEnter = (event) => {
    event.preventDefault();
    this.onConfirm();
  };

  onTypeAmount = (value) => {
    if (!Number.isInteger(Number(value))) return;
    this.setState({ ...this.state, moneyAmount: Number(value) });
  };

  onModalShow = ({ isVisibleModal }) => {
    const isValidBonusNumber = Boolean(this.state.bonusNumber);
    const isAllTyped =
      this.state.winningNumbers.filter((number) => Boolean(number)).length ===
        LOTTO_VALUE.WINNIN_INPUT_LENGTH && isValidBonusNumber;
    const isValidNumbers =
      this.state.winningNumbers.filter(
        (number) =>
          Number(number) >= LOTTO_VALUE.MIN_NUMBER &&
          Number(number) <= LOTTO_VALUE.MAX_NUMBER
      ).length === LOTTO_VALUE.WINNIN_INPUT_LENGTH && isValidBonusNumber;

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
  };

  onTypeWinning = ({ value, index }) => {
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
    if (index === LOTTO_VALUE.MAX_LOTTO_COUNT) {
      this.setState({
        ...this.state,
        bonusNumber: value,
      });
    }
  };

  onRestart = () => {
    this.setState({
      ...DEFAULT_LOTTO_STATE,
    });
  };

  render() {
    new PurchaseInput({
      $target: this.$target,
      props: {
        state: this.state,
      },
    });

    new ResultForm({
      $target: this.$target,
      props: {
        state: this.state,
        onToggle: this.onToggle,
      },
    });

    new ConfirmButton({
      $target: this.$target,
      props: {
        state: this.state,
        onConfirm: this.onConfirm,
      },
    });

    new ResultModal({
      $target: this.$target,
      props: {
        state: this.state,
        onModalShow: this.onModalShow,
        onRestart: this.onRestart,
      },
    });

    new OpenModalButton({
      $target: this.$target,
      props: {
        state: this.state,
        onModalShow: this.onModalShow,
      },
    });
  }

  addEventListener() {
    this.$target.addEventListener('click', (event) => {
      if (CLICK_EVENT_MAP.has(event.target.dataset.id)) {
        CLICK_EVENT_MAP.get(event.target.dataset.id)(event);
      }
    });

    this.$target.addEventListener('input', (event) => {
      if (event.target.dataset.id === ELEMENT_DATA_ID.LOTTO_NUMBER_INPUT) {
        this.onTypeAmount(event.target.value);
      }
    });

    this.$target.addEventListener('keydown', (event) => {
      if (
        event.target.dataset.id === ELEMENT_DATA_ID.LOTTO_NUMBER_INPUT &&
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
}

export default Lotto;
