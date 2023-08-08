import { END_GAME, RESTART_GAME } from '../constants/controller.js';
import { INPUT_MESSAGE, OUTPUT_MESSAGE } from '../constants/message.js';
import { Lotto, LottoMerchant } from '../model/index.js';
import { InputView, OutputView } from '../view/index.js';

export default class LottoGameController {
  #lottoBuyer;

  static #convertLottoResultForPrint(result) {
    return Object.entries(result)
      .map((element) => `${element.join(' - ')}개`)
      .join('\n');
  }

  static #convertRateOfReturnForPrint(rateOfReturn) {
    return `총 수익률은 ${rateOfReturn}입니다.`;
  }

  async #initializeAmount() {
    const amount = await InputView.inputByUser(INPUT_MESSAGE.BUY_AMOUNT);
    return Number(amount);
  }

  async #initalizeWinningNumbers() {
    const winningNumbers = await InputView.inputByUser(INPUT_MESSAGE.WINNING_NUMBERS);
    return winningNumbers;
  }

  async #initializeBonusNumber() {
    const bonusNumber = await InputView.inputByUser(INPUT_MESSAGE.BONUS_NUMBER);
    return Number(bonusNumber);
  }

  async #initializeNumbers() {
    const winningNumbers = await this.#initalizeWinningNumbers();
    const bonusNumber = await this.#initializeBonusNumber();
    return [winningNumbers, bonusNumber];
  }

  async #initializeEndCount() {
    const endCount = await InputView.inputByUser(INPUT_MESSAGE.END_COUNT);
    return endCount;
  }

  #requestBuyingLotto(amount) {
    const lottoBuyer = LottoMerchant.fromPay(amount);
    return lottoBuyer.sellLotto();
  }

  #printLottos(lottos) {
    OutputView.printFor(OUTPUT_MESSAGE.BUY_COUNT(lottos));
    OutputView.printFor(OUTPUT_MESSAGE.LOTTO_LIST(lottos));
  }

  #requestResults({ investmentAmount, lottos, winningNumbers, bonusNumber }) {
    return this.#lottoBuyer.confirmResult({ investmentAmount, lottos, winningNumbers, bonusNumber });
  }

  #printLottoResults(result, rateOfReturn) {
    OutputView.printFor(OUTPUT_MESSAGE.RESULT_TITLE);
    OutputView.printFor(result);
    OutputView.printFor(rateOfReturn);
  }

  async #processLottos() {
    const investmentAmount = await this.#initializeAmount();
    const lottos = this.#requestBuyingLotto(investmentAmount);
    return [investmentAmount, lottos];
  }

  async #processPrintLottoResults(investmentAmount, lottos) {
    const [winningNumbers, bonusNumber] = await this.#initializeNumbers();
    const winningLotto = Lotto.createLottoByString(winningNumbers, ',');
    const [lottoResult, rateOfReturn] = this.#requestResults({ investmentAmount, lottos, winningLotto, bonusNumber });
    this.#printLottoResults(
      LottoGameController.#convertLottoResultForPrint(lottoResult),
      LottoGameController.#convertRateOfReturnForPrint(rateOfReturn),
    );
  }

  async #startGame() {
    const [investmentAmount, lottos] = await this.#processLottos();
    this.#printLottos(lottos);
    await this.#processPrintLottoResults(investmentAmount, lottos);
  }

  async #processEndGame(endCount) {
    if (endCount === END_GAME) process.exit();
    if (endCount === RESTART_GAME) {
      await this.run();
    }
  }

  async #askUserForEndGame() {
    const endCount = await this.#initializeEndCount();
    this.#processEndGame(endCount);
  }

  async run() {
    await this.#startGame();
    await this.#askUserForEndGame();
  }
}
