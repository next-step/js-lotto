export default class ConsoleController {
  #autoLottoPrinter;
  #lottoChecker;
  #consoleView;

  constructor({ consoleView, autoLottoPrinter, lottoChecker }) {
    this.#autoLottoPrinter = autoLottoPrinter;
    this.#lottoChecker = lottoChecker;
    this.#consoleView = consoleView;
  }
  j;

  async playLotto() {
    const amountToBuyLotto = Number(await this.#consoleView.askHowMuchToBuy());
    const lottoList = this.#autoLottoPrinter.buyLotto(amountToBuyLotto);
    this.#consoleView.viewHowManyLottoBought(lottoList.length);

    lottoList.forEach((lotto) => {
      this.#consoleView.viewPrintedLottoNumbers(lotto);
    });

    const winningNumbers = (await this.#consoleView.askWinningNumbers())
      .split(",")
      .map((num) => Number(num));
    const bonusNumber = Number(await this.#consoleView.askBonusNumber());
    this.#lottoChecker.lottoNumberInfo = {
      winningNumbers,
      bonusNumber,
    };

    const { winningDataPerRank, totalRewards } =
      this.#lottoChecker.checkWinningData(lottoList);

    this.#consoleView.viewResult(
      this.#lottoChecker.prizeInfo,
      winningDataPerRank
    );

    this.#consoleView.viewTotalRate({
      lottoPrice: this.#autoLottoPrinter.lottoPrice,
      buyingAmount: amountToBuyLotto,
      totalRewards,
    });
  }
}
