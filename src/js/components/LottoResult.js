import { ALERT_MESSAGE } from "../constants/messages.js";
import { CLASS_NAME, INPUT_NAME } from "../constants/selectors.js";
import { LOTTO_NUMBER, WINNING_MONEY } from "../constants/lotto.js";
import lottoStore, { LOTTO_PRIZE_KEY, LOTTO_STORE_KEY } from "../lottoStore.js";
import { getMatchedNumbersCount } from "../utils/number.js";

class LottoResult {
  constructor() {
    this.$winningNumberForm = document.querySelector(CLASS_NAME.WINNING_NUMBER_FORM);
    this.$resultModal = document.querySelector(CLASS_NAME.LOTTO_RESULT_MODAL);
    this.$resultModalOpenButton = document.querySelector(CLASS_NAME.LOTTO_RESULT_MODAL_OPEN);
    this.$resultModalCloseButton = document.querySelector(CLASS_NAME.LOTTO_RESULT_MODAL_CLOSE);
    this.$lottoResultTable = document.querySelector(CLASS_NAME.LOTTO_RESULT_TABLE);
    this.$profitRate = document.querySelector(CLASS_NAME.PROFIT_RATE);
    this.$resetButton = document.querySelector(CLASS_NAME.LOTTO_RESET_BUTTON);

    this.winningNumbers = [];
    this.bonusNumber = -1;
    this.profitRate = 0;
  }

  init() {
    this.$winningNumberForm.addEventListener("submit", this.onWinningNumberSubmit.bind(this));
    this.$winningNumberForm.addEventListener("keydown", this.onFormKeydown.bind(this));
    this.$resultModalCloseButton.addEventListener("click", this.onModalClose.bind(this));
    this.$resultModal.addEventListener("mouseup", this.onModalBackDropClick.bind(this));
    this.$resetButton.addEventListener("click", this.onReset.bind(this));
  }

  onWinningNumberSubmit(event) {
    event.preventDefault();

    const formElements = event.target.elements;
    const winningNumberInputs = Array.from(formElements[INPUT_NAME.WINNING_NUMBER]).map(($input) => $input.value);
    const bonusNumberInput = formElements[INPUT_NAME.BONUS_NUMBER].value;
    const ticketCount = lottoStore.selectState(LOTTO_STORE_KEY.TICKET_COUNT);

    const allInput = [...winningNumberInputs, bonusNumberInput];
    const isEmptyInputExist = allInput.some((value) => value === "");
    const isDuplicatedNumberExist = new Set(allInput).size !== allInput.length;
    const isNumbersInRange = allInput.every(
      (input) => Number(input) >= LOTTO_NUMBER.MIN_VALUE && Number(input) <= LOTTO_NUMBER.MAX_VALUE
    );

    if (isEmptyInputExist) {
      alert(ALERT_MESSAGE.EMPTY_NUMBERS);

      return;
    }

    if (isDuplicatedNumberExist) {
      alert(ALERT_MESSAGE.DUPLICATED_NUMBERS);

      return;
    }

    if (!isNumbersInRange) {
      alert(ALERT_MESSAGE.INVAILD_NUMBER_RANGE(LOTTO_NUMBER.MIN_VALUE, LOTTO_NUMBER.MAX_VALUE));

      return;
    }

    if (ticketCount === 0) {
      alert(ALERT_MESSAGE.NO_LOTTO_TICKET);

      return;
    }

    this.winningNumbers = winningNumberInputs.map((input) => Number(input));
    this.bonusNumber = Number(bonusNumberInput);
    this.$resultModal.classList.add("open");

    this.evalutateLottoPrize();
    this.evalutateProfitRate();
    this.renderResult();
  }

  onFormKeydown(event) {
    if (/[.-]/.test(event.key)) {
      event.preventDefault();
    }
  }

  onModalClose() {
    this.$resultModal.classList.remove("open");
  }

  onModalBackDropClick({ target, currentTarget }) {
    if (target === currentTarget) {
      this.onModalClose();
    }
  }

  onReset() {
    this.$winningNumberForm.reset();

    lottoStore.setState(LOTTO_STORE_KEY.PAYMENT, 0);
    lottoStore.setState(LOTTO_STORE_KEY.PAYMENT_CHANGES, 0);
    lottoStore.setState(LOTTO_STORE_KEY.TICKET_COUNT, 0);
    lottoStore.setState(LOTTO_STORE_KEY.LOTTO_NUMBERS, []);
    lottoStore.setState(LOTTO_STORE_KEY.LOTTO_PRIZE, {
      [LOTTO_PRIZE_KEY.FIRST]: 0,
      [LOTTO_PRIZE_KEY.SECOND]: 0,
      [LOTTO_PRIZE_KEY.THIRD]: 0,
      [LOTTO_PRIZE_KEY.FOURTH]: 0,
      [LOTTO_PRIZE_KEY.FIFTH]: 0,
    });

    this.onModalClose();
  }

  evalutateLottoPrize() {
    const lottoPrize = lottoStore.selectState(LOTTO_STORE_KEY.LOTTO_PRIZE);
    const lottoNumbers = lottoStore.selectState(LOTTO_STORE_KEY.LOTTO_NUMBERS);

    lottoNumbers.forEach((lotto) => {
      switch (getMatchedNumbersCount(lotto, this.winningNumbers)) {
        case 6:
          lottoPrize[LOTTO_PRIZE_KEY.FIRST]++;
          break;
        case 5:
          if (lotto.includes(this.bonusNumber)) {
            lottoPrize[LOTTO_PRIZE_KEY.SECOND]++;
          } else {
            lottoPrize[LOTTO_PRIZE_KEY.THIRD]++;
          }
          break;
        case 4:
          lottoPrize[LOTTO_PRIZE_KEY.FOURTH]++;
          break;
        case 3:
          lottoPrize[LOTTO_PRIZE_KEY.FIFTH]++;
          break;
      }
    });

    lottoStore.setState(LOTTO_STORE_KEY.LOTTO_PRIZE, lottoPrize);
  }

  evalutateProfitRate() {
    const lottoPrize = lottoStore.selectState(LOTTO_STORE_KEY.LOTTO_PRIZE);
    const payment = lottoStore.selectState(LOTTO_STORE_KEY.PAYMENT);
    const totalMoney = Object.keys(lottoPrize).reduce((sum, key) => sum + lottoPrize[key] * WINNING_MONEY[key], 0);

    this.profitRate = ((totalMoney - payment) / payment) * 100;
  }

  renderResult() {
    const lottoPrize = lottoStore.selectState(LOTTO_STORE_KEY.LOTTO_PRIZE);

    this.$lottoResultTable.innerHTML = `
      <thead>
        <tr class="text-center">
          <th class="p-3">일치 갯수</th>
          <th class="p-3">당첨금</th>
          <th class="p-3">당첨 갯수</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center">
          <td class="p-3">3개</td>
          <td class="p-3">${WINNING_MONEY[LOTTO_PRIZE_KEY.FIFTH].toLocaleString()}원</td>
          <td class="p-3">${lottoPrize[LOTTO_PRIZE_KEY.FIFTH]}개</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">4개</td>
          <td class="p-3">${WINNING_MONEY[LOTTO_PRIZE_KEY.FOURTH].toLocaleString()}원</td>
          <td class="p-3">${lottoPrize[LOTTO_PRIZE_KEY.FOURTH]}개</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">5개</td>
          <td class="p-3">${WINNING_MONEY[LOTTO_PRIZE_KEY.THIRD].toLocaleString()}원</td>
          <td class="p-3">${lottoPrize[LOTTO_PRIZE_KEY.THIRD]}개</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">5개 + 보너스볼</td>
          <td class="p-3">${WINNING_MONEY[LOTTO_PRIZE_KEY.SECOND].toLocaleString()}원</td>
          <td class="p-3">${lottoPrize[LOTTO_PRIZE_KEY.SECOND]}개</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">6개</td>
          <td class="p-3">${WINNING_MONEY[LOTTO_PRIZE_KEY.FIRST].toLocaleString()}원</td>
          <td class="p-3">${lottoPrize[LOTTO_PRIZE_KEY.FIRST]}개</td>
        </tr>
      </tbody>
    `;

    this.$profitRate.textContent = `당신의 총 수익률은 ${this.profitRate.toFixed(2)}%입니다.`;
  }
}

export default LottoResult;
