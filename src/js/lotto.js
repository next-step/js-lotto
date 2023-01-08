import { ALERT } from '../constants/alerts.js';
import { ELEMENT } from '../constants/elements.js';
import { DEFAULT_LOTTO_STATE, DEFAULT_TYPED_NUMBERS } from '../constants/state.js';
import { LOTTO_VALUE } from '../constants/validation.js';
import { isDuplicatedInArray, isRerender, makeLottoNumbers } from '../utils/index.js';
import ConfirmButton from './components/buttons/ConfirmButton.js';
import OpenModalButton from './components/buttons/OpenModalButton.js';
import PurchaseInput from './components/input/PurchaseInput.js';
import ManualForm from './components/ManualForm.js';
import ResultForm from './components/ResultForm.js';
import ResultModal from './components/ResultModal.js';

class Lotto {
  constructor({ $target }) {
    this.$target = $target;
    this.$bonusNumberInput = $target.querySelector(ELEMENT.BONUS_NUMBER_INPUT);
    this.$manualForm = $target.querySelector(ELEMENT.MANUAL_WRAPPER);
    this.$checkResultForm = $target.querySelector(ELEMENT.CHECK_WRAPPER);
    this.$manualInput = $target.querySelectorAll(ELEMENT.MANUAL_NUMBERS_INPUT);
    this.$winningNumbersInput = Array.from($target.querySelectorAll(ELEMENT.WINNING_NUMBERS_INPUT));
    this.$numberInput = $target.querySelector(ELEMENT.LOTTO_NUMBER_INPUT);
    this.$doneManualButton = $target.querySelector(ELEMENT.DONE_MANUAL_BUTTON);
    this.$manualSubmitButton = $target.querySelector(ELEMENT.MANUAL_SUBMIT_BUTTON);
    this.$moveAutoNumberButton = $target.querySelector(ELEMENT.MOVE_AUTO_NUMBER_BUTTON);
    this.$numberToggleButton = $target.querySelector(ELEMENT.NUMBER_TOGGLE_BUTTON);
    this.$submitButton = $target.querySelector(ELEMENT.LOTTO_SUBMIT_BUTTON);
    this.$restartButton = $target.querySelector(ELEMENT.RESTART_BUTTON);
    this.$modalCloseButton = $target.querySelector(ELEMENT.MODAL_CLOSE_BUTTON);
    this.$openModalButton = $target.querySelector(ELEMENT.OPEN_RESULT_MODAL_BUTTON);
    this.$purchaseWrapper = $target.querySelector(ELEMENT.PURCHASE_WRAPPER);

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
    const isConfirm = moneyAmount >= LOTTO_VALUE.MIN_PRICE && moneyAmount <= LOTTO_VALUE.MAX_PRICE;
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
      if (moneyAmount % 1000 !== 0) throw new Error('난수생성을 위해 1000원 단위로 입력되어야 합니다.');

      this.setState({
        ...this.state,
        lottoPurchaseNumber: moneyAmount / LOTTO_VALUE.MIN_PRICE,
        isVisibleAutoInput: true,
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
    if (isDuplicatedInArray([this.state.winningNumbers, this.state.bonusNumber])) {
      alert(ALERT.DUPLICATE_VALUE_EXIST);
      return;
    }

    this.setState({ ...this.state, isVisibleModal });
  };

  onNextInput = ({ element, event }) => {
    const isTypeInput =
      event.key === 'Shift' ||
      event.key === 'Tab' ||
      event.key === 'Enter' ||
      element.value.length !== LOTTO_VALUE.TYPE_MAX_LENGTH;
    if (isTypeInput) return;

    if (element.nextElementSibling) element.nextElementSibling.focus();
  };

  onTypeManualNumber = ({ value, index }) => {
    if (value.length > LOTTO_VALUE.TYPE_MAX_LENGTH) return;

    this.setState({
      ...this.state,
      typedManualNumber: this.state.typedManualNumber.map((el, originIndex) => (index === originIndex ? value : el)),
    });
  };

  onSubmitManualNumber = (event) => {
    event.preventDefault();
    const { manualPurchaseNumber, manualNumbers, typedManualNumber } = this.state;

    if (isDuplicatedInArray(typedManualNumber)) {
      alert(ALERT.DUPLICATE_VALUE_EXIST);
      return;
    }

    this.setState({
      ...this.state,
      manualNumbers: [...manualNumbers, typedManualNumber.map(Number)],
      typedManualNumber: DEFAULT_TYPED_NUMBERS,
      manualPurchaseNumber: manualPurchaseNumber + 1,
    });
  };

  onConfirmManual = () => {
    const { manualPurchaseNumber, moneyAmount } = this.state;
    const autoCount = moneyAmount / LOTTO_VALUE.MIN_PRICE - manualPurchaseNumber;

    this.setState({
      ...this.state,
      lottoNumbers: [...makeLottoNumbers(autoCount), ...this.state.manualNumbers],
      isVisibleResult: true,
    });
  };

  onTypeWinning = ({ event, index }) => {
    const LAST_WINNING_INPUT_INDEX = 5;
    const { value } = event.target;
    if (value.length > LOTTO_VALUE.TYPE_MAX_LENGTH) return;

    const isBonusInput =
      event.key !== 'Shift' &&
      event.key !== 'Tab' &&
      event.key !== 'Enter' &&
      value.length >= LOTTO_VALUE.TYPE_MAX_LENGTH &&
      index === LAST_WINNING_INPUT_INDEX;

    this.setState({
      ...this.state,
      winningNumbers: this.state.winningNumbers.map((el, originIndex) => (index === originIndex ? value : el)),
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

    new ManualForm({
      $target: this.$target,
      props: {
        state: this.state,
      },
    });

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
      },
    });

    new ResultModal({
      $target: this.$target,
      props: {
        state: this.state,
      },
    });

    new OpenModalButton({
      $target: this.$target,
      props: {
        state: this.state,
      },
    });
  }

  addEventListener() {
    this.$purchaseWrapper.addEventListener('submit', (event) => {
      this.onEnter(event);
    });

    this.$restartButton.addEventListener('click', (event) => {
      this.onRestart(event);
    });

    this.$modalCloseButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.onModalShow({ isVisibleModal: false });
    });

    this.$numberInput.addEventListener('input', (event) => {
      this.onTypeAmount(event.target.value);
    });

    this.$manualForm.addEventListener('submit', (event) => {
      this.onSubmitManualNumber(event);
    });

    this.$moveAutoNumberButton.addEventListener('click', () => {
      this.onConfirmManual();
    });

    this.$doneManualButton.addEventListener('click', (event) => {
      this.onConfirmManual(event);
    });

    this.$numberToggleButton.addEventListener('click', (event) => {
      this.onToggle(event);
    });

    this.$winningNumbersInput.forEach((eachInput, winningNumbersIndex) => {
      eachInput.addEventListener('keyup', (event) => {
        this.onNextInput({ element: eachInput, event });
        this.onTypeWinning({
          event,
          index: winningNumbersIndex,
        });
      });
    });

    this.$manualInput.forEach((eachInput, manualNumbersIndex) => {
      eachInput.addEventListener('keyup', (event) => {
        this.onNextInput({ element: eachInput, event });
        this.onTypeManualNumber({
          value: event.target.value,
          index: manualNumbersIndex,
        });
      });
    });

    this.$checkResultForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.onModalShow({ isVisibleModal: true });
    });

    this.$submitButton.addEventListener('click', (event) => {
      this.onConfirm(event);
    });

    this.$target.addEventListener('keyup', (event) => {
      if (event.target.classList.contains('bonus-number')) {
        const BONUS_NUMBER_STATE_INDEX = 6;
        this.onTypeWinning({
          event,
          index: BONUS_NUMBER_STATE_INDEX,
        });
      }
    });
  }
}

export default Lotto;
