import LottoVendingMachine from '../domain/LottoVendingMachine.js';
import LottoWinningCalculator from '../domain/LottoWinningCalculator.js';
import LottoWinningNumbers from '../domain/LottoWinningNumbers.js';

class LottoGameController {
  #vendingMachine;
  #winningCalculator;
  purchasedLottoList;
  lottoWinningNumbers;
  calculatedResult;

  constructor({
    vendingMachine = new LottoVendingMachine(),
    winningCalculator = new LottoWinningCalculator(),
  } = {}) {
    this.#vendingMachine = vendingMachine;
    this.#winningCalculator = winningCalculator;
  }

  /**
   * 구매 금액만큼 로또를 발행한다.
   * @param {String} purchaseAmount
   */
  async purchaseAndIssueLottos(purchaseAmount) {
    this.#vendingMachine.purchase(purchaseAmount);
    this.purchasedLottoList = this.#vendingMachine.lottos;
  }

  /**
   * 인자로 받은 로또 번호로 로또 당첨 번호를 결정한다.
   * @param {Object} givenLottoNumbers { selectedNums, extraNum }
   */
  async setWinningNumbers(givenLottoNumbers) {
    const { selectedNums, extraNum } = givenLottoNumbers;

    this.lottoWinningNumbers = new LottoWinningNumbers({
      selectedNums,
      extraNum,
    });
  }

  calculateResults() {
    const purchasedLottoStatuses = this.getLottoStatus(
      this.lottoWinningNumbers.numbers,
      this.purchasedLottoList
    );

    this.#winningCalculator.calculate(purchasedLottoStatuses);

    this.calculateResults = this.#winningCalculator.result;
  }

  getLottoStatus(lottoWinningNumbers, purchasedLottoList) {
    return purchasedLottoList.map((lotto) => {
      lotto.setStatus(lottoWinningNumbers);
      return lotto.status;
    });
  }
}

export default LottoGameController;
