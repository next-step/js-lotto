import Modal from "./@common/Modal.js";
import { CLASS_NAME } from "../constants/selectors.js";
import lottoStore, { lottoStoreActions, LOTTO_PRIZE_KEY, LOTTO_STORE_KEY } from "../lottoStore.js";
import { WINNING_MONEY } from "../constants/lotto.js";

class LottoResultModal extends Modal {
  constructor() {
    super({
      $modal: document.querySelector(CLASS_NAME.LOTTO_RESULT_MODAL),
      $modalOpenButton: document.querySelector(CLASS_NAME.LOTTO_RESULT_MODAL_OPEN),
      $modalCloseButton: document.querySelector(CLASS_NAME.LOTTO_RESULT_MODAL_CLOSE),
    });

    this.$lottoResultTable = document.querySelector(CLASS_NAME.LOTTO_RESULT_TABLE);
    this.$profitRate = document.querySelector(CLASS_NAME.PROFIT_RATE);
    this.$resetButton = document.querySelector(CLASS_NAME.LOTTO_RESET_BUTTON);
  }

  init() {
    super.init();

    this.$resetButton.addEventListener("click", this.onReset.bind(this));

    lottoStore.subscribeState(LOTTO_STORE_KEY.LOTTO_PRIZE, this.renderPrizeTable.bind(this));
    lottoStore.subscribeState(LOTTO_STORE_KEY.PROFIT_RATE, this.renderProfitRate.bind(this));
  }

  onReset() {
    lottoStoreActions.reset();
    this.close();
  }

  renderPrizeTable() {
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
  }

  renderProfitRate() {
    const profitRate = lottoStore.selectState(LOTTO_STORE_KEY.PROFIT_RATE);

    this.$profitRate.textContent = `당신의 총 수익률은 ${profitRate.toFixed(2)}%입니다.`;
  }
}

export default LottoResultModal;
