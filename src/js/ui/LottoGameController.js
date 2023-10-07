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

  /**
   * 로또 당첨 번호와 구매한 로또 번호를 비교해 수익률을 계산한다.
   */
  calculateResults() {
    const purchasedLottoStatuses = this.getLottoStatus(
      this.lottoWinningNumbers.numbers,
      this.purchasedLottoList
    );

    this.#winningCalculator.calculate(purchasedLottoStatuses);

    this.calculatedResult = this.#winningCalculator.result;
  }

  /**
   * 로또 당첨 번호와 구매 목록을 받아, 구매한 개별 로또의 당첨 상태를 변경하고 이를 리턴한다.
   * @param { Object } lottoWinningNumbers
   * @param { Array } purchasedLottoList
   * @returns { Array } 당첨 여부 상태를 가진 구매 로또 목록
   */
  getLottoStatus(lottoWinningNumbers, purchasedLottoList) {
    return purchasedLottoList.map((lotto) => {
      lotto.setStatus(lottoWinningNumbers);
      return lotto.status;
    });
  }
}

export default LottoGameController;
