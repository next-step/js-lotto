import { END_GAME, RESTART_GAME } from '../constants/controller.js';
import { INPUT_MESSAGE, OUTPUT_MESSAGE } from '../constants/message.js';
import { LottoGame } from '../model/index.js';
import { InputView, OutputView } from '../view/index.js';

export default class LottoGameController {
  #lottoGame;

  constructor() {
    this.#lottoGame = new LottoGame();
  }

  /**
   * 구입할 로또 금액을 입력 받는 메서드
   */
  async #initializeAmount() {
    const amount = await InputView.inputByUser(INPUT_MESSAGE.BUY_AMOUNT);
    return Number(amount);
  }

  /**
   * 로또 당첨 번호를 입력하는 메서드
   */
  async #initalizeWinningNumbers() {
    const winningNumbers = await InputView.inputByUser(INPUT_MESSAGE.WINNING_NUMBERS);
    return winningNumbers;
  }

  /**
   * 보너스 번호를 입력하는 메서드
   */
  async #initializeBonusNumber() {
    const bonusNumber = await InputView.inputByUser(INPUT_MESSAGE.BONUS_NUMBER);
    return Number(bonusNumber);
  }

  /**
   * 게임 종료 또는 재시작 관련 선택을 입력 받는 메서드
   */
  async #initializeEndCount() {
    const endCount = await InputView.inputByUser(INPUT_MESSAGE.END_COUNT);
    return endCount;
  }

  /**
   * 입력한 금액을 통해 로또 번호들을 생성하는 메서드
   */
  #requestBuyingLotto(amount) {
    return this.#lottoGame.createLottoNumbers(amount);
  }

  /**
   * 구입한 로또 번호들을 출력하는 메서드
   */
  #printLottos(lottos) {
    OutputView.printFor(OUTPUT_MESSAGE.BUY_COUNT(lottos.length));
    OutputView.printFor(OUTPUT_MESSAGE.LOTTO_LIST(lottos));
  }

  /**
   * 로또 게임의 당첨 정보를 생성하는 메서드
   */
  #requestResults({ investmentAmount, lottoNumbers, winningLottoNumber, bonusNumber }) {
    return this.#lottoGame.createResults({ investmentAmount, lottoNumbers, winningLottoNumber, bonusNumber });
  }

  /**
   * 로또 게임의 결과 및 수익률을 출력하는 메서드
   */
  #printLottoResults(lottoResult, rateOfReturn) {
    OutputView.printFor(OUTPUT_MESSAGE.RESULT_TITLE);
    OutputView.printFor(OUTPUT_MESSAGE.RESULT(lottoResult));
    OutputView.printFor(OUTPUT_MESSAGE.RATE_OF_RETURN(rateOfReturn));
  }

  /**
   * "로또 구매 금액 입력 ~ 로또 생성"까지의 과정에 대한 메서드
   */
  async #processLottos() {
    const investmentAmount = await this.#initializeAmount();
    const lottoNumbers = this.#requestBuyingLotto(investmentAmount);
    return [investmentAmount, lottoNumbers];
  }

  /**
   * "당첨 번호 및 보너스 번호 입력 ~ 로또 당첨 정보 및 수익률 출력"까지의 과정을 처리하는 메서드
   */
  async #processPrintLottoResults(investmentAmount, lottoNumbers) {
    const winningNumbers = await this.#initalizeWinningNumbers();
    const winningLottoNumber = this.#lottoGame.createWinningLottoNumbers(winningNumbers);
    const bonusNumber = await this.#initializeBonusNumber();
    const { lottoResult, rateOfReturn } = this.#requestResults({
      investmentAmount,
      lottoNumbers,
      winningLottoNumber,
      bonusNumber,
    });
    this.#printLottoResults(lottoResult, rateOfReturn);
  }

  /**
   * 전체적인 게임을 진행하는 메서드
   */
  async #startGame() {
    const [investmentAmount, lottoNumbers] = await this.#processLottos();
    this.#printLottos(lottoNumbers);
    await this.#processPrintLottoResults(investmentAmount, lottoNumbers);
  }

  /**
   * 게임 종료 및 재시작을 처리하는 메서드
   */
  async #processEndGame(endCount) {
    if (endCount === END_GAME) process.exit();
    if (endCount === RESTART_GAME) {
      await this.run();
    }
  }

  /**
   * 게임 종료 또는 재시작에 대한 사용자의 선택을 처리하는 메서드
   */
  async #askUserForEndGame() {
    const endCount = await this.#initializeEndCount();
    this.#processEndGame(endCount);
  }

  /**
   * 전체적인 LottoGame의 로직들을 처리하는 메서드
   */
  async run() {
    await this.#startGame();
    await this.#askUserForEndGame();
  }
}
