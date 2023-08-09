import { END_GAME, RESTART_GAME } from '../constants/controller.js';
import { INPUT_MESSAGE, OUTPUT_MESSAGE } from '../constants/message.js';
import { LottoGame } from '../model/index.js';
import { InputView, OutputView } from '../view/index.js';

export default class LottoGameController {
  #lottoGame;

  constructor() {
    this.#lottoGame = new LottoGame();
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
    return this.#lottoGame.createLottoNumbers(amount);
  }

  #printLottos(lottos) {
    OutputView.printFor(OUTPUT_MESSAGE.BUY_COUNT(lottos));
    OutputView.printFor(OUTPUT_MESSAGE.LOTTO_LIST(lottos));
  }

  #requestResults({ investmentAmount, lottoNumbers, winningLottoNumber, bonusNumber }) {
    return this.#lottoGame.createResults({ investmentAmount, lottoNumbers, winningLottoNumber, bonusNumber });
  }

  #printLottoResults(result, rateOfReturn) {
    OutputView.printFor(OUTPUT_MESSAGE.RESULT_TITLE);
    OutputView.printFor(result);
    OutputView.printFor(rateOfReturn);
  }

  async #processLottos() {
    const investmentAmount = await this.#initializeAmount();
    const lottoNumbers = this.#requestBuyingLotto(investmentAmount);
    return [investmentAmount, lottoNumbers];
  }

  async #processPrintLottoResults(investmentAmount, lottoNumbers) {
    const [winningNumbers, bonusNumber] = await this.#initializeNumbers();
    const winningLottoNumber = this.#lottoGame.createWinningLottoNumbers(winningNumbers);
    const { lottoResult, rateOfReturn } = this.#requestResults({
      investmentAmount,
      lottoNumbers,
      winningLottoNumber,
      bonusNumber,
    });
    this.#printLottoResults(OUTPUT_MESSAGE.RESULT(lottoResult), OUTPUT_MESSAGE.RATE_OF_RETURN(rateOfReturn));
  }

  async #startGame() {
    const [investmentAmount, lottoNumbers] = await this.#processLottos();
    this.#printLottos(lottoNumbers);
    await this.#processPrintLottoResults(investmentAmount, lottoNumbers);
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
