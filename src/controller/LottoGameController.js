import { LOTTO } from "../constants/lottos.js";
import WinningNumbers from "../domain/WinningNumbers.js";
import InputValidator from "../utils/InputValidator.js";
import LottoService from "./LottoService.js";

class LottoGameController {
  #view;
  #amount;
  #winningNumbers;
  #bonusNumber;
  #inputValidator = new InputValidator();

  constructor(view) {
    this.#view = view;
  }

  set amount(amount) {
    if (this.#inputValidator.isValidateAmount(amount)) {
      this.#amount = amount;
    }
  }

  set winningNumbers(winningNumbers) {
    this.#winningNumbers =
      this.#inputValidator.validateLottoNumbers(winningNumbers);
  }

  set bonusNumber(bonusNumber) {
    this.#bonusNumber = this.#inputValidator.validateBonusNumber(
      bonusNumber,
      this.#winningNumbers
    );
  }

  async startLotto() {
    const amount = await this.#view.readPurchaseAmount();

    if (!this.#inputValidator.isValidateAmount(amount)) {
      return;
    }

    const count = amount / LOTTO.PRICE;
    this.#view.printPurchaseAmountResult(count);

    const lottos = LottoService.generateLottos(count);
    this.#view.printGeneratedLottoNumbers(lottos);
    this.#view.printDivider();

    const winningNumbers = await this.#inputWinningNumbers();
    const bonusNumber = await this.#inputBonusNumber(winningNumbers);
    if (!winningNumbers || !bonusNumber) return;

    const winningLotto = new WinningNumbers(winningNumbers, bonusNumber);
    const winningResult = this.#getWinningResult({ winningLotto, lottos });
    this.#view.printWinners(winningResult);

    const profitRate = this.#getProfitRate({ winningResult, amount });
    this.#view.printProfitRate(profitRate);
  }

  async #inputWinningNumbers() {
    const winningNumbersStr = await this.#view.readWinningNumbers();
    const winningNumbers =
      this.#inputValidator.validateLottoNumbers(winningNumbersStr);
    return winningNumbers;
  }

  async #inputBonusNumber(winningNumbers) {
    const bonusNumberStr = await this.#view.readBonusNumber();
    const bonusNumber = this.#inputValidator.validateBonusNumber(
      bonusNumberStr,
      winningNumbers
    );
    return bonusNumber;
  }

  #getWinningResult({ winningLotto, lottos }) {
    const winningResult = LottoService.checkWinningResult({
      winningLotto,
      lottos,
    });

    return winningResult;
  }

  #getProfitRate({ winningResult, amount }) {
    const profitRate = LottoService.calculateProfitRate({
      winningResult,
      amount,
    });
    return profitRate;
  }
}
export default LottoGameController;
