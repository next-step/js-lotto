import { create } from "domain";
import readline from "readline";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createView = () => {
  const GUIDE_MESSAGES = Object.freeze({
    PURCHASING_PRICE_INPUT: "> 구입금액을 입력해 주세요.",
    WINNING_NUMBERS_INPUT: "> 당첨 번호를 입력해 주세요.",
    BONUS_NUMBER_INPUT: "> 보너스 번호를 입력해 주세요.",
    WINNING_STATISTICS: "당첨 통계",
  });

  async function readlineFromConsole(guideMessage) {
    return new Promise((resolve) => {
      readlineInterface.question(guideMessage, resolve);
    });
  }

  async function getPurchasingPriceFromView(cbFunc) {
    const purchasingPrice = await readlineFromConsole(
      GUIDE_MESSAGES.PURCHASING_PRICE_INPUT
    );

    cbFunc(purchasingPrice);
  }

  async function getWinningLottoNumbersFromView(cbFunc) {
    const winningNumbers = await readlineFromConsole(
      GUIDE_MESSAGES.WINNING_NUMBERS_INPUT
    );
    const bonusNumber = await readlineFromConsole(
      GUIDE_MESSAGES.BONUS_NUMBER_INPUT
    );

    cbFunc(winningNumbers, bonusNumber);
  }

  const log = console.log;

  function logDivider() {
    log("");
  }

  function logLottoNumbers(lotto) {
    log(lotto.getLottoNumbers());
  }

  function logStatisticsGuideMessage() {
    logDivider();

    log(GUIDE_MESSAGES.WINNING_STATISTICS);
    log("-".repeat(18));
  }

  function logLottoStatistics(lotto, revenue) {
    logStatisticsGuideMessage();

    log(`등수: ${lotto.rank}, 금액: ${lotto.prize}원`);

    log(`총 수익률은 ${revenue}입니다.`);
  }

  function logErrorMessage(errorMessage) {
    log("[ERROR]", errorMessage);
  }

  function closeView() {
    readlineInterface.close();
  }

  return {
    getPurchasingPriceFromView,
    getWinningLottoNumbersFromView,
    logLottoNumbers,
    logLottoStatistics,
    logErrorMessage,
    closeView,
  };
};

export default createView;
