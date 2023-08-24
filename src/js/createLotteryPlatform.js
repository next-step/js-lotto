import createView from "./view/createView.js";
import createLotteryMachine from "./domain/LotteryMachine/createLotteryMachine.js";
import createMatchChecker from "./domain/MatchChecker/createMatchChecker.js";
import createResultChecker from "./domain/ResultChecker/createResultChecker.js";

const createLotteryPlatform = () => {
  const {
    getPurchasingPriceFromView,
    getWinningLottoNumbersFromView,
    logLottoNumbers,
    logLottoResult,
    logErrorMessage,
    closeView,
  } = createView();
  const { issueLottosWith } = createLotteryMachine();
  const { setWinningLotto, checkMatch } = createMatchChecker();
  const { getSummarizedInfo } = createResultChecker();

  let lottos = [];

  function getGameResult() {
    const { statistics, revenuePercentage } = getSummarizedInfo(lottos);
    logLottoResult(statistics, revenuePercentage);
  }

  async function run() {
    try {
      await getPurchasingPriceFromView((purchasingPrice) => {
        lottos = issueLottosWith(purchasingPrice);
        lottos.forEach((lotto) => logLottoNumbers(lotto.getLottoNumbers()));
      });

      await getWinningLottoNumbersFromView((winningNumbers, bonusNumber) => {
        setWinningLotto(winningNumbers, bonusNumber);
        lottos.forEach(checkMatch);
      });

      getGameResult();
    } catch (error) {
      logErrorMessage(error.message);
    } finally {
      closeView();
    }
  }

  return {
    run,
  };
};

export default createLotteryPlatform;
