import readline from "readline";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createView = () => {
  const GUIDE_MESSAGES = Object.freeze({
    PURCHASING_PRICE_INPUT: "> 구입금액을 입력해 주세요. ",
    WINNING_NUMBERS_INPUT: "> 당첨 번호를 입력해 주세요. ",
    BONUS_NUMBER_INPUT: "> 보너스 번호를 입력해 주세요. ",
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
    logDivider();
  }

  async function getWinningLottoNumbersFromView(cbFunc) {
    const winningNumbers = await readlineFromConsole(
      GUIDE_MESSAGES.WINNING_NUMBERS_INPUT
    );
    logDivider();

    const bonusNumber = await readlineFromConsole(
      GUIDE_MESSAGES.BONUS_NUMBER_INPUT
    );
    logDivider();

    cbFunc(winningNumbers, bonusNumber);
  }

  const log = console.log;

  function logDivider() {
    log("");
  }

  function logLottoNumbers(lottoNumbers) {
    log(lottoNumbers);
  }

  function logRankInfo(info) {
    const { matchCount, isBonusMatch, prize, lottoCount } = info;
    const bonusMatchInfo = isBonusMatch ? ", 보너스 볼 일치" : "";
    const formattedPrize = prize
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    log(
      `${matchCount}개 일치${bonusMatchInfo} (${formattedPrize}원) - ${lottoCount}개`
    );
  }

  function logLottoResult(statistics, revenuePercentage) {
    logDivider();

    log(GUIDE_MESSAGES.WINNING_STATISTICS);
    log("-".repeat(18));

    statistics.forEach(logRankInfo);

    log(`총 수익률은 ${revenuePercentage}입니다.`);
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
    logDivider,
    logLottoResult,
    logErrorMessage,
    closeView,
  };
};

export default createView;
